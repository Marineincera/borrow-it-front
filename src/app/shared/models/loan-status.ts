import { Loan } from './loan';

export class LoanStatus {
    id: number;
    name: string;
    loans?: Array<Loan>;

    constructor(loanStatus: LoanStatus){
        Object.assign(loanStatus, this)
    }
}
