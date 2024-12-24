import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import {
  addTask,
  removeTask,
  updateTask,
  removeAllTasks,
  getTasks,
  getTasksByBoardId,
} from '../src/store/tasks';
import configureStore from '../src/store/configureStore';

describe('TaskSlice', () => {
  let store;

  beforeEach(() => {
    store = configureStore();
  });

  afterEach(() => {
    store.dispatch(removeAllTasks());
  });

  it('should remove a task from the list', () => {
    const task = { title: 'a', id: 1 };

    store.dispatch(addTask(task));
    store.dispatch(removeTask({ id: 1 }));

    expect(getTasks(store.getState())).toHaveLength(0);
  });

  it('should add a task to the list', () => {
    const task = { title: 'a' };
    const savedTask = { ...task, id: 1 };

    store.dispatch(addTask(task));

    expect(getTasks(store.getState())).toHaveLength(1);
    expect(getTasks(store.getState())).toContainEqual(savedTask);
  });

  it('should update a task', () => {
    const task = { title: 'a', id: 1 };
    const updatedTask = { title: 'b', id: 1 };

    store.dispatch(addTask(task));
    store.dispatch(updateTask(updatedTask));

    expect(getTasks(store.getState())).toHaveLength(1);
    expect(getTasks(store.getState())).toContainEqual(updatedTask);
  });

  describe('selectors', () => {
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
