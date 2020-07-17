import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-authentification",
  templateUrl: "./authentification.component.html",
  styleUrls: ["./authentification.component.scss"],
})
export class AuthentificationComponent implements OnInit {
  inscription: boolean;
  connexion: boolean;
  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.inscription = false;
    this.connexion = true;
  }

  openInscription(subscribe, connect) {
    this.inscription = true;
    this.connexion = false;
    subscribe.classList.add("selected");
    connect.classList.remove("selected");
  }

  openConnexion(connect, subscribe) {
    this.connexion = true;
    this.inscription = false;
    connect.classList.add("selected");
    subscribe.classList.remove("selected");
  }
}
