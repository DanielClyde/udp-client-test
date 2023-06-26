import { Message } from "@ncss/message";
import { PingMessageType } from "./Ping";
import { ByteList } from "byte-list";

export class Pong extends Message {
  type = PingMessageType.DEVICE_PONG;
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
