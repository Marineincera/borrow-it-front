import { Injectable } from "@angular/core";
import { WshelperService } from "./wshelper.service";
import { Loan } from "../models/loan";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoanService {
  static URL = "http://localhost:3000/loans";

  //observable
  // loanModified = new Subject<Loan>();
  loan: Loan;

  constructor(private service: WshelperService) {}

  getAllLoans() {
    return this.service.get(LoanService.URL);
  }

  postLoan(loan: Loan) {
    return this.service.post(LoanService.URL, {
      borrowedItem: loan.borrowedItem.id,
      borrower: loan.borrower.id,
      owner: loan.owner.id,
      loanStatus: loan.loanStatus,
    });
  }

  getOneLoan(id: number) {
    return this.service.get(LoanService.URL + "/" + id.toString());
  }

  delete(id) {
    return this.service.delete(LoanService.URL + "/delete/" + id);
  }

  update(id, loan) {
    return this.service.put(LoanService.URL + "/update/" + id, loan);
  }

  //observable
  // emitModifiedLoan() {
  //   this.loanModified.next(this.loan);
  // }
}
