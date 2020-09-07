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
  initDone: boolean;

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
    this.initialization(id);
  }

  async initialization(id: string) {
    this.loan = await this.getLoan(Number(id));
    const ownerOrNot: boolean = await this.determineIfOwnerOrBorrower(
      this.loan
    );
    //determine next step
    this.validationStatus = await this.determineValidationStatus(
      this.loan,
      ownerOrNot
    );

    // this.userService.getMe().subscribe((data: User) => {
    //   this.userService.userModified.next(data);
    //   this.initDone = true;
    // });
  }

  async getLoan(id: number) {
    // get the loan correponding to the id
    return await this.loanService
      .getOneLoan(id)
      .toPromise()
      .then((res: Loan) => {
        return res;
      });
  }

  async determineIfOwnerOrBorrower(loan: Loan) {
    //determine if the connected user is the owner or the borrower of the item
    let owner: boolean;
    if (localStorage.getItem("TOKEN")) {
      await this.userService
        .getMe()
        .toPromise()
        .then((res: User) => {
          if (res.id === loan.owner.id) {
            this.isOwner = true;
            this.sendMailToOther = `mailto:${loan.borrower.email}`;
            this.personToContact = loan.borrower.pseudo;
            return (owner = true);
          }
          if (res.id === loan.borrower.id) {
            this.isBorrower = true;
            this.sendMailToOther = `mailto:${loan.owner.email}`;
            this.personToContact = loan.owner.pseudo;
            this.isOwner = false;
            return (owner = false);
          }
        });
      return owner;
    }
  }

  determineValidationStatus(loan: Loan, ownerOrNot: boolean) {
    //to display a sentence according to the status
    if (ownerOrNot) {
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

  async changeLoanStatus(loan: Loan) {
    // update the status of the loan
    const newStatus = await this.changementLoanStatus(loan);
    this.loanService
      .update(loan.id, { loanStatus: { id: newStatus } })
      .subscribe(async (data) => {
        if (newStatus === 6) {
          const deleteLoan = await this.deleteLoan(loan);
          if (deleteLoan) {
            const changeItemAvailability = await this.changeItemAvailability(
              loan
            );
            this.router.navigate([
              "loansmonitoring/" + this.userService.connectedUser.id,
            ]);
          } else {
            throw new Error("erreur lors de la suppression du pret");
          }
        } else {
          location.reload();
        }
      });
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
    return this.loanService
      .delete(loan.id)
      .toPromise()
      .then((res) => {
        return true;
      });
  }

  declineLoan(loan) {
    this.deleteLoan(loan);
    this.router.navigate(["items/" + this.loan.borrowedItem.id]);
  }
}
