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
