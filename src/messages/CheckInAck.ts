import { Message } from "@ncss/message";
import { CheckInMessageType } from "./CheckIn";

export class CheckInAck extends Message {
  type = CheckInMessageType.CHECK_IN_ACK;
}
