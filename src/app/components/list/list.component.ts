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
  arrayToDisplay: Array<any>;

  array: Array<any> = [];
  users = false;
  title : string;
  filter : number;
  
  ngOnInit(): void {
    this.determineTypeOfArray(this.arrayToDisplay);
    this.filter = 0;
    this.initializeArray(this.arrayToDisplay);
  }

  determineTypeOfArray(array){
    if(Object.getOwnPropertyDescriptor(array[0], 'pseudo')){
    this.users = true;
    this.title = "Membres";
    }
    if(Object.getOwnPropertyDescriptor(array[0], 'note')){
      this.title = "Objets Disponibles"
    }
  }

  initializeArray(arrayParam: Array<any>) {
    this.filter = this.filter + 4;
    if(this.arrayToDisplay){
     for(let i = this.filter - 4; i < this.filter; i++){
       this.array.push(this.arrayToDisplay[i]);
     }
      console.log(this.array)
    }
  }
  
  addElementsToList(array){
    this.initializeArray(array)
  }

  closeList(array: Array<any>){
    array.splice(0,array.length)
    this.ngOnInit()
  }
  

}
