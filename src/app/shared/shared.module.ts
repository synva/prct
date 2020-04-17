import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';
import { LockUIComponent } from './lock-ui/lock-ui.component';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';
import { SelectionDialogComponent } from './selection-dialog/selection-dialog.component';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    SidenavListComponent,
    LockUIComponent,
    MessageDialogComponent,
    SelectionDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    SidenavListComponent
  ],
  entryComponents: [
    LockUIComponent,
    MessageDialogComponent,
    SelectionDialogComponent
  ]
})
export class SharedModule { }
