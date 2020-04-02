import { Component, OnInit, Input } from '@angular/core';
import { ItemService } from 'src/app/shared/services/item.service';
import { Item } from 'src/app/shared/models/item';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private itemService: ItemService) { }

  @Input()
  itemsToDisplay : Item[];
  items: Array<Item> = [];
  users:  Array<User>;
  filter : number;
  
  ngOnInit(): void {
    this.filter = 0;
    this.initializeArray(this.itemsToDisplay);
  }

  initializeArray(arrayParam: Array<any>) {
    this.filter = this.filter + 4;
    if(this.itemsToDisplay){
     for(let i = this.filter - 4; i < this.filter; i++){
       this.items.push(this.itemsToDisplay[i]);
     }
      console.log(this.items)
    }
  }
  
  addItemsToList(array){
    this.initializeArray(array)
  }

  closeList(array: Array<any>){
    array.splice(4,(array.length-4))
    this.ngOnInit()
  }
  

}
