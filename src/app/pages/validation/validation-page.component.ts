import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { LoanService } from "src/app/shared/services/loan.service";
import { Loan } from "src/app/shared/models/loan";
import { UserService } from "src/app/shared/services/user.service";
import { User } from "src/app/shared/models/user";
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

  statusChanged: boolean;
  sendMailToOther: string;
  personToContact: string;

  mouseOvered;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loanService: LoanService,
    private userService: UserService,
    private itemService: ItemService
  ) {}

  ngOnInit(): void {
    // get id to display the corresponding loan
    const id = this.route.snapshot.paramMap.get("id");
    this.getLoan(Number(id));
  }

  getLoan(id: number) {
    // get the loan correponding to the id
    this.loanService.getOneLoan(id).subscribe((data: Loan) => {
      this.loan = data;
      this.loanService.loan = data;
      this.determineIfOwnerOrBorrower(data);
    });
  }

  determineIfOwnerOrBorrower(loan: Loan) {
    //determine if the connected user is the owner or the borrower of the item
    if (localStorage.getItem("TOKEN")) {
      this.userService.getMe().subscribe((data: User) => {
        if (data.id === loan.owner.id) {
          this.isOwner = true;
          this.sendMailToOther = `mailto:${loan.borrower.email}`;
          this.personToContact = loan.borrower.pseudo;
          this.validationStatus = this.determineValidationStatus(this.loan);
        }
        if (data.id === loan.borrower.id) {
          this.isBorrower = true;
          this.sendMailToOther = `mailto:${loan.owner.email}`;
          this.personToContact = loan.owner.pseudo;
          this.isOwner = false;
          this.validationStatus = this.determineValidationStatus(this.loan);
        }
      });
    }
  }

  determineValidationStatus(loan: Loan) {
    //to display a sentence according to the status
    if (this.isOwner) {
      let text = "";
      if (loan.loanStatus.id === 1) {
        text = "Valider le prêt";
        return text;
      }
      if (loan.loanStatus.id === 5) {
        text = "Déclarer que l'objet est prêté";
        return text;
      }
      if (loan.loanStatus.id === 3) {
        text = "Déclarer que l'objet a été rendu";
        return text;
      }
      if (loan.loanStatus.id === 4) {
        text = "Déclarer que l'objet a été rendu";
        return text;
      }
    } else {
      let text = "";
      if (loan.loanStatus.id === 2) {
        text = "Indiquer que vous souhaitez rendre l'objet";
        return text;
      }
      if (loan.loanStatus.id === 5) {
        text = "Déclarer avoir reçu l'objet";
        return text;
      }
      if (loan.loanStatus.id === 3) {
        text = "Déclarer que l'objet a été rendu";
        return text;
      }
    }
  }

  changeLoanStatus(loan: Loan) {
    // update the status of the loan
    const newStatus = this.changementLoanStatus(loan);
    if (newStatus) {
      this.loanService
        .update(loan.id, { loanStatus: { id: newStatus } })
        .subscribe((data) => {
          if (newStatus === 6) {
            this.deleteLoan(loan);
            this.changeItemAvailability(loan);
            this.router.navigate([
              "loansmonitoring/" + this.userService.connectedUser.id,
            ]);
          } else {
            location.reload();
          }
        });
    }
  }
  changementLoanStatus(loan: Loan) {
    // to get the newStatus when a user wants update the loan
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
      if (loan.loanStatus.id === 3) {
        newLoanStatus = 6;
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

  changeItemAvailability(loan: Loan) {
    //if the loan is over, the item must be available back
    const newItem: Item = {
      itemStatus: { id: 1 },
    };
    this.itemService.update(loan.borrowedItem.id, newItem).subscribe();
  }

  deleteLoan(loan: Loan) {
    //and it must be deleted

    this.loanService.delete(loan.id).subscribe((data) => {
      this.router.navigate(["items/" + this.loan.borrowedItem.id]);
    });
  }

  declineLoan(loan) {
    this.deleteLoan(loan);
  }
}
