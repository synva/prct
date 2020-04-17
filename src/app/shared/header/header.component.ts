import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import event from '../../utils/event';
import { ApiService } from '../../services/api.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'prct-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Output() public sidenavToggle = new EventEmitter();

  user: User;

  constructor (
    private router: Router,
    private apiService: ApiService,
    private userService: UserService
  ) {
    this.user = this.userService.user;
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  actUser () {
    if (this.user.isAnonymous) {
      this.router.navigate(['/signin']);
    } else {
      event.selectionDialog.next({
        id: 'I004',
        yes: () => {
          this.apiService.get('/logout').subscribe(() => {
            this.user.logout();
            this.router.navigate(['/']);
          });
        }
      });
    }
  }

}
