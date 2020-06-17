import { Injectable } from "@angular/core";
import { User } from "../models/user";
import { WshelperService } from "./wshelper.service";

@Injectable({
  providedIn: "root",
})
export class UserService {
  static URL = "http://localhost:3000/users";

  constructor(private service: WshelperService) {}

  getAllUsers() {
    return this.service.get(UserService.URL);
  }

  postUser(user: User) {
    return this.service.post(UserService.URL, User);
  }

  getOneUser(id: number) {
    return this.service.get(UserService.URL + "/" + id.toString());
  }

  delete(id) {
    return this.service.delete(UserService.URL + "/delete/" + id);
  }

  update(id, user) {
    return this.service.put(UserService.URL + "/modify/" + id, user);
  }
}
