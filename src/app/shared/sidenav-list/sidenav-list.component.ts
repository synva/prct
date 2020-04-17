import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'prct-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent {
  @Output() sidenavClose = new EventEmitter();

  user: User;

  constructor (private userService: UserService) {
    this.user = this.userService.user;
  }

  public closeSidenav () {
    this.sidenavClose.emit();
  }

}
