<template>
    <div class="row">
        <div class="col-12 mb-2  mt-4 text-end">
            <router-link :to='{name:"taskNew"}' class="btn btn-primary"><i class="fa fa-plus me-2"></i>Новая Задача</router-link>
        </div>

        <div class="col-12 mb-2">
            <form>
                <div class="row">

                    <div class="col-md-3 mb-2">
                        <label>Статус:</label>
                        <select @change="updateStatusFilter($event.target.value)" class="form-select" id="status">
                            <option value="">Все</option>
                            <option value="pending">Ожидание</option>
                            <option value="in_progress">В прогрессе</option>
                            <option value="completed">Завершен</option>
                        </select>
                    </div>

                    <date-ranges :selectedDateRange="selectedDateRange" @update:selectedDateRange="updateSelectedDateRange"></date-ranges>
                </div>
            </form>
        </div>

        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h4>Список Задач</h4>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered table-hover">
                            <thead>
                            <tr>
                                <th class="text-center">ID Задачи</th>
                                <th>Название</th>
                                <th>Описание</th>
                                <th>Статус</th>
                                <th>Дата завершения</th>
                            </tr>
                            </thead>
                            <tbody v-if="filteredTasks.length > 0">
                            <tr v-for="(task, key) in filteredTasks" :key="key">
                                <td class="text-center stm-clickable" @click="showTaskDetails(task)">{{ ((currentPage - 1) * 10) + key + 1 }}</td>
                                <td class="stm-clickable" @click="showTaskDetails(task)">{{ task.title }}</td>
                                <td class="stm-clickable" @click="showTaskDetails(task)">{{ task.description }}</td>
                                <td>{{ getTaskStatusTranslation(task.status) }}</td>
                                <td>{{ task.due_date }}</td>
                                <td class="text-center">
                                    <router-link :to='{name:"editTasks",params:{id:task.id}}' class="btn btn-success me-2"><i class="fa fa-pencil"></i></router-link>
                                    <button type="button" @click="deleteTask(task.id)" class="btn btn-danger"><i class="fa fa-trash"></i></button>
                                </td>
                            </tr>
                            </tbody>
                            <tbody v-else>
                            <tr>
                                <td colspan="5" align="center">Задачи не найдены.</td>
                            </tr>
                            </tbody>
                        </table>

                        <div class="col-12 mt-3">
                            <nav aria-label="Page navigation">
                                <ul class="pagination justify-content-center">
                                    <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
                                        <button class="page-link" @click="updatePage(currentPage - 1)" aria-label="Previous">
                                            <span aria-hidden="true">&laquo;</span>
                                        </button>
                                    </li>
                                    <li class="page-item" v-for="page in totalPages" :key="page" :class="{ 'active': currentPage === page }">
                                        <button class="page-link" @click="updatePage(page)">{{ page }}</button>
                                    </li>
                                    <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
                                        <button class="page-link" @click="updatePage(currentPage + 1)" aria-label="Next">
                                            <span aria-hidden="true">&raquo;</span>
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <task-details v-if="selectedTask" :task="selectedTask" @clear-task="clearSelectedTask" @delete-task="deleteSelectedTask"></task-details>

</template>

<script>
import DateRanges from './DateRanges.vue';
import TaskDetails from './TaskDetails.vue';
import { mapActions, mapGetters, mapMutations} from 'vuex';

export default {
    name: "tasks",
    data() {
        return {
            selectedTask: null,
        }
    },
    components: {DateRanges, TaskDetails},
    mounted() {
        this.fetchTasks();
    },

    methods: {
        ...mapActions('tasks', ['fetchTasks', 'deleteTask', 'setStatusFilter']),
        ...mapMutations('tasks', ['updateSelectedDateRange']),
        updateStatusFilter(status) {
            this.fetchTasks({page: 1, status: status, selectedDateRange: this.selectedDateRange});
        },
        updatePage(page) {
            this.fetchTasks({page: page, status: this.statusFilter, selectedDateRange: this.selectedDateRange});
        },
        updateSelectedDateRange(selectedDateRange) {
            this.fetchTasks({page: 1, status: this.statusFilter, selectedDateRange: selectedDateRange});
        },

        // Function to clear selected task when modal is closed
        clearSelectedTask() {
            this.selectedTask = null;
        },
        deleteSelectedTask() {
            this.deleteTask(this.selectedTask.id);
        },
        // Function to open the modal and display task details
        showTaskDetails(task) {
            this.selectedTask = task;
        },
    },
    computed: {
        ...mapGetters('tasks', [
            'filteredTasks',
            'getTaskStatusTranslation',
            'tasks',
            'statusTranslations',
            'statusFilter',
            'dueDateFilter',
            'currentPage',
            'totalPages',
            'selectedDateRange'
        ]),
    },
    watch: {}
}
</script>



