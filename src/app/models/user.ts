import {Role} from "./role";

export class User {
  [x: string]: any;
  // [x: string]: any;
  id?: number | undefined;
  username?: string = "";
  password?: string = "";
  name?: string = "";
  token?: string = "";
  role: Role = Role.USER;
  confirmPassword?: string = "";

}
