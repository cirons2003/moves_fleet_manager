// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.6.0
//   protoc               v3.12.4
// source: universal_message.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { SignatureData } from "./signatures";

export const protobufPackage = "UniversalMessage";

export enum Domain {
  DOMAIN_BROADCAST = 0,
  DOMAIN_VEHICLE_SECURITY = 2,
  DOMAIN_INFOTAINMENT = 3,
  UNRECOGNIZED = -1,
}

export function domainFromJSON(object: any): Domain {
  switch (object) {
    case 0:
    case "DOMAIN_BROADCAST":
      return Domain.DOMAIN_BROADCAST;
    case 2:
    case "DOMAIN_VEHICLE_SECURITY":
      return Domain.DOMAIN_VEHICLE_SECURITY;
    case 3:
    case "DOMAIN_INFOTAINMENT":
      return Domain.DOMAIN_INFOTAINMENT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Domain.UNRECOGNIZED;
  }
}

export function domainToJSON(object: Domain): string {
  switch (object) {
    case Domain.DOMAIN_BROADCAST:
      return "DOMAIN_BROADCAST";
    case Domain.DOMAIN_VEHICLE_SECURITY:
      return "DOMAIN_VEHICLE_SECURITY";
    case Domain.DOMAIN_INFOTAINMENT:
      return "DOMAIN_INFOTAINMENT";
    case Domain.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum OperationStatusE {
  OPERATIONSTATUS_OK = 0,
  OPERATIONSTATUS_WAIT = 1,
  OPERATIONSTATUS_ERROR = 2,
  UNRECOGNIZED = -1,
}

export function operationStatusEFromJSON(object: any): OperationStatusE {
  switch (object) {
    case 0:
    case "OPERATIONSTATUS_OK":
      return OperationStatusE.OPERATIONSTATUS_OK;
    case 1:
    case "OPERATIONSTATUS_WAIT":
      return OperationStatusE.OPERATIONSTATUS_WAIT;
    case 2:
    case "OPERATIONSTATUS_ERROR":
      return OperationStatusE.OPERATIONSTATUS_ERROR;
    case -1:
    case "UNRECOGNIZED":
    default:
      return OperationStatusE.UNRECOGNIZED;
  }
}

export function operationStatusEToJSON(object: OperationStatusE): string {
  switch (object) {
    case OperationStatusE.OPERATIONSTATUS_OK:
      return "OPERATIONSTATUS_OK";
    case OperationStatusE.OPERATIONSTATUS_WAIT:
      return "OPERATIONSTATUS_WAIT";
    case OperationStatusE.OPERATIONSTATUS_ERROR:
      return "OPERATIONSTATUS_ERROR";
    case OperationStatusE.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum MessageFaultE {
  /** MESSAGEFAULT_ERROR_NONE - Request succeeded. */
  MESSAGEFAULT_ERROR_NONE = 0,
  /** MESSAGEFAULT_ERROR_BUSY - Required vehicle subsystem is busy. Try again. */
  MESSAGEFAULT_ERROR_BUSY = 1,
  /** MESSAGEFAULT_ERROR_TIMEOUT - Vehicle subsystem did not respond. Try again. */
  MESSAGEFAULT_ERROR_TIMEOUT = 2,
  /** MESSAGEFAULT_ERROR_UNKNOWN_KEY_ID - Vehicle did not recognize the key used to authorize command. Make sure your key is paired with the vehicle. */
  MESSAGEFAULT_ERROR_UNKNOWN_KEY_ID = 3,
  /** MESSAGEFAULT_ERROR_INACTIVE_KEY - Key used to authorize command has been disabled. */
  MESSAGEFAULT_ERROR_INACTIVE_KEY = 4,
  /** MESSAGEFAULT_ERROR_INVALID_SIGNATURE - Command signature/MAC is incorrect. Use included session info to update session and try again. */
  MESSAGEFAULT_ERROR_INVALID_SIGNATURE = 5,
  /** MESSAGEFAULT_ERROR_INVALID_TOKEN_OR_COUNTER - Command anti-replay counter has been used before. Use included session info to update session and try again. */
  MESSAGEFAULT_ERROR_INVALID_TOKEN_OR_COUNTER = 6,
  /** MESSAGEFAULT_ERROR_INSUFFICIENT_PRIVILEGES - User is not authorized to execute command. This can be because of the role or because of vehicle state. */
  MESSAGEFAULT_ERROR_INSUFFICIENT_PRIVILEGES = 7,
  /** MESSAGEFAULT_ERROR_INVALID_DOMAINS - Command was malformed or addressed to an unrecognized vehicle system. May indicate client error or older vehicle firmware. */
  MESSAGEFAULT_ERROR_INVALID_DOMAINS = 8,
  /** MESSAGEFAULT_ERROR_INVALID_COMMAND - Unrecognized command. May indicate client error or unsupported vehicle firmware. */
  MESSAGEFAULT_ERROR_INVALID_COMMAND = 9,
  /** MESSAGEFAULT_ERROR_DECODING - Could not parse command. Indicates client error. */
  MESSAGEFAULT_ERROR_DECODING = 10,
  /** MESSAGEFAULT_ERROR_INTERNAL - Internal vehicle error. Try again. Most commonly encountered when the vehicle has not finished booting. */
  MESSAGEFAULT_ERROR_INTERNAL = 11,
  /** MESSAGEFAULT_ERROR_WRONG_PERSONALIZATION - Command sent to wrong VIN. */
  MESSAGEFAULT_ERROR_WRONG_PERSONALIZATION = 12,
  /** MESSAGEFAULT_ERROR_BAD_PARAMETER - Command was malformed or used a deprecated parameter. */
  MESSAGEFAULT_ERROR_BAD_PARAMETER = 13,
  /** MESSAGEFAULT_ERROR_KEYCHAIN_IS_FULL - Vehicle's keychain is full. You must delete a key before you can add another. */
  MESSAGEFAULT_ERROR_KEYCHAIN_IS_FULL = 14,
  /** MESSAGEFAULT_ERROR_INCORRECT_EPOCH - Session ID mismatch. Use included session info to update session and try again. */
  MESSAGEFAULT_ERROR_INCORRECT_EPOCH = 15,
  /** MESSAGEFAULT_ERROR_IV_INCORRECT_LENGTH - Initialization Value length is incorrect (AES-GCM must use 12-byte IVs). Indicates a client programming error. */
  MESSAGEFAULT_ERROR_IV_INCORRECT_LENGTH = 16,
  /** MESSAGEFAULT_ERROR_TIME_EXPIRED - Command expired. Use included session info to determine if clocks have desynchronized and try again. */
  MESSAGEFAULT_ERROR_TIME_EXPIRED = 17,
  /** MESSAGEFAULT_ERROR_NOT_PROVISIONED_WITH_IDENTITY - Vehicle has not been provisioned with a VIN and may require service. */
  MESSAGEFAULT_ERROR_NOT_PROVISIONED_WITH_IDENTITY = 18,
  /** MESSAGEFAULT_ERROR_COULD_NOT_HASH_METADATA - Internal vehicle error. */
  MESSAGEFAULT_ERROR_COULD_NOT_HASH_METADATA = 19,
  /** MESSAGEFAULT_ERROR_TIME_TO_LIVE_TOO_LONG - Vehicle rejected command because its expiration time was too far in the future. This is a security precaution. */
  MESSAGEFAULT_ERROR_TIME_TO_LIVE_TOO_LONG = 20,
  /** MESSAGEFAULT_ERROR_REMOTE_ACCESS_DISABLED - The vehicle owner has disabled Mobile access. */
  MESSAGEFAULT_ERROR_REMOTE_ACCESS_DISABLED = 21,
  /** MESSAGEFAULT_ERROR_REMOTE_SERVICE_ACCESS_DISABLED - The command was authorized with a Service key, but the vehicle has not been configured to permit remote service commands. */
  MESSAGEFAULT_ERROR_REMOTE_SERVICE_ACCESS_DISABLED = 22,
  /** MESSAGEFAULT_ERROR_COMMAND_REQUIRES_ACCOUNT_CREDENTIALS - The command requires proof of Tesla account credentials but was not sent over a channel that provides this proof. Resend the command using Fleet API. */
  MESSAGEFAULT_ERROR_COMMAND_REQUIRES_ACCOUNT_CREDENTIALS = 23,
  UNRECOGNIZED = -1,
}

export function messageFaultEFromJSON(object: any): MessageFaultE {
  switch (object) {
    case 0:
    case "MESSAGEFAULT_ERROR_NONE":
      return MessageFaultE.MESSAGEFAULT_ERROR_NONE;
    case 1:
    case "MESSAGEFAULT_ERROR_BUSY":
      return MessageFaultE.MESSAGEFAULT_ERROR_BUSY;
    case 2:
    case "MESSAGEFAULT_ERROR_TIMEOUT":
      return MessageFaultE.MESSAGEFAULT_ERROR_TIMEOUT;
    case 3:
    case "MESSAGEFAULT_ERROR_UNKNOWN_KEY_ID":
      return MessageFaultE.MESSAGEFAULT_ERROR_UNKNOWN_KEY_ID;
    case 4:
    case "MESSAGEFAULT_ERROR_INACTIVE_KEY":
      return MessageFaultE.MESSAGEFAULT_ERROR_INACTIVE_KEY;
    case 5:
    case "MESSAGEFAULT_ERROR_INVALID_SIGNATURE":
      return MessageFaultE.MESSAGEFAULT_ERROR_INVALID_SIGNATURE;
    case 6:
    case "MESSAGEFAULT_ERROR_INVALID_TOKEN_OR_COUNTER":
      return MessageFaultE.MESSAGEFAULT_ERROR_INVALID_TOKEN_OR_COUNTER;
    case 7:
    case "MESSAGEFAULT_ERROR_INSUFFICIENT_PRIVILEGES":
      return MessageFaultE.MESSAGEFAULT_ERROR_INSUFFICIENT_PRIVILEGES;
    case 8:
    case "MESSAGEFAULT_ERROR_INVALID_DOMAINS":
      return MessageFaultE.MESSAGEFAULT_ERROR_INVALID_DOMAINS;
    case 9:
    case "MESSAGEFAULT_ERROR_INVALID_COMMAND":
      return MessageFaultE.MESSAGEFAULT_ERROR_INVALID_COMMAND;
    case 10:
    case "MESSAGEFAULT_ERROR_DECODING":
      return MessageFaultE.MESSAGEFAULT_ERROR_DECODING;
    case 11:
    case "MESSAGEFAULT_ERROR_INTERNAL":
      return MessageFaultE.MESSAGEFAULT_ERROR_INTERNAL;
    case 12:
    case "MESSAGEFAULT_ERROR_WRONG_PERSONALIZATION":
      return MessageFaultE.MESSAGEFAULT_ERROR_WRONG_PERSONALIZATION;
    case 13:
    case "MESSAGEFAULT_ERROR_BAD_PARAMETER":
      return MessageFaultE.MESSAGEFAULT_ERROR_BAD_PARAMETER;
    case 14:
    case "MESSAGEFAULT_ERROR_KEYCHAIN_IS_FULL":
      return MessageFaultE.MESSAGEFAULT_ERROR_KEYCHAIN_IS_FULL;
    case 15:
    case "MESSAGEFAULT_ERROR_INCORRECT_EPOCH":
      return MessageFaultE.MESSAGEFAULT_ERROR_INCORRECT_EPOCH;
    case 16:
    case "MESSAGEFAULT_ERROR_IV_INCORRECT_LENGTH":
      return MessageFaultE.MESSAGEFAULT_ERROR_IV_INCORRECT_LENGTH;
    case 17:
    case "MESSAGEFAULT_ERROR_TIME_EXPIRED":
      return MessageFaultE.MESSAGEFAULT_ERROR_TIME_EXPIRED;
    case 18:
    case "MESSAGEFAULT_ERROR_NOT_PROVISIONED_WITH_IDENTITY":
      return MessageFaultE.MESSAGEFAULT_ERROR_NOT_PROVISIONED_WITH_IDENTITY;
    case 19:
    case "MESSAGEFAULT_ERROR_COULD_NOT_HASH_METADATA":
      return MessageFaultE.MESSAGEFAULT_ERROR_COULD_NOT_HASH_METADATA;
    case 20:
    case "MESSAGEFAULT_ERROR_TIME_TO_LIVE_TOO_LONG":
      return MessageFaultE.MESSAGEFAULT_ERROR_TIME_TO_LIVE_TOO_LONG;
    case 21:
    case "MESSAGEFAULT_ERROR_REMOTE_ACCESS_DISABLED":
      return MessageFaultE.MESSAGEFAULT_ERROR_REMOTE_ACCESS_DISABLED;
    case 22:
    case "MESSAGEFAULT_ERROR_REMOTE_SERVICE_ACCESS_DISABLED":
      return MessageFaultE.MESSAGEFAULT_ERROR_REMOTE_SERVICE_ACCESS_DISABLED;
    case 23:
    case "MESSAGEFAULT_ERROR_COMMAND_REQUIRES_ACCOUNT_CREDENTIALS":
      return MessageFaultE.MESSAGEFAULT_ERROR_COMMAND_REQUIRES_ACCOUNT_CREDENTIALS;
    case -1:
    case "UNRECOGNIZED":
    default:
      return MessageFaultE.UNRECOGNIZED;
  }
}

export function messageFaultEToJSON(object: MessageFaultE): string {
  switch (object) {
    case MessageFaultE.MESSAGEFAULT_ERROR_NONE:
      return "MESSAGEFAULT_ERROR_NONE";
    case MessageFaultE.MESSAGEFAULT_ERROR_BUSY:
      return "MESSAGEFAULT_ERROR_BUSY";
    case MessageFaultE.MESSAGEFAULT_ERROR_TIMEOUT:
      return "MESSAGEFAULT_ERROR_TIMEOUT";
    case MessageFaultE.MESSAGEFAULT_ERROR_UNKNOWN_KEY_ID:
      return "MESSAGEFAULT_ERROR_UNKNOWN_KEY_ID";
    case MessageFaultE.MESSAGEFAULT_ERROR_INACTIVE_KEY:
      return "MESSAGEFAULT_ERROR_INACTIVE_KEY";
    case MessageFaultE.MESSAGEFAULT_ERROR_INVALID_SIGNATURE:
      return "MESSAGEFAULT_ERROR_INVALID_SIGNATURE";
    case MessageFaultE.MESSAGEFAULT_ERROR_INVALID_TOKEN_OR_COUNTER:
      return "MESSAGEFAULT_ERROR_INVALID_TOKEN_OR_COUNTER";
    case MessageFaultE.MESSAGEFAULT_ERROR_INSUFFICIENT_PRIVILEGES:
      return "MESSAGEFAULT_ERROR_INSUFFICIENT_PRIVILEGES";
    case MessageFaultE.MESSAGEFAULT_ERROR_INVALID_DOMAINS:
      return "MESSAGEFAULT_ERROR_INVALID_DOMAINS";
    case MessageFaultE.MESSAGEFAULT_ERROR_INVALID_COMMAND:
      return "MESSAGEFAULT_ERROR_INVALID_COMMAND";
    case MessageFaultE.MESSAGEFAULT_ERROR_DECODING:
      return "MESSAGEFAULT_ERROR_DECODING";
    case MessageFaultE.MESSAGEFAULT_ERROR_INTERNAL:
      return "MESSAGEFAULT_ERROR_INTERNAL";
    case MessageFaultE.MESSAGEFAULT_ERROR_WRONG_PERSONALIZATION:
      return "MESSAGEFAULT_ERROR_WRONG_PERSONALIZATION";
    case MessageFaultE.MESSAGEFAULT_ERROR_BAD_PARAMETER:
      return "MESSAGEFAULT_ERROR_BAD_PARAMETER";
    case MessageFaultE.MESSAGEFAULT_ERROR_KEYCHAIN_IS_FULL:
      return "MESSAGEFAULT_ERROR_KEYCHAIN_IS_FULL";
    case MessageFaultE.MESSAGEFAULT_ERROR_INCORRECT_EPOCH:
      return "MESSAGEFAULT_ERROR_INCORRECT_EPOCH";
    case MessageFaultE.MESSAGEFAULT_ERROR_IV_INCORRECT_LENGTH:
      return "MESSAGEFAULT_ERROR_IV_INCORRECT_LENGTH";
    case MessageFaultE.MESSAGEFAULT_ERROR_TIME_EXPIRED:
      return "MESSAGEFAULT_ERROR_TIME_EXPIRED";
    case MessageFaultE.MESSAGEFAULT_ERROR_NOT_PROVISIONED_WITH_IDENTITY:
      return "MESSAGEFAULT_ERROR_NOT_PROVISIONED_WITH_IDENTITY";
    case MessageFaultE.MESSAGEFAULT_ERROR_COULD_NOT_HASH_METADATA:
      return "MESSAGEFAULT_ERROR_COULD_NOT_HASH_METADATA";
    case MessageFaultE.MESSAGEFAULT_ERROR_TIME_TO_LIVE_TOO_LONG:
      return "MESSAGEFAULT_ERROR_TIME_TO_LIVE_TOO_LONG";
    case MessageFaultE.MESSAGEFAULT_ERROR_REMOTE_ACCESS_DISABLED:
      return "MESSAGEFAULT_ERROR_REMOTE_ACCESS_DISABLED";
    case MessageFaultE.MESSAGEFAULT_ERROR_REMOTE_SERVICE_ACCESS_DISABLED:
      return "MESSAGEFAULT_ERROR_REMOTE_SERVICE_ACCESS_DISABLED";
    case MessageFaultE.MESSAGEFAULT_ERROR_COMMAND_REQUIRES_ACCOUNT_CREDENTIALS:
      return "MESSAGEFAULT_ERROR_COMMAND_REQUIRES_ACCOUNT_CREDENTIALS";
    case MessageFaultE.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum Flags {
  FLAG_USER_COMMAND = 0,
  FLAG_ENCRYPT_RESPONSE = 1,
  UNRECOGNIZED = -1,
}

export function flagsFromJSON(object: any): Flags {
  switch (object) {
    case 0:
    case "FLAG_USER_COMMAND":
      return Flags.FLAG_USER_COMMAND;
    case 1:
    case "FLAG_ENCRYPT_RESPONSE":
      return Flags.FLAG_ENCRYPT_RESPONSE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Flags.UNRECOGNIZED;
  }
}

export function flagsToJSON(object: Flags): string {
  switch (object) {
    case Flags.FLAG_USER_COMMAND:
      return "FLAG_USER_COMMAND";
    case Flags.FLAG_ENCRYPT_RESPONSE:
      return "FLAG_ENCRYPT_RESPONSE";
    case Flags.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Destination {
  domain?: Domain | undefined;
  routingAddress?: Uint8Array | undefined;
}

export interface MessageStatus {
  operationStatus: OperationStatusE;
  signedMessageFault: MessageFaultE;
}

export interface SessionInfoRequest {
  publicKey: Uint8Array;
  challenge: Uint8Array;
}

export interface RoutableMessage {
  toDestination: Destination | undefined;
  fromDestination: Destination | undefined;
  protobufMessageAsBytes?: Uint8Array | undefined;
  sessionInfoRequest?: SessionInfoRequest | undefined;
  sessionInfo?: Uint8Array | undefined;
  signatureData?: SignatureData | undefined;
  signedMessageStatus?: MessageStatus | undefined;
  requestUuid?: Uint8Array | undefined;
  uuid?: Uint8Array | undefined;
  flags?: number | undefined;
}

function createBaseDestination(): Destination {
  return { domain: undefined, routingAddress: undefined };
}

export const Destination: MessageFns<Destination> = {
  encode(message: Destination, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.domain !== undefined) {
      writer.uint32(8).int32(message.domain);
    }
    if (message.routingAddress !== undefined) {
      writer.uint32(18).bytes(message.routingAddress);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): Destination {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDestination();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }

          message.domain = reader.int32() as any;
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.routingAddress = reader.bytes();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Destination {
    return {
      domain: isSet(object.domain) ? domainFromJSON(object.domain) : undefined,
      routingAddress: isSet(object.routingAddress) ? bytesFromBase64(object.routingAddress) : undefined,
    };
  },

  toJSON(message: Destination): unknown {
    const obj: any = {};
    if (message.domain !== undefined) {
      obj.domain = domainToJSON(message.domain);
    }
    if (message.routingAddress !== undefined) {
      obj.routingAddress = base64FromBytes(message.routingAddress);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Destination>, I>>(base?: I): Destination {
    return Destination.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Destination>, I>>(object: I): Destination {
    const message = createBaseDestination();
    message.domain = object.domain ?? undefined;
    message.routingAddress = object.routingAddress ?? undefined;
    return message;
  },
};

function createBaseMessageStatus(): MessageStatus {
  return { operationStatus: 0, signedMessageFault: 0 };
}

export const MessageStatus: MessageFns<MessageStatus> = {
  encode(message: MessageStatus, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.operationStatus !== 0) {
      writer.uint32(8).int32(message.operationStatus);
    }
    if (message.signedMessageFault !== 0) {
      writer.uint32(16).int32(message.signedMessageFault);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): MessageStatus {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessageStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }

          message.operationStatus = reader.int32() as any;
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }

          message.signedMessageFault = reader.int32() as any;
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MessageStatus {
    return {
      operationStatus: isSet(object.operationStatus) ? operationStatusEFromJSON(object.operationStatus) : 0,
      signedMessageFault: isSet(object.signedMessageFault) ? messageFaultEFromJSON(object.signedMessageFault) : 0,
    };
  },

  toJSON(message: MessageStatus): unknown {
    const obj: any = {};
    if (message.operationStatus !== 0) {
      obj.operationStatus = operationStatusEToJSON(message.operationStatus);
    }
    if (message.signedMessageFault !== 0) {
      obj.signedMessageFault = messageFaultEToJSON(message.signedMessageFault);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MessageStatus>, I>>(base?: I): MessageStatus {
    return MessageStatus.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MessageStatus>, I>>(object: I): MessageStatus {
    const message = createBaseMessageStatus();
    message.operationStatus = object.operationStatus ?? 0;
    message.signedMessageFault = object.signedMessageFault ?? 0;
    return message;
  },
};

function createBaseSessionInfoRequest(): SessionInfoRequest {
  return { publicKey: new Uint8Array(0), challenge: new Uint8Array(0) };
}

export const SessionInfoRequest: MessageFns<SessionInfoRequest> = {
  encode(message: SessionInfoRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.publicKey.length !== 0) {
      writer.uint32(10).bytes(message.publicKey);
    }
    if (message.challenge.length !== 0) {
      writer.uint32(18).bytes(message.challenge);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): SessionInfoRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSessionInfoRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.publicKey = reader.bytes();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.challenge = reader.bytes();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SessionInfoRequest {
    return {
      publicKey: isSet(object.publicKey) ? bytesFromBase64(object.publicKey) : new Uint8Array(0),
      challenge: isSet(object.challenge) ? bytesFromBase64(object.challenge) : new Uint8Array(0),
    };
  },

  toJSON(message: SessionInfoRequest): unknown {
    const obj: any = {};
    if (message.publicKey.length !== 0) {
      obj.publicKey = base64FromBytes(message.publicKey);
    }
    if (message.challenge.length !== 0) {
      obj.challenge = base64FromBytes(message.challenge);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SessionInfoRequest>, I>>(base?: I): SessionInfoRequest {
    return SessionInfoRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SessionInfoRequest>, I>>(object: I): SessionInfoRequest {
    const message = createBaseSessionInfoRequest();
    message.publicKey = object.publicKey ?? new Uint8Array(0);
    message.challenge = object.challenge ?? new Uint8Array(0);
    return message;
  },
};

function createBaseRoutableMessage(): RoutableMessage {
  return {
    toDestination: undefined,
    fromDestination: undefined,
    protobufMessageAsBytes: undefined,
    sessionInfoRequest: undefined,
    sessionInfo: undefined,
    signatureData: undefined,
    signedMessageStatus: undefined,
    requestUuid: undefined,
    uuid: undefined,
    flags: undefined,
  };
}

export const RoutableMessage: MessageFns<RoutableMessage> = {
  encode(message: RoutableMessage, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.toDestination !== undefined) {
      Destination.encode(message.toDestination, writer.uint32(50).fork()).join();
    }
    if (message.fromDestination !== undefined) {
      Destination.encode(message.fromDestination, writer.uint32(58).fork()).join();
    }
    if (message.protobufMessageAsBytes !== undefined) {
      writer.uint32(82).bytes(message.protobufMessageAsBytes);
    }
    if (message.sessionInfoRequest !== undefined) {
      SessionInfoRequest.encode(message.sessionInfoRequest, writer.uint32(114).fork()).join();
    }
    if (message.sessionInfo !== undefined) {
      writer.uint32(122).bytes(message.sessionInfo);
    }
    if (message.signatureData !== undefined) {
      SignatureData.encode(message.signatureData, writer.uint32(106).fork()).join();
    }
    if (message.signedMessageStatus !== undefined) {
      MessageStatus.encode(message.signedMessageStatus, writer.uint32(98).fork()).join();
    }
    if (message.requestUuid !== undefined) {
      writer.uint32(402).bytes(message.requestUuid);
    }
    if (message.uuid !== undefined) {
      writer.uint32(410).bytes(message.uuid);
    }
    if (message.flags !== undefined) {
      writer.uint32(416).uint32(message.flags);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): RoutableMessage {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRoutableMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 6: {
          if (tag !== 50) {
            break;
          }

          message.toDestination = Destination.decode(reader, reader.uint32());
          continue;
        }
        case 7: {
          if (tag !== 58) {
            break;
          }

          message.fromDestination = Destination.decode(reader, reader.uint32());
          continue;
        }
        case 10: {
          if (tag !== 82) {
            break;
          }

          message.protobufMessageAsBytes = reader.bytes();
          continue;
        }
        case 14: {
          if (tag !== 114) {
            break;
          }

          message.sessionInfoRequest = SessionInfoRequest.decode(reader, reader.uint32());
          continue;
        }
        case 15: {
          if (tag !== 122) {
            break;
          }

          message.sessionInfo = reader.bytes();
          continue;
        }
        case 13: {
          if (tag !== 106) {
            break;
          }

          message.signatureData = SignatureData.decode(reader, reader.uint32());
          continue;
        }
        case 12: {
          if (tag !== 98) {
            break;
          }

          message.signedMessageStatus = MessageStatus.decode(reader, reader.uint32());
          continue;
        }
        case 50: {
          if (tag !== 402) {
            break;
          }

          message.requestUuid = reader.bytes();
          continue;
        }
        case 51: {
          if (tag !== 410) {
            break;
          }

          message.uuid = reader.bytes();
          continue;
        }
        case 52: {
          if (tag !== 416) {
            break;
          }

          message.flags = reader.uint32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RoutableMessage {
    return {
      toDestination: isSet(object.toDestination) ? Destination.fromJSON(object.toDestination) : undefined,
      fromDestination: isSet(object.fromDestination) ? Destination.fromJSON(object.fromDestination) : undefined,
      protobufMessageAsBytes: isSet(object.protobufMessageAsBytes)
        ? bytesFromBase64(object.protobufMessageAsBytes)
        : undefined,
      sessionInfoRequest: isSet(object.sessionInfoRequest)
        ? SessionInfoRequest.fromJSON(object.sessionInfoRequest)
        : undefined,
      sessionInfo: isSet(object.sessionInfo) ? bytesFromBase64(object.sessionInfo) : undefined,
      signatureData: isSet(object.signatureData) ? SignatureData.fromJSON(object.signatureData) : undefined,
      signedMessageStatus: isSet(object.signedMessageStatus)
        ? MessageStatus.fromJSON(object.signedMessageStatus)
        : undefined,
      requestUuid: isSet(object.requestUuid) ? bytesFromBase64(object.requestUuid) : undefined,
      uuid: isSet(object.uuid) ? bytesFromBase64(object.uuid) : undefined,
      flags: isSet(object.flags) ? globalThis.Number(object.flags) : undefined,
    };
  },

  toJSON(message: RoutableMessage): unknown {
    const obj: any = {};
    if (message.toDestination !== undefined) {
      obj.toDestination = Destination.toJSON(message.toDestination);
    }
    if (message.fromDestination !== undefined) {
      obj.fromDestination = Destination.toJSON(message.fromDestination);
    }
    if (message.protobufMessageAsBytes !== undefined) {
      obj.protobufMessageAsBytes = base64FromBytes(message.protobufMessageAsBytes);
    }
    if (message.sessionInfoRequest !== undefined) {
      obj.sessionInfoRequest = SessionInfoRequest.toJSON(message.sessionInfoRequest);
    }
    if (message.sessionInfo !== undefined) {
      obj.sessionInfo = base64FromBytes(message.sessionInfo);
    }
    if (message.signatureData !== undefined) {
      obj.signatureData = SignatureData.toJSON(message.signatureData);
    }
    if (message.signedMessageStatus !== undefined) {
      obj.signedMessageStatus = MessageStatus.toJSON(message.signedMessageStatus);
    }
    if (message.requestUuid !== undefined) {
      obj.requestUuid = base64FromBytes(message.requestUuid);
    }
    if (message.uuid !== undefined) {
      obj.uuid = base64FromBytes(message.uuid);
    }
    if (message.flags !== undefined) {
      obj.flags = Math.round(message.flags);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RoutableMessage>, I>>(base?: I): RoutableMessage {
    return RoutableMessage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RoutableMessage>, I>>(object: I): RoutableMessage {
    const message = createBaseRoutableMessage();
    message.toDestination = (object.toDestination !== undefined && object.toDestination !== null)
      ? Destination.fromPartial(object.toDestination)
      : undefined;
    message.fromDestination = (object.fromDestination !== undefined && object.fromDestination !== null)
      ? Destination.fromPartial(object.fromDestination)
      : undefined;
    message.protobufMessageAsBytes = object.protobufMessageAsBytes ?? undefined;
    message.sessionInfoRequest = (object.sessionInfoRequest !== undefined && object.sessionInfoRequest !== null)
      ? SessionInfoRequest.fromPartial(object.sessionInfoRequest)
      : undefined;
    message.sessionInfo = object.sessionInfo ?? undefined;
    message.signatureData = (object.signatureData !== undefined && object.signatureData !== null)
      ? SignatureData.fromPartial(object.signatureData)
      : undefined;
    message.signedMessageStatus = (object.signedMessageStatus !== undefined && object.signedMessageStatus !== null)
      ? MessageStatus.fromPartial(object.signedMessageStatus)
      : undefined;
    message.requestUuid = object.requestUuid ?? undefined;
    message.uuid = object.uuid ?? undefined;
    message.flags = object.flags ?? undefined;
    return message;
  },
};

function bytesFromBase64(b64: string): Uint8Array {
  if ((globalThis as any).Buffer) {
    return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = globalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if ((globalThis as any).Buffer) {
    return globalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(globalThis.String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export interface MessageFns<T> {
  encode(message: T, writer?: BinaryWriter): BinaryWriter;
  decode(input: BinaryReader | Uint8Array, length?: number): T;
  fromJSON(object: any): T;
  toJSON(message: T): unknown;
  create<I extends Exact<DeepPartial<T>, I>>(base?: I): T;
  fromPartial<I extends Exact<DeepPartial<T>, I>>(object: I): T;
}