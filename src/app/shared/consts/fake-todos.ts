import { TodoPriority } from '../enums/todo-priority';
import { Todo } from '../interfaces/todo';

/** List of fake todos for testing. */
export const FakeTodos: Todo[] = [
  {
    title: 'Setup Foo module for testing',
    date: Date.now(),
    priority: TodoPriority.LOW,
    done: false,
    id: 1,
  },
  {
    title: 'Do something random here',
    date: Date.now(),
    priority: TodoPriority.NORMAL,
    done: false,
    id: 2,
  },
  {
    title: 'Remove Bar module from app module',
    date: Date.now(),
    priority: TodoPriority.NORMAL,
    done: true,
    id: 3,
  },
  {
    title: 'Write unit-tests for XYZ app',
    date: Date.now(),
    priority: TodoPriority.HIGH,
    done: false,
    id: 4,
  },
  {
    title: 'Delete ABC module completely',
    date: Date.now(),
    priority: TodoPriority.NORMAL,
    done: false,
    id: 5,
  },
];
