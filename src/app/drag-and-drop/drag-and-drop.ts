import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ToDoTasks, TodoTaskService, Status } from './todo-task-service';

@Component({
  selector: 'app-drag-and-drop',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './drag-and-drop.html',
  styleUrls: ['./drag-and-drop.css'],
})
export class DragAndDrop implements OnInit {

  toDoTasks: ToDoTasks[] = [];
  done: ToDoTasks[] = [];
  todo: ToDoTasks[] = [];

  constructor(private todoTaskService: TodoTaskService,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadToDoTasks();
  }

  loadToDoTasks() {
    this.todoTaskService.getToDoTaskList().subscribe({
      next: (data: ToDoTasks[]) => {
        this.toDoTasks = data;
        this.done = data.filter(task => task.status === Status.COMPLETED);
        this.todo = data.filter(task => task.status === Status.OPEN);
        console.log('Loaded tasks:', this.toDoTasks);
        console.log('Todo tasks:', this.todo);
        console.log('Done tasks:', this.done);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Failed to load todo tasks', err),
    });
  }

  drop(event: CdkDragDrop<ToDoTasks[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      const movedTask = event.container.data[event.currentIndex];
      console.log(movedTask);
      console.log(event.container.id);

      if (event.container.id === 'doneList') {
       console.log('Task moved to done:', movedTask.id.taskName);
        movedTask.status = Status.COMPLETED;
        this.todoTaskService.updateToDoTaskList(movedTask).subscribe();
      } else if (event.container.id === 'todoList') {
        console.log('Task moved to todo:', movedTask.id.taskName);
        movedTask.status = Status.OPEN;
       this.todoTaskService.updateToDoTaskList(movedTask).subscribe();
      }
    }
  }
}
