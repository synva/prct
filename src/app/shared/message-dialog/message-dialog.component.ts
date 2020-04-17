import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IMessageDialog } from '../../types/message-dialog';
import MESSAGES from '../../constants/messages';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'prct-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent {
  title = '';
  message = '';

  constructor (
    private dialogRef: MatDialogRef<MessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IMessageDialog,
    private userService: UserService
  ) {
    this.dialogRef.disableClose = true;
    if (this.data && this.data.id) {
      let message = MESSAGES.S000;
      if (MESSAGES[this.data.id]) { message = MESSAGES[this.data.id]; }
      this.title = message.title;
      this.message = message.message;
    }
  }

}
