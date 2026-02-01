import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoTasks } from './to-do-tasks.component';

describe('ToDoTasks', () => {
  let component: ToDoTasks;
  let fixture: ComponentFixture<ToDoTasks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToDoTasks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToDoTasks);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
