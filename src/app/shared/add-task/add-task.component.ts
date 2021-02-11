import {
  Component,
  HostListener,
  Inject,
  OnInit,
  Optional,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/app/interfaces/task';
import { DateTime } from 'luxon';
import { SnackbarService } from 'src/app/services/snackbar.service';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  form: FormGroup;
  addForm: boolean = true;
  constructor(
    private formBuilder: FormBuilder,
    public matDialog: MatDialogRef<AddTaskComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Task,
    private snackBar: SnackbarService
  ) {
    if (this.data) this.addForm = false;
  }

  ngOnInit(): void {
    this.initForm();
  }

  public cancel() {
    this.close(false);
  }
  public close(value) {
    this.matDialog.close(value);
  }

  public confirmEdit() {
    if (this.form.valid) {
      let { year, month, day } = this.form.get('deadlineDate').value;
      let { hour, minute, second } = this.form.get('deadlineTime').value;
      // console.log(DateTime.local(year, month, day,hour, minute, second).toISO());
      let d1 = DateTime.local();
      let d2 = DateTime.local(year, month, day, hour, minute, second);
      if (d1 >= d2) {
        console.log('invalid');
        this.snackBar.openSnackbarWithStyle(
          'Deadline can be only future dates',
          'red-snackbar'
        );
        return;
      } else console.log('valid');
      let deadline = DateTime.local(
        year,
        month,
        day,
        hour,
        minute,
        second
      ).toISO();
      let task: Task = this.data;
      task.id = this.data.id;
      task.deadline = deadline;
      (task.title = this.form.get('title').value),
        (task.description = this.form.get('description').value),
        (task.priority = this.form.get('priority').value),
        (task.order = this.data.order);
      task.progress = this.data.progress;
      this.close(task);
      return;
    }
    this.snackBar.openSnackbarWithStyle('Something went wrong', 'red-snackbar');
    return;
  }
  public confirm() {
    console.log(this.form.value);
    if (this.form.valid) {
      let { year, month, day } = this.form.get('deadlineDate').value;
      let { hour, minute, second } = this.form.get('deadlineTime').value;
      // console.log(DateTime.local(year, month, day,hour, minute, second).toISO());
      let d1 = DateTime.local();
      let d2 = DateTime.local(year, month, day, hour, minute, second);
      if (d1 >= d2) {
        console.log('invalid');
        this.snackBar.openSnackbarWithStyle(
          'Deadline can be only future dates',
          'red-snackbar'
        );
        return;
      } else console.log('valid');
      let deadline = DateTime.local(
        year,
        month,
        day,
        hour,
        minute,
        second
      ).toISO();
      let newTask = {
        title: this.form.get('title').value,
        description: this.form.get('description').value,
        priority: this.form.get('priority').value,
        deadline: deadline,
      };
      this.close(newTask);
      return;
    }
    this.snackBar.openSnackbarWithStyle('Something went wrong', 'red-snackbar');
    return;

    // console.log(DateTime.local(year, month, day,hour, minute, second));
  }
  @HostListener('keydown.esc')
  public onEsc() {
    this.close(false);
  }

  initForm() {
    this.form = this.formBuilder.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ],
      ],
      description: ['', [Validators.required]],
      priority: ['', Validators.required],
      deadlineDate: ['', Validators.required],
      deadlineTime: ['', Validators.required],
    });

    if (this.data) this.initEditForm();
  }

  initEditForm() {
    const { year, month, day, hour, minute, second } = DateTime.fromISO(
      this.data.deadline
    ).toObject();
    this.form.patchValue({
      title: this.data.title,
      description: this.data.description,
      priority: this.data.priority,
      deadlineDate: { year, month, day },
      deadlineTime: { hour, minute, second },
    });
  }
}
