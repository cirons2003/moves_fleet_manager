import { BadVehicleResponseError } from '../../../../../middleware/protocolError';
import {
    Domain,
    RoutableMessage,
} from '../../protobuf/outputs/universal_message';

type SessionInfo = {
    counter: number;
    publicKey: Buffer;
    epoch: Buffer;
    clockTime: number;
};
import assert from 'assert';

class HandshakeResponse {
    private routingAddress: Uint8Array;
    private domain: Domain;
    private sessionInfoTag: Uint8Array;
    private sessionInfo: SessionInfo;
    private requestUuid?: Uint8Array;

    constructor(base64Response: string) {
        const bufferResponse = Buffer.from(base64Response, 'base64');
        const routableMessage = RoutableMessage.decode(bufferResponse);

        if (!routableMessage) {
            throw new BadVehicleResponseError(
                undefined,
                'Could not decode routable message',
            );
        }

        if (!routableMessage.toDestination?.routingAddress) {
            throw new BadVehicleResponseError(
                undefined,
                'Response Missing Routing Address',
            );
        }

        if (!routableMessage.fromDestination?.domain) {
            throw new BadVehicleResponseError(
                undefined,
                'Response Missing Domain',
            );
        }

        if (!routableMessage.signatureData?.sessionInfoTag?.tag) {
            throw new BadVehicleResponseError(
                undefined,
                'Response Missing Session Info Tag',
            );
        }

        if (!routableMessage.sessionInfo) {
            throw new BadVehicleResponseError(
                undefined,
                'Response Missing Session Info',
            );
        }

        this.routingAddress = routableMessage.toDestination.routingAddress;
        this.domain = routableMessage.fromDestination.domain;
        this.sessionInfoTag = routableMessage.signatureData.sessionInfoTag.tag;
        this.sessionInfo = decodeSessionInfo(routableMessage.sessionInfo);
        this.requestUuid = routableMessage.requestUuid;
    }
}

export const decodeSessionInfo = (bytes: Uint8Array): SessionInfo => {
    const sessionInfo = {} as SessionInfo;
    let offset = 0;

    // skip varint tag
    offset += 1;

    // Extract counter
    sessionInfo.counter = bytes[offset];
    offset += 1;

    // Skip field tag
    offset += 1;

    // Get length byte
    const publicKeyByteLength = bytes[offset];
    offset += 1;
    assert(publicKeyByteLength == 65);

    // Extract publicKey (65 bytes)
    sessionInfo.publicKey = Buffer.from(
        bytes.subarray(offset, offset + publicKeyByteLength),
    );
    offset += publicKeyByteLength;

    // Skip field tag
    offset += 1;

    // Get length byte
    const epochByteLength = bytes[offset];
    offset += 1;

    // Extract epoch
    sessionInfo.epoch = Buffer.from(
        bytes.subarray(offset, offset + epochByteLength),
    );
    offset += epochByteLength;

    // Skip varint tag
    offset += 1;

    // Extract time
    sessionInfo.clockTime = (bytes[offset + 1] << 8) | bytes[offset]; // read from little endian
    offset += 2;

    return sessionInfo;
};

export default HandshakeResponse;
