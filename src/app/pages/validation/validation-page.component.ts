import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { LoanService } from "src/app/shared/services/loan.service";
import { Loan } from "src/app/shared/models/loan";
import { UserService } from "src/app/shared/services/user.service";
import { User } from "src/app/shared/models/user";
import { LoanStatusService } from "src/app/shared/services/loan-status.service";

@Component({
  selector: "app-validation-page",
  templateUrl: "./validation-page.component.html",
  styleUrls: ["./validation-page.component.scss"],
})
export class ValidationPageComponent implements OnInit {
  loan: Loan;
  validationStatus: string;
  isOwner = false;
  isBorrower = true;
  status = "";
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loanService: LoanService,
    private userService: UserService,
    private loanstatusService: LoanStatusService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.getLoan(Number(id));
  }

  getLoan(id: number) {
    this.loanService.getOneLoan(id).subscribe((data: Loan) => {
      this.loan = data;
      this.determineIfOwnerOrBorrower(data);
    });
  }

  determineIfOwnerOrBorrower(loan: Loan) {
    if (localStorage.getItem("TOKEN")) {
      this.userService.getMe().subscribe((data: User) => {
        if (data.id === loan.owner.id) {
          this.isOwner = true;
          this.validationStatus = this.determineValidationStatus(this.loan);
        }
        if (data.id === loan.borrower.id) {
          this.isBorrower = true;
        }
      });
    }
  }

  determineValidationStatus(loan: Loan) {
    if (this.isOwner) {
      let text = "";
      let newLoanStatus = 0;
      if (loan.loanStatus.id === 1) {
        text = "Valider le prêt";
        newLoanStatus = 5;
        return text;
      }
      if (loan.loanStatus.id === 5) {
        text = "Déclarer que l'objet est prêté";
        newLoanStatus = 2;
        return text;
      }
      if (loan.loanStatus.id === 4) {
        text = "Déclarer que l'objet a été rendu";
        newLoanStatus = 6;
        return text;
      }
    }
    if (!this.isOwner) {
      let text = "";
      let newLoanStatus = 0;
      if (loan.loanStatus.id === 2 || 5) {
        text = "Indiquer que vous souhaitez rendre l'objet";
        newLoanStatus = 3;
        return text;
      }
      if (loan.loanStatus.id === 3) {
        text = "Déclarer que l'objet a été rendu";
        newLoanStatus = 4;
        return text;
      }
    }
  }

  changeLoanStatus(loan: Loan) {
    const newStatus = this.changementLoanStatus(loan);
    console.log(newStatus);
    this.loanService
      .update(loan.id, { loanStatus: { id: newStatus } })
      .subscribe((data) => console.log(data));
  }

  changementLoanStatus(loan: Loan) {
    if (this.isOwner) {
      let newLoanStatus = 0;
      if (loan.loanStatus.id === 1) {
        newLoanStatus = 5;
        return newLoanStatus;
      }
      if (loan.loanStatus.id === 5) {
        newLoanStatus = 2;
        return newLoanStatus;
      }
      if (loan.loanStatus.id === 4) {
        newLoanStatus = 6;
        return newLoanStatus;
      }
    }
    if (!this.isOwner) {
      let newLoanStatus = 0;
      if (loan.loanStatus.id === 2 || 5) {
        newLoanStatus = 3;
        return newLoanStatus;
      }
      if (loan.loanStatus.id === 3) {
        newLoanStatus = 4;
        return newLoanStatus;
      }
    }
  }
}
