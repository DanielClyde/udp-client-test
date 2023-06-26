import dotenv from 'dotenv';
dotenv.config();

export const FIVE_SECONDS = 5000;
export const ONE_MINUTE = 60 * 1000;
export const FIVE_MINUTES = 5 * ONE_MINUTE;

export enum EnvironmentType {
  PROD = 'PROD',
  DEV = 'DEV',
  TEST = 'TEST',
}

export class Environment {
  static get ENV(): string { return (process.env.ENV || EnvironmentType.DEV)?.toUpperCase(); }
  static get DEVICE_ID(): number { return (process.env.DEVICE_ID  ? +process.env.DEVICE_ID : 0); }
  static get CHECK_IN_INTERVAL(): number { return (process.env.CHECK_IN_INTERVAL ? +process.env.CHECK_IN_INTERVAL : FIVE_MINUTES); }
  static get LOCAL_PORT(): number { return (process.env.LOCAL_PORT ? +process.env.LOCAL_PORT : 53); }
  static get REMOTE_PORT(): number { return process.env.REMOTE_PORT ? +process.env.REMOTE_PORT : 53 }
  static get REMOTE_ADDRESS(): string { return process.env.REMOTE_ADDRESS ? process.env.REMOTE_ADDRESS : 'localhost' }
}
