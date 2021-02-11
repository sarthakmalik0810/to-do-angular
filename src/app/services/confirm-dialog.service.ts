import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';

@Injectable()
export class ConfirmDialogService {
  constructor(private matDialog: MatDialog) {}

  dialogRef: MatDialogRef<ConfirmDialogComponent>;

  public open(options) {
    this.dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: {
        title: options.title,
        message: options.message,
        cancelText: options.cancelText,
        confirmText: options.confirmText,
      },
    });
  }

  public confirmed(): Observable<any> {
    return this.dialogRef.afterClosed().pipe(
      take(1),
      map((res) => res)
    );
  }
}
