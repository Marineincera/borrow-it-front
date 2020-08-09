import { Injectable } from "@angular/core";
import { WshelperService } from "./wshelper.service";
import { Tag } from "../models/tag";

@Injectable({
  providedIn: "root",
})
export class TagService {
  static URL = "http://localhost:3000/tags";
  tags: Array<Tag>;

  constructor(private service: WshelperService) {}

  getAllTags() {
    return this.service.get(TagService.URL);
  }

  getTagFilter(number: number) {
    return this.service.get(TagService.URL + "/filter/" + number);
  }

  postTag(tag: Tag) {
    return this.service.post(TagService.URL, tag);
  }

  getOneTag(id: number) {
    return this.service.get(TagService.URL + "/" + id.toString());
  }

  delete(id) {
    return this.service.delete(TagService.URL + "delete/" + id);
  }

  update(id, tag) {
    return this.service.put(TagService.URL + "modify/" + id, tag);
  }
}
