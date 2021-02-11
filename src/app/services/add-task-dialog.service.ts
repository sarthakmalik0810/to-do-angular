import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { AddTaskComponent } from '../shared/add-task/add-task.component';

@Injectable()
export class AddTaskDialogService {
  constructor(private matDialog: MatDialog) {}

  dialogRef: MatDialogRef<AddTaskComponent>;

  public open(data?) {
    if(data) {
      this.dialogRef = this.matDialog.open(AddTaskComponent,{data: data});
      console.log(data);
    }
    else {
      this.dialogRef = this.matDialog.open(AddTaskComponent);
    }
  }

  public confirmed(): Observable<any> {
    return this.dialogRef.afterClosed().pipe(
      take(1),
      map((res) => res)
    );
  }
}
