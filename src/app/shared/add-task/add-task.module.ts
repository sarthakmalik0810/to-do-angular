import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { AddTaskComponent } from './add-task.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { AddTaskDialogService } from 'src/app/services/add-task-dialog.service';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  NgbDatepickerModule,
  NgbTimepickerModule,
} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AddTaskComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
  ],
  exports: [AddTaskComponent],
  providers: [AddTaskDialogService, MatDatepickerModule],
})
export class AddTaskModule {}
