import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'prct-lock-ui',
  templateUrl: './lock-ui.component.html',
  styleUrls: ['./lock-ui.component.scss']
})
export class LockUIComponent {

  constructor (
    private dialogRef: MatDialogRef<LockUIComponent>
  ) {
    this.dialogRef.disableClose = true;
  }

}
