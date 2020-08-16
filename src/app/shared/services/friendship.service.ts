import { Injectable } from "@angular/core";
import { Friendship } from "../models/friendship";
import { WshelperService } from "./wshelper.service";

@Injectable({
  providedIn: "root",
})
export class FriendshipService {
  static URL = "http://localhost:3000/friendships";

  constructor(private service: WshelperService) {}

  getAll() {
    return this.service.get(FriendshipService.URL);
  }

  post(friendship: Friendship) {
    console.log(friendship);

    return this.service.post(FriendshipService.URL, friendship);
  }

  getOne(id: number) {
    return this.service.get(FriendshipService.URL + "/" + id.toString());
  }

  delete(id) {
    return this.service.delete(FriendshipService.URL + "/delete/" + id);
  }

  update(id, friendship: Friendship) {
    return this.service.put(
      FriendshipService.URL + "/update/" + id,
      friendship
    );
  }
}
