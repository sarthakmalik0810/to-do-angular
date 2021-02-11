import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private snackBar: SnackbarService) {}

  getAllTasks() {
    let tasks = JSON.parse(window.localStorage.getItem('tasks'));
    if (tasks === null) {
      tasks = [];
    }
    return tasks;
  }

  addTask(taskToBeAdded: Task) {
    const tasksLocalStorage = window.localStorage.getItem('tasks');
    let tasks = [];
    if (tasksLocalStorage !== null) {
      tasks = JSON.parse(tasksLocalStorage);
    }
    taskToBeAdded.progress = 'todo';
    taskToBeAdded.id = tasks.length + 1;

    tasks.push(taskToBeAdded);
    window.localStorage.setItem('tasks', JSON.stringify(tasks));
    this.snackBar.openSnackbarWithStyle('Task Added!', 'green-snackbar');
  }

  updateTask(taskToBeUpdated, taskList) {
    const taskToChange = taskToBeUpdated;
    const tasks = JSON.parse(window.localStorage.getItem('tasks'));
    const saved = tasks.filter((item) => {
      taskList.filter((task) => {
        if (item.id === task.id) {
          if (item.id === taskToChange.id) {
            item.progress = taskToChange.progress;
          }
          item.order = task.order;
          item.description = task.description;
          item.id = task.id;
          item.priority = task.priority;
          item.deadline = task.deadline;
          item.title = task.title;
        }
      });
      return item;
    });
    console.log(saved);
    window.localStorage.setItem('tasks', JSON.stringify(saved));
  }

  deleteTask(task) {
    const tasks = JSON.parse(window.localStorage.getItem('tasks'));
    const saved = tasks.filter((item) => item.id !== task.id);
    window.localStorage.setItem('tasks', JSON.stringify(saved));
    this.snackBar.openSnackbarWithStyle('Task Deleted', 'red-snackbar');
  }

  updateSpecificTask(task) {
    const tasks = JSON.parse(window.localStorage.getItem('tasks'));
    console.log(task);
    const saved = tasks.filter((item) => {
      if (item.id === task.id) {
        item.priority = task.priority;
        item.deadline = task.deadline;
        item.description = task.description;
        item.title = task.title;
      }
      return item;
    });
    window.localStorage.setItem('tasks', JSON.stringify(saved));
    this.snackBar.openSnackbarWithStyle('Task Updated', 'green-snackbar');
  }
}
