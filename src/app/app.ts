import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DragAndDrop } from './drag-and-drop/drag-and-drop';
import { ToDoTasks } from './to-do-tasks/to-do-tasks.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, DragAndDrop, ToDoTasks],
  providers: [DragAndDrop],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  title = signal('Async Angular API');
  loading = signal(false);
  error = signal<string | null>(null);


  getKeys(obj: Record<string, any> | undefined): string[] {
    return obj ? Object.keys(obj) : [];
  }

  ngOnInit(): void {
   // this.fetchPosts();
  }

  fetchPosts(): void {
    this.loading.set(true);
    this.error.set(null);
    
  }
}