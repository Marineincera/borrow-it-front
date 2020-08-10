import { Injectable } from "@angular/core";
import { WshelperService } from "./wshelper.service";
import { Loan } from "../models/loan";

@Injectable({
  providedIn: "root",
})
export class LoanService {
  static URL = "http://localhost:3000/loans";

  constructor(private service: WshelperService) {}

  getAllLoans() {
    return this.service.get(LoanService.URL);
  }

  postLoan(loan: Loan) {
    return this.service.post(LoanService.URL, loan);
  }

  getOneLoan(id: number) {
    return this.service.get(LoanService.URL + "/" + id.toString());
  }

  delete(id) {
    return this.service.delete(LoanService.URL + "delete/" + id);
  }

  update(id, loan) {
    return this.service.put(LoanService.URL + "modify/" + id, loan);
  }
}
