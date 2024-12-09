class PublicKey {
    private readonly x: Uint8Array;
    private readonly y: Uint8Array;

    constructor(pem: string) {
        // Extract Base64 content between the PEM markers
        const base64 = pem
            .replace(/-----BEGIN PUBLIC KEY-----/g, '')
            .replace(/-----END PUBLIC KEY-----/g, '')
            .replace(/\s+/g, ''); // Remove newlines and spaces

        // Decode Base64 content into binary
        const key = Uint8Array.from(Buffer.from(base64, 'base64'));

        // Validate the uncompressed public key format
        if (key.length !== 65) {
            throw new Error('Invalid public key length. Expected 65 bytes.');
        }
        if (key[0] !== 0x04) {
            throw new Error(
                'Invalid public key prefix. Expected 0x04 for uncompressed keys.',
            );
        }

        // Extract x and y coordinates (32 bytes each)
        this.x = key.slice(1, 33); // Bytes 1-32
        this.y = key.slice(33); // Bytes 33-64
    }

    /**
     * Returns the uncompressed encoding of the public key.
     * Format: 0x04 || BIG_ENDIAN(x, 32) || BIG_ENDIAN(y, 32)
     */
    get Encode(): Uint8Array {
        const prefix = new Uint8Array([0x04]); // 1-byte prefix
        const encoded = new Uint8Array(65);
        encoded.set(prefix, 0); // Add prefix at byte 0
        encoded.set(this.x, 1); // Add x coordinate at bytes 1-32
        encoded.set(this.y, 33); // Add y coordinate at bytes 33-64
        return encoded;
    }

    /**
     * Gets the X coordinate of the public key as a Uint8Array.
     */
    getX(): Uint8Array {
        return this.x;
    }

    /**
     * Gets the Y coordinate of the public key as a Uint8Array.
     */
    getY(): Uint8Array {
        return this.y;
    }
}

export default PublicKey;
