import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-public-small-user',
  templateUrl: './public-small-user.component.html',
  styleUrls: ['./public-small-user.component.scss']
})
export class PublicSmallUserComponent implements OnInit {

  @Input()
  userReceived: User;
  
  constructor() { }

  ngOnInit(): void {
  }

}
