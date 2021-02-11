import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Task } from 'src/app/interfaces/task';
import { AddTaskDialogService } from 'src/app/services/add-task-dialog.service';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import { TaskService } from 'src/app/services/task.service';
import { AddTaskComponent } from 'src/app/shared/add-task/add-task.component';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  tasks: Task[];
  todos: Task[];
  inProgress: Task[];
  done: Task[];
  custom: any;

  getCustomCss() {
    if(this.percentage  <= 33) {
      return 'red';
    }
    else if(this.percentage > 33 && this.percentage <= 66) {
      return 'amber';
    }
    else {
      return 'green';
    }
  }

  percentage: number;
  constructor(
    private dialog: MatDialog,
    private confirmDialog: ConfirmDialogService,
    private addTaskDialog: AddTaskDialogService,
    private taskService: TaskService
  ) {
    this.tasks = this.taskService.getAllTasks();
    this.todos = this.tasks.filter((task) => task.progress == 'todo');
    console.log(this.todos);
    this.inProgress = this.tasks
      .filter((task) => task.progress === 'inProgress')
      .sort((a, b) => a.order - b.order);
    this.done = this.tasks
      .filter((task) => task.progress === 'done')
      .sort((a, b) => a.order - b.order);
    this.setPercentage();
  }

  setPercentage() {
    let percent = ((this.done.length / this.tasks.length)*100).toFixed();
    console.log(percent);
    this.percentage = parseFloat(percent);
  }

  ngOnInit(): void {
    console.log(this.tasks);
  }

  getTasks() {
    this.tasks = this.taskService.getAllTasks();
    this.todos = this.tasks.filter((task) => task.progress == 'todo');
    console.log(this.todos);
    this.inProgress = this.tasks.filter(
      (task) => task.progress === 'inProgress'
    );
    this.inProgress.sort((a, b) => a.order - b.order);
    this.done = this.tasks
      .filter((task) => task.progress === 'done')
      .sort((a, b) => a.order - b.order);
    this.setPercentage();
  }

  openAddDialog() {
    let config: MatDialogConfig = {
      panelClass: 'dialog-responsive',
    };
    this.addTaskDialog.open();
    this.addTaskDialog.confirmed().subscribe((res) => {
      if (res) {
        this.taskService.addTask(res);
      }
      this.getTasks();
    });
  }

  deleteHandler(task) {
    this.confirmDialog.open({
      title: 'Delete Task?',
      message: 'Do you really want to delete this task? This cannot be undone',
      cancelText: 'No',
      confirmText: 'Yes, Delete',
    });
    this.confirmDialog.confirmed().subscribe((res) => {
      if(res) {
        this.taskService.deleteTask(task);
        this.getTasks();
      }
    })
    this.setPercentage();
    
  }

  editHandler(task) {
    this.addTaskDialog.open(task);
    this.addTaskDialog.confirmed().subscribe((res) => {
      if (res) {
        this.taskService.updateSpecificTask(task);
      }
      this.getTasks();
    });
    this.setPercentage();
  }

  onDrop(event: CdkDragDrop<any[]>) {
    let copyOfPrevious: any;
    let isChanged: boolean;
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      const previousOriginal = event.previousContainer.data;
      copyOfPrevious = previousOriginal.map((obj) => {
        const nObj: any = {};
        nObj.order = obj.order;
        nObj.description = obj.description;
        (nObj.id = obj.id),
          (nObj.deadline = obj.deadline),
          (nObj.progress = obj.progress),
          (nObj.priority = obj.priority),
          (nObj.title = obj.title);
        return nObj;
      });

      copyOfPrevious.forEach((obj, index) => {
        obj.order = index;
      });

      isChanged = true;
    }

    const original = event.container.data;
    const updatedItem = event.item.data;
    const copyOfUpdatedItem = { ...updatedItem };

    if (isChanged) {
      if (event.container.id === 'todoList') {
        copyOfUpdatedItem.progress = 'todo';
      } else if (event.container.id === 'inProgressList') {
        copyOfUpdatedItem.progress = 'inProgress';
      } else {
        copyOfUpdatedItem.progress = 'done';
      }
    }

    const copyOfOriginal = original.map((obj) => {
      const nObj: any = {};
      nObj.order = obj.order;
      nObj.description = obj.description;
      (nObj.id = obj.id),
        (nObj.deadline = obj.deadline),
        (nObj.progress = obj.progress),
        (nObj.priority = obj.priority),
        (nObj.title = obj.title);
      return nObj;
    });

    copyOfOriginal.forEach((x, index) => {
      x.order = index;
    });

    let thirdConcat = [];

    let consolidatedList = [];

    if (isChanged) {
      if (
        (event.previousContainer.id === 'todoList' &&
          event.container.id === 'inProgressList') ||
        (event.container.id === 'todoList' &&
          event.previousContainer.id === 'inProgressList')
      ) {
        thirdConcat = [...this.done];
        console.log(thirdConcat);
      } else {
        thirdConcat = [...this.todos];
        console.log(thirdConcat);
      }
      consolidatedList = [...copyOfOriginal, ...copyOfPrevious, ...thirdConcat];
    } else {
      if (event.container.id === 'todoList') {
        consolidatedList = [
          ...copyOfOriginal,
          ...this.inProgress,
          ...this.done,
        ];
      } else if (event.container.id === 'inProgressList') {
        consolidatedList = [...this.todos, ...copyOfOriginal, ...this.done];
      } else {
        consolidatedList = [
          ...this.todos,
          ...this.inProgress,
          ...copyOfOriginal,
        ];
      }
    }

    console.log(consolidatedList);
    this.taskService.updateTask(copyOfUpdatedItem, consolidatedList);
    this.setPercentage();
  }
}
