import { Injectable } from "@angular/core";
import { WshelperService } from "./wshelper.service";
import { Evaluation } from "../models/evaluation";

@Injectable({
  providedIn: "root",
})
export class EvaluationService {
  static URL = "http://localhost:3000/evaluations";

  constructor(private service: WshelperService) {}

  getAll() {
    return this.service.get(EvaluationService.URL);
  }

  getFilter(number: number) {
    return this.service.get(EvaluationService.URL + "/filter/" + number);
  }

  post(evaluation: Evaluation) {
    return this.service.post(EvaluationService.URL, evaluation);
  }

  getOne(id: number) {
    return this.service.get(EvaluationService.URL + "/" + id.toString());
  }

  delete(id) {
    return this.service.delete(EvaluationService.URL + "delete/" + id);
  }

  update(id, evaluation) {
    return this.service.put(EvaluationService.URL + "modify/" + id, evaluation);
  }
}
