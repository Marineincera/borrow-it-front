import { Item } from './item';

export class ItemStatus {
    id: number;
    availaible?: boolean;
    unavailable?: boolean;
    borrowed?: boolean;
    items?: Array<Item>;

    constructor(itemStatus: ItemStatus){
        Object.assign(itemStatus, this)
    }
}
