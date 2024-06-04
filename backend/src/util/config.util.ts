import { get } from "config";

const server: { port: string; name: string; version: string } = get("server");

// serverName
export const getServerName = (): string =>
  process?.env?.serverName ? process.env.serverName : server.name;

// serverVersion
export const getServerVersion = (): string =>
  process?.env?.serverVersion ? process.env.serverVersion : server.version;

// PORT
export const getServerPORT = (): string =>
  process?.env?.PORT ? process.env.PORT : server.port;
