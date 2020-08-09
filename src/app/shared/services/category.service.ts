import { Injectable } from "@angular/core";
import { WshelperService } from "./wshelper.service";
import { Category } from "../models/category";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  static URL = "http://localhost:3000/categories";
  categories: Array<Category>;

  constructor(private service: WshelperService) {}

  getAll() {
    return this.service.get(CategoryService.URL);
  }
}
