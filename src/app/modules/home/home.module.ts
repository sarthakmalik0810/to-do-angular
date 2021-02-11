import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { AddTaskModule } from 'src/app/shared/add-task/add-task.module';
import { AddTaskComponent } from 'src/app/shared/add-task/add-task.component';
import { ConfirmDialogModule } from 'src/app/shared/confirm-dialog/confirm-dialog.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatButtonModule,
    DragDropModule,
    MatDialogModule,
    MatCardModule,
    AddTaskModule,
    ConfirmDialogModule
  ],
  entryComponents: [AddTaskComponent]
})
export class HomeModule { }
