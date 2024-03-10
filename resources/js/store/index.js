import { createStore } from 'vuex';
import tasksModule from './modules/tasks';

export const store = createStore({
  modules: {
    tasks: tasksModule,
  }
});
