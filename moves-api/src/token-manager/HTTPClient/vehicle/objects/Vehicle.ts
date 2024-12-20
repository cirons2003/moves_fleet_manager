import { Httpify } from '../../../../middleware/errorHandler';
import { clientPublicKey } from '../keys';
import { Domain, RoutableMessage } from '../protobuf/outputs/universal_message';
import HandshakeRequest from './HandshakeRequest';
import HandshakeResponse from './HandshakeResponse';
import axios, { AxiosRequestConfig } from 'axios';
import Metadata from './Metadata';
import { SignatureType, Tag } from '../protobuf/outputs/signatures';
import Crypto from './Crypto';
import SessionInfo from './SessionInfo';
import {
    Action,
    Response,
    VehicleControlHonkHornAction,
} from '../protobuf/outputs/car_server';
import VehicleCommand, { ResponseStatus } from './VehicleCommand';
import { authorizeConfig } from '../../utils/authorizeConfig';
import { RequestConfig } from '../../HTTPClient';

export class VehicleError extends Error {
    constructor(message: string) {
        super(`Vehicle Error: ${message}`);
    }
}

const MAX_RETRIES = 4;

class Vehicle {
    private vin: string;
    private connected: boolean = false;
    private sessionInfo: SessionInfo = {} as SessionInfo;
    private retryCount: number;

    constructor(vin: string) {
        this.vin = vin;
        this.connected = false;
        this.retryCount = 0;
    }

    async startSession() {
        const handshakeRequest = new HandshakeRequest(
            Domain.DOMAIN_VEHICLE_SECURITY,
            clientPublicKey,
        );
        const uuid = handshakeRequest.getUUID();

        const responseBase64 = await this.#send(handshakeRequest.toBase64());
        const handshakeResponse = new HandshakeResponse(responseBase64);

        const isValid = this.#isHandshakeResponseValid(handshakeResponse, uuid);

        if (!isValid) {
            throw new VehicleError('Handshake tags did not match');
        }

        this.connected = true;
        this.sessionInfo = handshakeResponse.getSessionInfo();
    }

    #isHandshakeResponseValid(
        handshakeResponse: HandshakeResponse,
        uuid: Buffer,
    ): boolean {
        const sessionInfo = handshakeResponse.getSessionInfo();

        const sharedKey = sessionInfo.getSharedKey();

        // Check HMAC-SHA256(K, "session info")
        const sessionInfoKey = Crypto.deriveHMACKey(sharedKey, 'session info');

        // Encode metadata
        const metadata = new Metadata();
        metadata.addString(
            Tag.TAG_SIGNATURE_TYPE,
            '' + SignatureType.SIGNATURE_TYPE_HMAC,
        );
        metadata.addString(Tag.TAG_PERSONALIZATION, this.vin);
        metadata.addString(Tag.TAG_CHALLENGE, uuid.toString('hex'));

        const hmacTag = Crypto.getHMACTag(
            metadata.toBytes(),
            sessionInfo.getSessionInfoBytes(),
            sessionInfoKey,
        );

        // Compare with response's tag
        if (
            !Crypto.hmacTagsEqual(
                hmacTag,
                handshakeResponse.getSessionInfoTag(),
            )
        ) {
            return false;
        }

        return true;
    }

    async #send(routableBase64: string): Promise<string> {
        try {
            const config: RequestConfig = {
                method: 'POST',
            };
            const expandedConfig = { ...config };
            expandedConfig.baseURL =
                'https://fleet-api.prd.na.vn.cloud.tesla.com';
            expandedConfig.url = `api/1/vehicles/${this.vin}/signed_command`;
            const ownerId = 1; // REPLACE
            const authorizedConfig = await authorizeConfig(
                expandedConfig,
                ownerId,
            );
            authorizedConfig.data = { routable_message: routableBase64 };

            console.log('sending the following request: ', authorizedConfig);
            const response = await axios.request(authorizedConfig);

            if (response.status != 200) {
                console.log(`Error: ${response.data}`);
                throw new VehicleError('Did not hear back from vehicle');
            }
            console.log('heard back from vehicle: ', response.data);
            return response.data.response;
        } catch (err) {
            throw Httpify(err, 'Failed to reach vehicle during handshake');
        }
    }

    getVIN(): string {
        return this.vin;
    }

    isConnected(): boolean {
        return this.connected;
    }

    getSessionInfo(): SessionInfo {
        if (!this.isConnected()) {
            throw new VehicleError('Vehicle not connected');
        }
        return this.sessionInfo;
    }

    async #issueVehicleCommand(
        action: Action,
        sigType: SignatureType,
        domain: Domain,
        secondsToExpiration: number,
    ) {
        const commandBytes = Vehicle.getVehicleCommandBytes(action);
        const vehicleCommand = new VehicleCommand(
            commandBytes,
            this,
            sigType,
            domain,
            secondsToExpiration,
        );

        const responseBase64 = await this.#send(vehicleCommand.toBase64());

        const rmJson = RoutableMessage.decode(
            Buffer.from(responseBase64, 'base64'),
        );
        console.log('decoded: ', rmJson);
    }

    static getVehicleCommandBytes(action: Action): Buffer {
        return Buffer.from(Action.encode(action).finish());
    }

    honkHorn() {
        this.#issueVehicleCommand(
            {
                vehicleAction: { vehicleControlHonkHornAction: {} },
            },
            SignatureType.SIGNATURE_TYPE_HMAC_PERSONALIZED,
            Domain.DOMAIN_INFOTAINMENT,
            7,
        );
    }
}

export default Vehicle;
