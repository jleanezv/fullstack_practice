import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core";
import { Request, Response } from "express";
import session from "express-session";

interface ExtendedSession extends session.Session {
  userId?: number;
}

export type MyContext = {
  em: EntityManager<IDatabaseDriver<Connection>>;
  req: Request & { session: ExtendedSession };
  res: Response;
};
