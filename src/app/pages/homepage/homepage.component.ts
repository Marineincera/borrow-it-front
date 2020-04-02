import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/shared/models/item';
import { ItemService } from 'src/app/shared/services/item.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(private itemService: ItemService) { }

  items: Array<Item>;


  ngOnInit(): void {
    this.initializeItemsArray();
  }

  initializeItemsArray(){
        this.itemService.getAllItem().subscribe((data: Array<Item>) => {
      this.items = data
      console.log(this.items)
    })
  }

  // this.itemService.getItemFilter(4 * this.userClicks).subscribe((data: Array<Item>) => {
  //   this.items = data
  //   console.log(this.items)

  // addItemsToList(){
  //   this.userClicks = this.userClicks + 1;
  //   this.itemService.getItemFilter(4 * this.userClicks).subscribe((data: Array<Item>) => {
  //     this.items = data
  //     console.log(this.userClicks)
  //   })
  // }

  // closeList(){
  //   this.userClicks = 0;
  //   this.addItemsToList()
  // }

}
