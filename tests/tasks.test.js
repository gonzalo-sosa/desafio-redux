import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import {
  addTask,
  removeTask,
  updateTask,
  removeAllTasks,
  getTasks,
  getTasksByBoardId,
  removeAllTasksFromBoard,
} from '@/store/tasks';
import configureStore from '@/store/configureStore';

describe('TaskSlice', () => {
  let store;

  beforeEach(() => {
    store = configureStore();
  });

  afterEach(() => {
    store.dispatch(removeAllTasks());
  });

  it('should add a task to the list', () => {
    const task = { title: 'a' };
    const savedTask = { ...task, id: 1 };

    store.dispatch(addTask(task));

    expect(getTasks(store.getState())).toHaveLength(1);
    expect(getTasks(store.getState())).toContainEqual(savedTask);
  });

  it('should remove a task from the list', () => {
    const task = { title: 'a', id: 1 };

    store.dispatch(addTask(task));
    store.dispatch(removeTask({ id: 1 }));

    expect(getTasks(store.getState())).toHaveLength(0);
  });

  it('should update a task', () => {
    const task = { title: 'a', id: 1 };
    const updatedTask = { title: 'b', id: 1 };

    store.dispatch(addTask(task));
    store.dispatch(updateTask(updatedTask));

    expect(getTasks(store.getState())).toHaveLength(1);
    expect(getTasks(store.getState())).toContainEqual(updatedTask);
  });

  it('should remove all task by board id', () => {
    const task1 = { title: 'a', id: 1, boardId: 1 };
    const task2 = { title: 'a', id: 2, boardId: 1 };
    const task3 = { title: 'a', id: 3, boardId: 2 };

    store.dispatch(addTask(task1));
    store.dispatch(addTask(task2));
    store.dispatch(addTask(task3));

    store.dispatch(removeAllTasksFromBoard({ boardId: 1 }));

    expect(getTasks(store.getState())).toHaveLength(1);
    expect(getTasks(store.getState())).toContainEqual(task3);
  });

  it('should remove all tasks', () => {
    const task1 = { title: 'a', id: 1 };
    const task2 = { title: 'a', id: 2 };

    store.dispatch(addTask(task1));
    store.dispatch(addTask(task2));

    store.dispatch(removeAllTasks());

    expect(getTasks(store.getState())).toHaveLength(0);
  });

  describe('selectors', () => {
    it('should get all tasks', () => {
      const task1 = { title: 'a', id: 1 };
      const task2 = { title: 'a', id: 2 };

      store.dispatch(addTask(task1));
      store.dispatch(addTask(task2));

      expect(getTasks(store.getState())).toHaveLength(2);
    });

    it('should filter tasks by board id', () => {
      const task1 = { title: 'a', id: 1, boardId: 1 };
      const task2 = { title: 'a', id: 2, boardId: 2 };

      store.dispatch(addTask(task1));
      store.dispatch(addTask(task2));

      expect(getTasksByBoardId(store.getState(), 1)).toHaveLength(1);
      expect(getTasksByBoardId(store.getState(), 2)).toHaveLength(1);
    });
  });
});
