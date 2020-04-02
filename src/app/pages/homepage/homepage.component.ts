import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/shared/models/item';
import { ItemService } from 'src/app/shared/services/item.service';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit{

  constructor(private itemService: ItemService, private _userService: UserService) { }

  items: Array<Item>;
  users: Array<User>;


  ngOnInit(): void {
    this.initializeItemsArray();
    this.initializeUsersArray();
  }

  initializeItemsArray(){
        this.itemService.getAllItem().subscribe((data: Array<Item>) => {
      this.items = data
      console.log(this.items)
    })
  }

  initializeUsersArray(){
    this._userService.getAllUsers().subscribe((data: Array<User>) => {
  this.users = data
  console.log(this.users)
})
}



}
