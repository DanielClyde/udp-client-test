import { Message } from "@ncss/message";

export enum PingMessageType {
  GROUP_MASK = 0x3A10,
  PING_DEVICE = 0x3A11,
  DEVICE_PONG = 0x3A12,
}

export class Ping extends Message {
  type = PingMessageType.PING_DEVICE;
}
