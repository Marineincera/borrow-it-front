import { User } from './user';
import { Category } from './category';
import { Tag } from './tag';
import { ItemStatus } from './item-status';
import { Loan } from './loan';

export class Item {
    id: number;
    title: string;
    image: string;
    note?: number;
    user: User;
    category: Category;
    tags: Array<Tag>;
    itemStatus: ItemStatus;
    loans: Array<Loan>;

    constructor(item: Item){
        Object.assign(item, this)
    }
}
