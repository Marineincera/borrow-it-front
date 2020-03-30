import { Item } from './item';

export class Category {
    id: number;
    name: string;
    creationDate?: Date;
    items: Array<Item>;

    constructor(category: Category){
        Object.assign(category, this)
    }
}
