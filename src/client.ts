import dgram from 'node:dgram';
import { Environment } from './environment';
import { MessageService } from '@ncss/message';
import { Ping, PingMessageType } from './messages/Ping';
import { ByteList } from 'byte-list';
import { Pong } from './messages/Pong';
import { CheckIn, CheckInMessageType } from './messages/CheckIn';
import { CheckInAck } from './messages/CheckInAck';

export class UDPSocket {
  private socket: dgram.Socket = dgram.createSocket('udp4');
  private messageService = new MessageService();

  private interval: NodeJS.Timer;

  constructor() {
    this.messageService.registerMessageGroup(
      {
        mask: PingMessageType.GROUP_MASK,
        messageClass: Ping,
        handler: (msg) => this.onPing(msg),
      },
    );
    this.messageService.registerMessageGroup(
      {
        mask: CheckInMessageType.GROUP_MASK,
        messageClass: CheckInAck,
        handler: (msg) => { console.log('CHECK IN ACK'); }
      },
    );
  }

  init(): Promise<void> {
    this.socket.on('error', (err) => {
      console.error(`Socket error:\n${err.stack}`);
      this.stop();
    });
    this.socket.on('message', (buffer, info) => this.messageService.deserialize(new ByteList(buffer)));
    return new Promise<void>(resolve => {
      this.socket.bind(Environment.LOCAL_PORT, undefined, () => {
        resolve();
      });
    });
  }

  start() {
    setTimeout(() => {
      this.interval = setInterval(() => this.checkin(), Environment.CHECK_IN_INTERVAL);
    }, Math.random() * Environment.CHECK_IN_INTERVAL);
  }

  private send(buffer: Buffer) {
    return new Promise<void>((resolve, reject) => {
      this.socket.send(buffer, Environment.REMOTE_PORT, Environment.REMOTE_ADDRESS, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  stop() {
    return new Promise<void>((resolve, reject) => {
      if (this.interval) {
        clearInterval(this.interval);
      }
      this.socket.close(() => {
        console.log('\nSocket closed\n');
        resolve();
      });
    });
  }

  private onPing(ping: Ping) {
    console.table(ping);
    this.pong();
  }

  private checkin() {
    console.log('CHECKING IN');
    const checkin = new CheckIn(Environment.DEVICE_ID);
    const bytes = this.messageService.serialize(checkin);
    return this.send(bytes.getBuffer());
  }

  private pong() {
    console.log('PONG');
    const pong = new Pong(Environment.DEVICE_ID);
    const bytes = this.messageService.serialize(pong);
    return this.send(bytes.getBuffer());
  }
}
