import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';

import event from '../utils/event';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnDestroy {

  sidebarOpen = false;
  preScrollTop: number;
  trigger: boolean;
  scrollSubscription: Subscription;
  @ViewChild('appBody', { static: false }) private appBody: ElementRef;

  constructor (
    public userService: UserService
  ) {
    this.trigger = false;
    this.scrollSubscription = event.toTop.subscribe(() => {
      if (this.appBody) {
        this.appBody.nativeElement.scrollTop = 0;
      }
    });
  }

  ngOnDestroy () {
    if (this.scrollSubscription) { this.scrollSubscription.unsubscribe(); }
  }

  handleScroll (e) {
    if (this.preScrollTop > 0 && this.preScrollTop < e.srcElement.scrollTop) {
      if ((e.srcElement.scrollTop + e.srcElement.clientHeight) >= (e.target.scrollHeight - 100)) {
        if (!this.trigger) {
          this.trigger = true;
          event.atBottom.next(true);
          setTimeout(() => {
            this.trigger = false;
          }, 200);
        }
      }
    }
    this.preScrollTop = e.srcElement.scrollTop;
  }

}
