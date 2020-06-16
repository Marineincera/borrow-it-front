import { Injectable } from '@angular/core';
import { WshelperService } from './wshelper.service';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  static URL = 'http://localhost:3000/items'

  constructor(private service: WshelperService) { }

  getAllItem() {
    return this.service.get(ItemService.URL );
  }

  getItemFilter(number: number){
    return this.service.get(ItemService.URL + '/filter/' + number );
  }

  postItem(item: Item) {
    return this.service.post(ItemService.URL, item);
  }

  getOneItem(id: number) {
    return this.service.get(ItemService.URL + id.toString());
  }

  delete(id) {
    return this.service.delete(ItemService.URL + 'delete/' + id);
  }

  update(id, item) {
    return this.service.put(ItemService.URL + 'modify/' + id, performance);
  }

}
