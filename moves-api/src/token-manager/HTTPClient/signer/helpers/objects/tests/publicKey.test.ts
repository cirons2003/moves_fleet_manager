import PublicKey from '../PublicKey';
import {
    expectedPublicUncompressedHexClient,
    expectedPublicUncompressedHexVehicle,
    testPemPublicKeyClient,
    testPemPublicKeyVehicle,
} from './testValues';

describe('PublicKey', () => {
    it('Should correctly decode PEM', () => {
        const publicKeyClient = new PublicKey(testPemPublicKeyClient);
        expect(publicKeyClient.toHex()).toBe(
            expectedPublicUncompressedHexClient,
        );

        const publicKeyVehicle = new PublicKey(testPemPublicKeyVehicle);
        expect(publicKeyVehicle.toHex()).toBe(
            expectedPublicUncompressedHexVehicle,
        );
    });

    it('should throw an error for invalid PEM input', () => {
        const invalidPem = `
        -----BEGIN PUBLIC KEY-----
        INVALID
        -----END PUBLIC KEY-----
        `;
        expect(() => new PublicKey(invalidPem)).toThrow();
    });
});
