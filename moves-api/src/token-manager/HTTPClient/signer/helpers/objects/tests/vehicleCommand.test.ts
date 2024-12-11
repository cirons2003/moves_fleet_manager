import { clientPublicKey } from '../../../keys';
import { SignatureType } from '../../../protobuf/outputs/signatures';
import {
    Domain,
    RoutableMessage,
} from '../../../protobuf/outputs/universal_message';
import VehicleCommand from '../VehicleCommand';
import { mockedVehicle } from './testValues';

describe('VehicleCommand', () => {
    it('Should Properly generate bytes for AESGCM encrypted command', () => {
        const commandBytes = Buffer.from('120452020801', 'hex');

        const vehicleCommand = new VehicleCommand(
            commandBytes,
            mockedVehicle,
            SignatureType.SIGNATURE_TYPE_AES_GCM_PERSONALIZED,
            Domain.DOMAIN_INFOTAINMENT,
            5,
        );
        const payloadBytes = vehicleCommand.toBytes();

        const expectedRoutableMessage: RoutableMessage = {
            toDestination: {
                domain: Domain.DOMAIN_INFOTAINMENT,
            },
            fromDestination: {
                routingAddress: vehicleCommand.getRoutingAddress(),
            },
            protobufMessageAsBytes: Buffer.from('38038e8c0f2e', 'hex'),
            signatureData: {
                signerIdentity: {
                    publicKey: clientPublicKey.toBuffer(),
                },
                AESGCMPersonalizedData: {
                    epoch: vehicleCommand.getEpoch(),
                    nonce: vehicleCommand.getNonce() as Buffer,
                    counter: vehicleCommand.getCounter(),
                    expiresAt: vehicleCommand.getExpiration(),
                    tag: vehicleCommand.getAuthTag(),
                },
            },
            uuid: vehicleCommand.getUUID(),
        };
        const expectedPayloadBytes = Buffer.from(
            RoutableMessage.encode(expectedRoutableMessage).finish(),
        );

        expect(payloadBytes.toString('hex')).toBe(
            expectedPayloadBytes.toString('hex'),
        );
    });
});
