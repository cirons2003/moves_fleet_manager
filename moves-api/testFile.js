const crypto = require('crypto');

const pem = `-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEsra8aMLaBmXOZWgVWUmWxiOU7di+
qQX+eBp1T+aoRacUMwkC8iXpJp1GbgWzSZgf2p2FzCPG+0RKpztikQXcbg==
-----END PUBLIC KEY-----`;

const key = crypto.createPublicKey(pem);

// Export the key as a DER buffer
const derBuffer = key.export({ format: 'der', type: 'spki' });

// Parse the DER buffer to extract the public key point
// The exact structure depends on the curve, but for secp256k1, the public key point starts
// at a specific offset within the DER buffer.

function getUncompressedPoint(der) {
    // The public key point starts after the ASN.1 structure header
    // For secp256k1, the public key bytes are at the end of the DER buffer:
    const publicKeyPointOffset = der.length - 65; // 65 bytes for 0x04 || x || y
    const publicKeyPoint = der.subarray(publicKeyPointOffset);

    if (publicKeyPoint[0] !== 0x04) {
        throw new Error('Public key is not in uncompressed format');
    }

    return publicKeyPoint; // Returns the 65-byte uncompressed point
}

const uncompressedPoint = getUncompressedPoint(derBuffer);

// Convert to hexadecimal for easier viewing
const val = uncompressedPoint.toString('hex');
console.log('Uncompressed Public Key Point:', val);
console.log('length: ', val.length);
