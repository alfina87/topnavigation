import * as dotenv from "dotenv";
import * as process from "node:process";

dotenv.config();

class EnvConfig {
  public readonly PORT: string | number;
  public readonly API_URL?: string;
  public readonly MAIL_APP_PASSWORD?: string;
  public readonly OPEN_AI_KEY?: string;
  public readonly LOG_LEVEL?: string;
  public readonly ADMIN_EMAIL?: string;

  public constructor() {
    this.PORT = process.env.PORT || 8080;
    this.API_URL = process.env.API_URL;
    this.MAIL_APP_PASSWORD = process.env.MAIL_APP_PASSWORD;
    this.OPEN_AI_KEY = process.env.OPEN_AI_KEY;
    this.LOG_LEVEL = process.env.LOG_LEVEL;
    this.ADMIN_EMAIL = process.env.ADMIN_EMAIL;
    this.validateEnv();
  }

  private validateEnv(): void {
    const requiredEnvVars = [{ key: this.OPEN_AI_KEY, name: "OPEN_AI_KEY" }];

    requiredEnvVars.forEach(({ key, name }) => {
      if (!key) {
        throw new Error(`${name} is required`);
      }
    });
  }
}

const config = new EnvConfig();

export default config;
