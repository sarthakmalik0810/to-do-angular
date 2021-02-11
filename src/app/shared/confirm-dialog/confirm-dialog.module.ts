import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  exports: [ConfirmDialogComponent],
  providers: [ConfirmDialogService],
})
export class ConfirmDialogModule {}
