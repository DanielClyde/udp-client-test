import { Message } from "@ncss/message";
import { ByteList } from "byte-list";

export enum CheckInMessageType {
  GROUP_MASK = 0x3B10,
  DEVICE_CHECK_IN = 0x3B11,
  CHECK_IN_ACK = 0x3B12,
}

export class CheckIn extends Message {
  type = CheckInMessageType.DEVICE_CHECK_IN;
  deviceId: number;

  constructor(deviceId: number) {
    super();
    this.deviceId = deviceId;
  }

  serialize(): ByteList {
    const bytes = super.serialize();
    bytes.writeUInt32(this.deviceId);
    return bytes;
  }

  deserialize(byteList: ByteList): void {
    super.deserialize(byteList);
    this.deviceId = byteList.readUInt32();
  }
}
