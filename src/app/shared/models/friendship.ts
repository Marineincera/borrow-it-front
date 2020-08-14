import { User } from "./user";
import { FriendshipStatus } from "./friendship-status";

export class Friendship {
  id?: number;
  userA: User;
  userB: User;
  status: FriendshipStatus;
}
