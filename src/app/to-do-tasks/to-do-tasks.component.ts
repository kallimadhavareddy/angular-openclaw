import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppConfig } from '../config/app.config';

export enum Category {
  WORK = 'WORK',
  HOME = 'HOME',
  SCHOOL = 'SCHOOL',
  OTHER = 'OTHER'
}

export enum Priority {
  HIGH = 'HIGH',  
  MEDIUM = 'MEDIUM',
  LOW = 'LOW'
}

export enum Status {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

@Component({
  selector: 'app-to-do-tasks',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './to-do-tasks.component.html',
  styleUrl: './to-do-tasks.component.css',
})
export class ToDoTasks {

  todoTaskRequest = {
    id: {
      taskName: '',
      category: 'WORK'
    },
    description: '',
    status: 'OPEN',
    priority: 'HIGH',
    dueDate: this.getToday()
  };

  constructor(private http: HttpClient) {}

  submitToDoTask(form: NgForm) {
    alert(form.invalid);
    if (form.invalid) {
      form.control.markAllAsTouched(); // <-- mark fields as touched
    alert('Please fix errors before submitting.');
      return;
    }
    console.log('Submit button clicked!');
    console.log('Form data:', this.todoTaskRequest);
    
    const apiUrl = AppConfig.apiBaseUrl + AppConfig.endpoints.todo.create;
    console.log('Calling API:', apiUrl);
    
    /*const headers = new HttpHeaders({
      'X-API-Key': 'test-key-abcde',
      'Content-Type': 'application/json'
    });*/

    // todoTaskRequest already contains form values
    this.http.post(apiUrl, this.todoTaskRequest).subscribe({
      next: (res) => {
        console.log('Todo created', res);
        alert("Task created successfully!")

        form.resetForm(this.todoTaskRequest);

        // reset form model
        this.todoTaskRequest = {
          id: {
            taskName: '',
            category: 'WORK'
          },
          description: '',
          status: 'OPEN',
          priority: 'HIGH',
          dueDate: this.getToday()
        };
      },
      error: err => {
        console.error('Error creating task:', err);
        alert('Error creating task. Check console for details.');
      }
    });
  }

  getToday(): string {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // months start at 0
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }
}
