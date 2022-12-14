import { TodoPriority } from '../enums/todo-priority';
import { PriorityOption } from '../interfaces/priority-option';

export const PriorityOptions: PriorityOption[] = [
  { label: 'Low', value: TodoPriority.LOW },
  { label: 'Normal', value: TodoPriority.NORMAL },
  { label: 'High', value: TodoPriority.HIGH },
];
