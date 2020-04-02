import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/shared/services/item.service';
import { Item } from 'src/app/shared/models/item';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private itemService: ItemService) { }

  items: Array<Item>;
  userClicks: number;
  
  ngOnInit(): void {
    this.userClicks = 0;
    this.addItemsToList();
  }

  addItemsToList(){
    this.userClicks = this.userClicks + 1;
    this.itemService.getItemFilter(4 * this.userClicks).subscribe((data: Array<Item>) => {
      this.items = data
      console.log(this.userClicks)
    })
  }

  closeList(){
    this.userClicks = 0;
    this.addItemsToList()
  }

}
