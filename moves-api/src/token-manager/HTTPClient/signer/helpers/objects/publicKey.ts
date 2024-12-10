import { createPublicKey } from 'crypto';

class PublicKey {
    private uncompressedBytes: Buffer;

    constructor(publicPem: string) {
        const key = createPublicKey(publicPem);

        // Export the key as a DER buffer
        const derBuffer = key.export({ format: 'der', type: 'spki' });

        // Parse the DER buffer to extract the public key point (end of buffer)
        const publicKeyPointOffset = derBuffer.length - 65; // 65 bytes for 0x04 || x || y
        const uncompressedBytes = derBuffer.subarray(publicKeyPointOffset);

        if (uncompressedBytes[0] !== 0x04) {
            throw new Error('Public key is not in uncompressed format');
        }

        this.uncompressedBytes = uncompressedBytes;
    }

    toBuffer(): Buffer {
        return this.uncompressedBytes;
    }

    toHex(): string {
        return this.uncompressedBytes.toString('hex');
    }
}

export default PublicKey;
