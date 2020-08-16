import { Injectable } from "@angular/core";
import { Friendship } from "../models/friendship";
import { WshelperService } from "./wshelper.service";
import { FriendshipDemand } from "../models/friendship-demand";

@Injectable({
  providedIn: "root",
})
export class FriendshipDemandService {
  static URL = "http://localhost:3000/friendshipdemands";

  constructor(private service: WshelperService) {}

  getAll() {
    return this.service.get(FriendshipDemandService.URL);
  }

  post(friendshipDemand: FriendshipDemand) {
    console.log(friendshipDemand);

    return this.service.post(FriendshipDemandService.URL, friendshipDemand);
  }

  getOne(id: number) {
    return this.service.get(FriendshipDemandService.URL + "/" + id.toString());
  }

  delete(id) {
    return this.service.delete(FriendshipDemandService.URL + "/delete/" + id);
  }

  update(id, friendshipDemand: FriendshipDemand) {
    return this.service.put(
      FriendshipDemandService.URL + "/update/" + id,
      friendshipDemand
    );
  }
}
