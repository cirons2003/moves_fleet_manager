import { Domain, RoutableMessage } from '../protobuf/outputs/universal_message';
import { randomBytes } from 'crypto';
import PublicKey from './PublicKey';

class HandshakeRequest {
    private domain: Domain;
    private publicKey: PublicKey;
    private routing_address: Buffer; // Random 16 bytes
    private uuid: Buffer;

    constructor(domain: Domain, publicKey: PublicKey) {
        this.domain = domain;
        this.publicKey = publicKey;
        this.routing_address = randomBytes(16);
        this.uuid = randomBytes(16);
    }

    toBase64(): string {
        const routableMessage: RoutableMessage = {
            toDestination: {
                domain: this.domain,
            },
            fromDestination: {
                routingAddress: this.routing_address,
            },
            sessionInfoRequest: {
                publicKey: this.publicKey.toBuffer(),
                challenge: this.uuid,
            },
            uuid: this.uuid,
        };

        const writer = RoutableMessage.encode(routableMessage);

        return Buffer.from(writer.finish()).toString('base64');
    }

    getUUID(): Buffer {
        return this.uuid;
    }
}

export default HandshakeRequest;
