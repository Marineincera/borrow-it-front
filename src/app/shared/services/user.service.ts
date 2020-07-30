import { Injectable } from "@angular/core";
import { User } from "../models/user";
import { WshelperService } from "./wshelper.service";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class UserService {
  static URL = "http://localhost:3000/";

  connectedUser;

  constructor(private service: WshelperService, private http: HttpClient) {}

  getAllUsers() {
    return this.service.get(UserService.URL + "users");
  }

  postUser(user: User) {
    return this.service.post(UserService.URL + "users", user);
  }

  getOneUser(id: number) {
    return this.service.get(UserService.URL + "users/" + id.toString());
  }

  delete(id) {
    return this.service.delete(UserService.URL + "users/delete/" + id);
  }

  update(id, user) {
    return this.service.put(UserService.URL + "users/modify/" + id, user);
  }

  public connexion(email: string, password: string) {
    return this.http
      .post(
        UserService.URL + "auth/signin",
        { email, password },
        { observe: "response" }
      )
      .pipe(
        map((response: HttpResponse<any>) => {
          const token = response.headers.get("JWT_TOKEN");
          console.log("token :" + token);
          console.log("response" + response);
          this.connectedUser = response.body;
          console.log(this.connectedUser);

          console.log(response);

          localStorage.setItem("TOKEN", token);
          return response.body;
        })
      );
  }
  public inscription(
    pseudo: string,
    email: string,
    city: string,
    password: string
  ) {
    console.log("user posted");
    return this.http.post(UserService.URL + "auth/signup", {
      pseudo,
      email,
      city,
      password,
    });
  }

  // recuperation du user grâce au token et stokage dans le service
  public getMe() {
    return this.http
      .get(UserService.URL + "users/search/me")
      .pipe(tap((user: User) => (this.connectedUser = user)));
  }
}
