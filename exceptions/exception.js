import { OutputType, print } from "../ utils/print.js";

export default class Exception extends Error {
  static WRONG_DB_USERNAME_PASSWORD = "Wrong database's user and password";
  static WRONG_CONNECTION_STRING = "Wrong connection string";
  static CANNOT_CONNECT_MONGODB = "Cannot connect mongodb";

  constructor(message) {
    super(message);
    print(message, OutputType.ERROR);
  }
}
