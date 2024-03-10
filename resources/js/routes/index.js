import {createRouter, createWebHistory} from 'vue-router'
import Home from '../components/Home.vue'
import Tasks from '../components/Tasks.vue'
import TaskForm from '../components/TaskForm.vue'
import CreateTaskForm from '../components/CreateTaskForm.vue'

export const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/tasks',
        name: 'tasks',
        component: Tasks
    },
    {
        path: '/tasks/new',
        name: 'taskNew',
        component: CreateTaskForm
    },
    {
        path: '/tasks/:id/edit',
        name: 'editTasks',
        component: TaskForm
    }
]
