import { User } from "./user";
import { FriendshipStatus } from "./friendship-status";

export class FriendshipDemand {
  id?: number;
  asker?: User;
  userAskedForFriend?: User;
  status?: FriendshipStatus | number;
}
