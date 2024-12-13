export class ProtocolError extends Error {
    raw: any;

    constructor(raw: any, message: string) {
        super(message);
        this.raw = raw;
    }
}

export class BadVehicleResponseError extends ProtocolError {
    constructor(raw: any, message: string = 'Bad Vehicle Response') {
        super(raw, message);
    }
}

export class FailedHandshakeError extends ProtocolError {
    constructor(raw: any, message: string = 'Failed Handshake') {
        super(raw, message);
    }
}
