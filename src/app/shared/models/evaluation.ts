export class Evaluation {
  id?: number;
  note!: number;
  item!: number;
  user!: number;

  constructor(evaluation: Evaluation) {
    Object.assign(evaluation, this);
  }
}
