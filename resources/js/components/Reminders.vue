<template>
    <div class="card">
        <div class="card-body">
            <div class="text-center mt-2"><h5>Статус Задач</h5></div>
            <ul class="list-group mt-3">
                <li class="list-group-item">
                    <div class="d-flex justify-content-between align-items-center">
                        <span><strong>Задача</strong></span>
                        <span class="text-muted">Срок выполнения:</span>
                    </div>
                </li>
                <li class="list-group-item" v-for="(task, index) in allTasks" :key="index">
                    <div class="d-flex justify-content-between align-items-center">
                        <span><strong>{{ task.title }}</strong></span>
                        <span class="text-muted">{{ formatDate(task.due_date) }}</span>
                    </div>

                </li>
                <li v-if="allTasks.length === 0" class="list-group-item">Нет задач на сегодня</li>
            </ul>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    name: 'TaskReminders',
    methods: {
        formatDate(dateString) {
            const options = {year: 'numeric', month: 'long', day: 'numeric'};
            const date = new Date(dateString);
            return date.toLocaleDateString('ru', options);
        }
    },
    computed: {
        // Map the 'filteredTasks' getter from Vuex
        ...mapGetters('tasks', ['allTasks']),
    },
};
</script>
