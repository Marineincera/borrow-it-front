import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { LoanService } from "src/app/shared/services/loan.service";
import { Loan } from "src/app/shared/models/loan";
import { UserService } from "src/app/shared/services/user.service";
import { User } from "src/app/shared/models/user";
import { LoanStatusService } from "src/app/shared/services/loan-status.service";
import { ItemService } from "src/app/shared/services/item.service";
import { Item } from "src/app/shared/models/item";

@Component({
  selector: "app-validation-page",
  templateUrl: "./validation-page.component.html",
  styleUrls: ["./validation-page.component.scss"],
})
export class ValidationPageComponent implements OnInit {
  loan: Loan;
  validationStatus: string;
  isOwner: boolean;
  isBorrower: boolean;
  status = "";
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loanService: LoanService,
    private userService: UserService,
    private itemService: ItemService,
    private loanstatusService: LoanStatusService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.getLoan(Number(id));
    //observable
    // this.loanService.loanModified.subscribe((loan: Loan) => {
    //   this.loanService.loan = loan;
    //   this.loan = loan;
    // });
  }

  getLoan(id: number) {
    this.loanService.getOneLoan(id).subscribe((data: Loan) => {
      this.loan = data;
      this.loanService.loan = data;
      //observable
      // this.loanService.loanModified.next(data);
      this.determineIfOwnerOrBorrower(data);
      console.log(this.loan);
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
          this.isOwner = false;
          console.log(this.isOwner);
          this.validationStatus = this.determineValidationStatus(this.loan);
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
      if (loan.loanStatus.id === 3) {
        text = "Déclarer que l'objet a été rendu";
        newLoanStatus = 6;
        return text;
      }
      if (loan.loanStatus.id === 4) {
        text = "Déclarer que l'objet a été rendu";
        newLoanStatus = 6;
        return text;
      }
    } else {
      let text = "";
      let newLoanStatus = 0;
      if (loan.loanStatus.id === 2) {
        text = "Indiquer que vous souhaitez rendre l'objet";
        newLoanStatus = 3;
        return text;
      }
      if (loan.loanStatus.id === 5) {
        text = "Déclarer avoir reçu l'objet";
        newLoanStatus = 2;
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

    this.loanService
      .update(loan.id, { loanStatus: { id: newStatus } })
      .subscribe((data) => console.log(data));
  }

  changeItemAvailability(loan: Loan) {
    const newItem: Item = {
      itemStatus: { id: 1 },
    };
    this.itemService.update(loan.borrowedItem.id, newItem).subscribe();
  }

  deleteLoan(loan: Loan) {
    this.loanService.delete(loan.id).subscribe();
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
        this.changeItemAvailability(loan);
        this.deleteLoan(loan);
        return newLoanStatus;
      }
      if (loan.loanStatus.id === 3) {
        newLoanStatus = 6;
        this.changeItemAvailability(loan);
        this.deleteLoan(loan);
        return newLoanStatus;
      }
    } else {
      let newLoanStatus = 0;
      if (loan.loanStatus.id === 2) {
        newLoanStatus = 3;
        return newLoanStatus;
      }
      if (loan.loanStatus.id === 5) {
        newLoanStatus = 2;
        return newLoanStatus;
      }
      if (loan.loanStatus.id === 3) {
        newLoanStatus = 4;
        return newLoanStatus;
      }
    }
  }
}
