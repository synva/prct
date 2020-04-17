import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';

import event from './utils/event';
import MESSAGES from './constants/messages';
import { LockUIComponent } from './shared/lock-ui/lock-ui.component';
import { MessageDialogComponent } from './shared/message-dialog/message-dialog.component';
import { SelectionDialogComponent } from './shared/selection-dialog/selection-dialog.component';
import { Lock } from './types/lock';
import { IMessageDialog } from './types/message-dialog';
import { ISelectionDialog } from './types/selection-dialog';
import { UserService } from './services/user.service';

@Component({
  selector: 'prct-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  lock = false;
  lockers: string[] = [];
  lockerDialog: MatDialogRef<LockUIComponent> = null;

  constructor (
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) {
    event.messageDialog.subscribe((config: IMessageDialog) => {
      if (!config) { return; }
      const messageDialog = this.dialog.open(MessageDialogComponent, {
        autoFocus: false,
        data: config
      });
      messageDialog.afterClosed().subscribe(result => {
        if (config.next) {
          config.next();
        }
      });
    });
    event.selectionDialog.subscribe((config: ISelectionDialog) => {
      if (!config) { return; }
      const selectionDialog = this.dialog.open(SelectionDialogComponent, {
        autoFocus: false,
        data: config
      });
      selectionDialog.afterClosed().subscribe(() => {
        if (config.yes) {
          config.yes();
        }
        if (config.no) {
          config.no();
        }
      });
    });
    event.lockUI.subscribe((config: Lock) => {
      if (!config || !config.key) { return; }
      if (config.lock === true) {
        if (this.lockers.length === 0) {
          this.lockerDialog = this.dialog.open(LockUIComponent);
        }
        this.lockers.push(config.key);
        this.lock = true;
      } else {
        if (config.key) {
          this.lockers.some((value, index) => {
            if (value === config.key) {
              this.lockers.splice(index, 1);
              return true;
            }
          });
        }
        if (this.lockers.length === 0) {
          this.lock = false;
          if (this.lockerDialog) {
            this.lockerDialog.close();
            this.lockerDialog = null;
          }
        }
      }
    });
    event.messageSnackBar.subscribe((config: IMessageDialog) => {
      if (!config) { return; }
      let message = MESSAGES[config.id];
      if (!message) { message = MESSAGES.S000; }
      const snackBarRef = this.snackBar.open(message.message, 'OK', {
        duration: 5000
      });
      snackBarRef.afterDismissed().subscribe(() => {
        if (config.next) {
          config.next();
        }
      });
    });
  }
}
