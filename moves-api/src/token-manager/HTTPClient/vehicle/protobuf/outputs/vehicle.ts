// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.6.0
//   protoc               v3.12.4
// source: vehicle.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";

export const protobufPackage = "CarServer";

export interface VehicleState {
  guestMode: VehicleState_GuestMode | undefined;
}

export interface VehicleState_GuestMode {
  GuestModeActive: boolean;
}

export interface ClimateState {
}

export enum ClimateState_CopActivationTemp {
  CopActivationTempUnspecified = 0,
  CopActivationTempLow = 1,
  CopActivationTempMedium = 2,
  CopActivationTempHigh = 3,
  UNRECOGNIZED = -1,
}

export function climateState_CopActivationTempFromJSON(object: any): ClimateState_CopActivationTemp {
  switch (object) {
    case 0:
    case "CopActivationTempUnspecified":
      return ClimateState_CopActivationTemp.CopActivationTempUnspecified;
    case 1:
    case "CopActivationTempLow":
      return ClimateState_CopActivationTemp.CopActivationTempLow;
    case 2:
    case "CopActivationTempMedium":
      return ClimateState_CopActivationTemp.CopActivationTempMedium;
    case 3:
    case "CopActivationTempHigh":
      return ClimateState_CopActivationTemp.CopActivationTempHigh;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ClimateState_CopActivationTemp.UNRECOGNIZED;
  }
}

export function climateState_CopActivationTempToJSON(object: ClimateState_CopActivationTemp): string {
  switch (object) {
    case ClimateState_CopActivationTemp.CopActivationTempUnspecified:
      return "CopActivationTempUnspecified";
    case ClimateState_CopActivationTemp.CopActivationTempLow:
      return "CopActivationTempLow";
    case ClimateState_CopActivationTemp.CopActivationTempMedium:
      return "CopActivationTempMedium";
    case ClimateState_CopActivationTemp.CopActivationTempHigh:
      return "CopActivationTempHigh";
    case ClimateState_CopActivationTemp.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

function createBaseVehicleState(): VehicleState {
  return { guestMode: undefined };
}

export const VehicleState: MessageFns<VehicleState> = {
  encode(message: VehicleState, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.guestMode !== undefined) {
      VehicleState_GuestMode.encode(message.guestMode, writer.uint32(594).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): VehicleState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVehicleState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 74: {
          if (tag !== 594) {
            break;
          }

          message.guestMode = VehicleState_GuestMode.decode(reader, reader.uint32());
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

  fromJSON(object: any): VehicleState {
    return { guestMode: isSet(object.guestMode) ? VehicleState_GuestMode.fromJSON(object.guestMode) : undefined };
  },

  toJSON(message: VehicleState): unknown {
    const obj: any = {};
    if (message.guestMode !== undefined) {
      obj.guestMode = VehicleState_GuestMode.toJSON(message.guestMode);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<VehicleState>, I>>(base?: I): VehicleState {
    return VehicleState.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<VehicleState>, I>>(object: I): VehicleState {
    const message = createBaseVehicleState();
    message.guestMode = (object.guestMode !== undefined && object.guestMode !== null)
      ? VehicleState_GuestMode.fromPartial(object.guestMode)
      : undefined;
    return message;
  },
};

function createBaseVehicleState_GuestMode(): VehicleState_GuestMode {
  return { GuestModeActive: false };
}

export const VehicleState_GuestMode: MessageFns<VehicleState_GuestMode> = {
  encode(message: VehicleState_GuestMode, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.GuestModeActive !== false) {
      writer.uint32(8).bool(message.GuestModeActive);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): VehicleState_GuestMode {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVehicleState_GuestMode();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }

          message.GuestModeActive = reader.bool();
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

  fromJSON(object: any): VehicleState_GuestMode {
    return { GuestModeActive: isSet(object.GuestModeActive) ? globalThis.Boolean(object.GuestModeActive) : false };
  },

  toJSON(message: VehicleState_GuestMode): unknown {
    const obj: any = {};
    if (message.GuestModeActive !== false) {
      obj.GuestModeActive = message.GuestModeActive;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<VehicleState_GuestMode>, I>>(base?: I): VehicleState_GuestMode {
    return VehicleState_GuestMode.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<VehicleState_GuestMode>, I>>(object: I): VehicleState_GuestMode {
    const message = createBaseVehicleState_GuestMode();
    message.GuestModeActive = object.GuestModeActive ?? false;
    return message;
  },
};

function createBaseClimateState(): ClimateState {
  return {};
}

export const ClimateState: MessageFns<ClimateState> = {
  encode(_: ClimateState, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): ClimateState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClimateState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): ClimateState {
    return {};
  },

  toJSON(_: ClimateState): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<ClimateState>, I>>(base?: I): ClimateState {
    return ClimateState.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ClimateState>, I>>(_: I): ClimateState {
    const message = createBaseClimateState();
    return message;
  },
};

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
