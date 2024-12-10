import PrivateKey from '../PrivateKey';
import PublicKey from '../PublicKey';
import {
    expectedSharedHex,
    testPemPrivateKeyClient,
    testPemPrivateKeyVehicle,
    testPemPublicKeyClient,
    testPemPublicKeyVehicle,
} from './testValues';

describe('PrivateKey', () => {
    it('Should correctly decode PEM', () => {
        expect(() => new PrivateKey(testPemPrivateKeyClient)).not.toThrow();

        expect(() => new PrivateKey(testPemPrivateKeyVehicle)).not.toThrow();
    });

    it('should throw an error for invalid PEM input', () => {
        const invalidPem = `
        -----BEGIN PRIVATE KEY-----
        INVALID
        -----END PRIVATE KEY-----
        `;
        expect(() => new PrivateKey(invalidPem)).toThrow();
    });

    it('Should Properly compute shared secret with peer public key', () => {
        const vehiclePrivateKey = new PrivateKey(testPemPrivateKeyVehicle);
        const clientPrivateKey = new PrivateKey(testPemPrivateKeyClient);

        const vehiclePublicKey = new PublicKey(testPemPublicKeyVehicle);
        const clientPublicKey = new PublicKey(testPemPublicKeyClient);

        expect(
            vehiclePrivateKey.getSharedSecret(clientPublicKey).toString('hex'),
        ).toBe(expectedSharedHex);

        expect(
            clientPrivateKey.getSharedSecret(vehiclePublicKey).toString('hex'),
        ).toBe(expectedSharedHex);
    });
});
