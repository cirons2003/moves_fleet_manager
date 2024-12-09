import PublicKey from '../publicKey';

describe('PublicKey Class', () => {
    const validPem = `
  -----BEGIN PUBLIC KEY-----
  MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEx6H0cThIaqRymXFJSHjTOxok45Vx
  90im4WxZVbPYd9OmqqDpVRZkdK9dMsQQ9DmiI0E3rRuwhf1OiBPJWPEdlw==
  -----END PUBLIC KEY-----
  `;

    const invalidPem = `
  -----BEGIN PUBLIC KEY-----
  InvalidKeyData==
  -----END PUBLIC KEY-----
  `;

    test('should correctly parse a valid PEM string', () => {
        const publicKey = new PublicKey(validPem);
        expect(publicKey.getX().length).toBe(32);
        expect(publicKey.getY().length).toBe(32);
        expect(publicKey.Encode.length).toBe(65);
        expect(publicKey.Encode[0]).toBe(0x04); // Check prefix
    });

    test('should throw an error for invalid PEM string', () => {
        expect(() => {
            new PublicKey(invalidPem);
        }).toThrow('Invalid public key length. Expected 65 bytes.');
    });

    test('should correctly generate uncompressed encoding', () => {
        const publicKey = new PublicKey(validPem);
        const encoded = publicKey.Encode;

        expect(encoded.length).toBe(65);
        expect(encoded[0]).toBe(0x04); // Check prefix
    });

    test('should correctly extract X and Y coordinates', () => {
        const publicKey = new PublicKey(validPem);
        const x = publicKey.getX();
        const y = publicKey.getY();

        expect(x.length).toBe(32);
        expect(y.length).toBe(32);

        // Validate against expected values (replace with actual values for your key)
        const expectedX =
            'c7a1f47138486aa4729971494878d33b1a24e39571f748a6e16c5955b3d877d3';
        const expectedY =
            'a6aaa0e955166474af5d32c410f439a2234137ad1bb085fd4e8813c958f11d97';

        expect(Buffer.from(x).toString('hex')).toBe(expectedX);
        expect(Buffer.from(y).toString('hex')).toBe(expectedY);
    });
});
