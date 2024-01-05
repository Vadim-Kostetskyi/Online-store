import { IConfig } from './libs/interfaces/config.interface';
import { EnvironmentSchema } from './libs/types/types';

export class Config implements IConfig<EnvironmentSchema> {
  ENV: EnvironmentSchema;

  public constructor() {
    this.ENV = this.envSchema;
  }

  private get envSchema(): EnvironmentSchema {
    return { API: { URL: process.env.REACT_APP_BACKEND_URL as string } };
  }
}
