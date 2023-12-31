import { __prod__ } from "./constants";
import { Job } from "./entities/Job";
import { Options } from "@mikro-orm/core";
import path from "path";
import { User } from "./entities/User";

const config : Options = {
  user: '',
  password: '',
  migrations: {
    path: path.join(__dirname, "./migrations"),
  },
  entities: [Job, User],
  dbName: "installersDB",
  type: "postgresql",
  debug: !__prod__,
  allowGlobalContext: true
} 

export default config;