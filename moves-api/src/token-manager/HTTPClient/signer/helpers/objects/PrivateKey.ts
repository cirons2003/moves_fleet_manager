import { createHash, createPrivateKey, diffieHellman, KeyObject } from 'crypto';
import PublicKey from './PublicKey';
import assert from 'assert';

class PrivateKey {
    private pem: string;

    constructor(privatePem: string) {
        this.pem = privatePem;

        const key = this.#toKeyObject();

        if (key.type != 'private') {
            throw new Error('Non-private key received');
        }

        if (key.asymmetricKeyType != 'ec') {
            throw new Error('Key not from elliptical curve');
        }

        if (key.asymmetricKeyDetails?.namedCurve != 'prime256v1') {
            throw new Error('Key must be generated from NIST-P256');
        }
    }

    #toKeyObject(): KeyObject {
        return createPrivateKey(this.pem);
    }

    #to32Bytes(sharedSecretBigEndian: Buffer): Buffer {
        assert(sharedSecretBigEndian.length <= 32);

        const padding = Buffer.alloc(32 - sharedSecretBigEndian.length, 0x00);
        return Buffer.concat([padding, sharedSecretBigEndian]);
    }

    getSharedSecret(peerPublicKey: PublicKey): Buffer {
        const sharedSecret = diffieHellman({
            privateKey: this.#toKeyObject(),
            publicKey: peerPublicKey.toKeyObject(),
        }); // Sx from ECDH => (Sx, Sy) as Buffer

        const paddedSecret = this.#to32Bytes(sharedSecret);

        const hashedSecret = createHash('sha1').update(paddedSecret).digest();

        return hashedSecret.subarray(0, 16);
    }
}

export default PrivateKey;
