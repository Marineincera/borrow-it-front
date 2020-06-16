import { Item } from './item';

export class ItemStatus {
    id: number;
    name: string;
    items?: Array<Item>;

    constructor(itemStatus: ItemStatus){
        Object.assign(itemStatus, this)
    }
}
