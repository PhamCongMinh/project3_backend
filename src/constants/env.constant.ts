import * as dotenv from 'dotenv';
dotenv.config();
export enum EEnvKey {
  NODE_ENV = 'NODE_ENV',
  PORT = 'PORT',
  GLOBAL_PREFIX = 'GLOBAL_PREFIX',
  SWAGGER_PATH = 'SWAGGER_PATH',
  SWAGGER_IS_PUBLIC = 'SWAGGER_IS_PUBLIC',
  SWAGGER_HOST = 'SWAGGER_HOST',
  SWAGGER_VERSION = 'SWAGGER_VERSION',
  SWAGGER_TITLE = 'SWAGGER_TITLE',
  SWAGGER_DESC = 'SWAGGER_DESC',

  MONGO_URI = 'MONGO_URI',

  IS_WRITE_LOG = 'IS_WRITE_LOG',
  LOG_LEVEL = 'LOG_LEVEL',

  REDIS_HOST = 'REDIS_HOST',
  REDIS_PASSWORD = 'REDIS_PASSWORD',
  REDIS_PORT = 'REDIS_PORT',
  REDIS_DB_NUMBER = 'REDIS_DB_NUMBER',

  TOKEN_EXPIRE_TIME = 'TOKEN_EXPIRE_TIME',
  TOKEN_AUTH_KEY = 'TOKEN_AUTH_KEY',
}

export const isDevelopmentEnv = () =>
  process.env.NODE_ENV?.toUpperCase() === 'DEVELOPMENT' ||
  process.env.NODE_ENV?.toUpperCase() === 'STAGING';
