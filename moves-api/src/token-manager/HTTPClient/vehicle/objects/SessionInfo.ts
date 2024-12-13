import assert from 'assert';
import Crypto from './Crypto';
import { clientPrivateKey } from '../keys';
import PublicKey from './PublicKey';

class SessionInfo {
    private counter: number;
    private publicKey: Buffer;
    private sharedKey: Buffer;
    private epoch: Buffer;
    private clockTime: number;

    private createdAt: number;

    private sessionInfoBytes: Buffer;

    constructor(sessionInfoBytes: Buffer) {
        this.sessionInfoBytes = Buffer.from(sessionInfoBytes);
        this.createdAt = Math.floor(new Date().getTime() / 1000);

        let offset = 0;

        // skip varint tag
        offset += 1;

        // Extract counter
        const counter = sessionInfoBytes[offset];
        offset += 1;

        // Skip field tag
        offset += 1;

        // Get length byte
        const publicKeyByteLength = sessionInfoBytes[offset];
        offset += 1;
        assert(publicKeyByteLength == 65);

        // Extract publicKey (65 sessionInfoBytes)
        const publicKey = Buffer.from(
            sessionInfoBytes.subarray(offset, offset + publicKeyByteLength),
        );

        offset += publicKeyByteLength;

        // Skip field tag
        offset += 1;

        // Get length byte
        const epochByteLength = sessionInfoBytes[offset];
        offset += 1;

        // Extract epoch
        const epoch = Buffer.from(
            sessionInfoBytes.subarray(offset, offset + epochByteLength),
        );
        offset += epochByteLength;

        // Skip varint tag
        offset += 1;

        // Extract time
        const clockTime =
            (sessionInfoBytes[offset + 1] << 8) | sessionInfoBytes[offset]; // read from little endian
        offset += 2;

        this.counter = counter;
        this.publicKey = publicKey;
        this.sharedKey = Crypto.getSharedSecret(
            clientPrivateKey,
            PublicKey.fromUncompressedHexString(publicKey.toString('hex')),
        );
        this.epoch = epoch;
        this.clockTime = clockTime;
    }

    getCounter(): number {
        return this.counter;
    }

    getPublicKey(): Buffer {
        return this.publicKey;
    }

    getSharedKey(): Buffer {
        return this.sharedKey;
    }

    getEpoch(): Buffer {
        const hexEpoch = this.epoch.toString('hex');
        return Buffer.from(hexEpoch, 'hex');
    }

    getClockTime(): number {
        return this.clockTime;
    }

    getSessionInfoBytes(): Buffer {
        const hexInfo = this.sessionInfoBytes.toString('hex');
        return Buffer.from(hexInfo, 'hex');
    }

    getVehicleSeconds(): number {
        const secondsElapsed =
            Math.floor(new Date().getTime() / 1000) - this.createdAt;
        return this.clockTime + secondsElapsed;
    }

    incrementCounter() {
        this.counter += 1;
    }
}

export default SessionInfo;
