import { User } from './user';

export class Opinion {
    id: number;
    updateDate?: Date;
    author: User;
    addressee: User;

    constructor(opinion: Opinion){
        Object.assign(opinion, this)
    }
}
