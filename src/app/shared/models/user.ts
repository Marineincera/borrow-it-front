import { Item } from './item';
import { Loan } from './loan';
import { Opinion } from './opinion';

export class User {
    id: number;
    avatar?: string;
    pseudo: string;
    email: string;
    password: string;
    city: string;
    registrationDate?: Date;
    walkingDelivery?: boolean;
    letterDelivery?: boolean;
    items?: Array<Item>;
    borrows?: Array<Loan>;
    loans?: Array<Loan>;
    writtenOpinions?: Array<Opinion>;
    receivedOpinions?: Array<Opinion>;

    constructor(user: User){
        Object.assign(user, this)
    }

}
