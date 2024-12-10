import { createPublicKey, KeyObject } from 'crypto';

class PublicKey {
    private uncompressedBytes: Buffer;
    private pem: string;

    constructor(publicPem: string) {
        this.pem = publicPem;

        const key = this.toKeyObject();

        if (key.type != 'public') {
            throw new Error('Non-private key received');
        }

        if (key.asymmetricKeyType != 'ec') {
            throw new Error('Key not from elliptical curve');
        }

        if (key.asymmetricKeyDetails?.namedCurve != 'prime256v1') {
            throw new Error('Key must be generated from NIST-P256');
        }

        // Export the key as a DER buffer
        const derBuffer = key.export({
            format: 'der',
            type: 'spki',
        });

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

    toKeyObject(): KeyObject {
        return createPublicKey(this.pem);
    }
}

export default PublicKey;
