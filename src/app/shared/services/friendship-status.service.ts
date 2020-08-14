import { Injectable } from "@angular/core";
import { WshelperService } from "./wshelper.service";
import { FriendshipService } from "./friendship.service";
import { Friendship } from "../models/friendship";
import { FriendshipStatus } from "../models/friendship-status";

@Injectable({
  providedIn: "root",
})
export class FriendshipStatusService {
  static URL = "http://localhost:3000/friendshipstatus";

  constructor(private service: WshelperService) {}

  getAll() {
    return this.service.get(FriendshipStatusService.URL);
  }

  post(friendshipStatus: FriendshipStatus) {
    return this.service.post(FriendshipStatusService.URL, friendshipStatus);
  }

  getOne(id: number) {
    return this.service.get(FriendshipStatusService.URL + "/" + id.toString());
  }

  delete(id) {
    return this.service.delete(FriendshipStatusService.URL + "delete/" + id);
  }

  update(id, friendshipStatus) {
    return this.service.put(
      FriendshipStatusService.URL + "update/" + id,
      friendshipStatus
    );
  }
}
