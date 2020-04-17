import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ISelectionDialog } from '../../types/selection-dialog';
import MESSAGES from '../../constants/messages';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'prct-selection-dialog',
  templateUrl: './selection-dialog.component.html',
  styleUrls: ['./selection-dialog.component.scss']
})
export class SelectionDialogComponent {
  title = '';
  message = '';

  constructor (
    private dialogRef: MatDialogRef<SelectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public config: ISelectionDialog,
    private userService: UserService
  ) {
    this.dialogRef.disableClose = true;
    if (this.config && this.config.id) {
      let message = MESSAGES.S000;
      if (MESSAGES[this.config.id]) { message = MESSAGES[this.config.id]; }
      this.title = message.title;
      this.message = message.message;
    }
  }

  excuteYes () {
    this.config.no = null;
  }

  excuteNo () {
    this.config.yes = null;
  }

}
