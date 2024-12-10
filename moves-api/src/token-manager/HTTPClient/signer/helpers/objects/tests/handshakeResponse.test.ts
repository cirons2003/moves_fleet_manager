import { decodeSessionInfo } from '../HandshakeResponse';

const testBytes = Buffer.from(
    '0806124104c7a1f47138486aa4729971494878d33b1a24e39571f748a6e16c5955b3d877d3a6aaa0e955166474af5d32c410f439a2234137ad1bb085fd4e8813c958f11d971a104c463f9cc0d3d26906e982ed224adde6255a0a0000',
    'hex',
);

const expectedCounter = 6;
const expectedPublicKey = Buffer.from(
    '04c7a1f47138486aa4729971494878d33b1a24e39571f748a6e16c5955b3d877d3a6aaa0e955166474af5d32c410f439a2234137ad1bb085fd4e8813c958f11d97',
    'hex',
);
const expectedEpoch = Buffer.from('4c463f9cc0d3d26906e982ed224adde6', 'hex');
const expectedClockTime = 2650;

describe('decodeSessionInfo', () => {
    it('Should properly decode SessionInfo', () => {
        const sessionInfo = decodeSessionInfo(testBytes);
        expect(sessionInfo.counter).toBe(expectedCounter);
        expect(Buffer.compare(sessionInfo.publicKey, expectedPublicKey)).toBe(
            0,
        );
        expect(Buffer.compare(sessionInfo.epoch, expectedEpoch)).toBe(0);
        expect(sessionInfo.clockTime).toBe(expectedClockTime);
    });
});
