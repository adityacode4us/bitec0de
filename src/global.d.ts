import { JwtPayload } from "jsonwebtoken";

export {};

declare global {
  interface Error {
    status?: number; // Optional to avoid breaking other Error instances
  }
}
