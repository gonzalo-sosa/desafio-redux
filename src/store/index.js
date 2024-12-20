import { addBoard, removeBoard } from './boards.js';
import configureStore from './configureStore.js';
import { addTask, removeTask } from './tasks.js';

const store = configureStore();

store.dispatch(addBoard({ name: 'Board 1' }));
store.dispatch(removeBoard({ id: 1 }));

store.dispatch(addTask({ name: 'Task 1' }));
store.dispatch(removeTask({ id: 1 }));

console.log(JSON.stringify(store.getState()));
