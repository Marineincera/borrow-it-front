import { Item } from "./item";
import { User } from "./user";
import { LoanStatus } from "./loan-status";

export class Loan {
  id?: number;
  borrowedItem: Item;
  borrower: User;
  owner: User;
  borrowDate?: Date;
  loanStatus?: LoanStatus;

  constructor(loan: Loan) {
    Object.assign(loan, this);
  }
}
