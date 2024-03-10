<template>
    <div className="card">
        <div className="text-center mt-2"><h5>Статус Задач</h5></div>
        <div className="card-body d-flex justify-content-center">
            <canvas id="taskChart" style="max-height: 300px;max-width: 500px"></canvas>
        </div>
    </div>
</template>

<script>
import Chart from 'chart.js/auto';
import {mapActions, mapGetters} from 'vuex'; // Import mapActions and mapGetters from vuex

export default {
    name: 'TaskCharts',
    components: {Chart},
    data() {
        return {
            taskChart: null,
            taskCount: [0, 0, 0],
        };
    },
    mounted() {
        this.getTasks();
    },
    methods: {
        ...mapActions('tasks', ['fetchTasks']),
        async getTasks() {
            try {
                // Fetch tasks using Vuex action
                await this.fetchTasks({});

                // Extract task count from Vuex state
                this.taskCount[0] = this.filteredTasks.filter(task => task.status === 'pending').length;
                this.taskCount[1] = this.filteredTasks.filter(task => task.status === 'in_progress').length;
                this.taskCount[2] = this.filteredTasks.filter(task => task.status === 'completed').length;

                this.renderChart();
            } catch (error) {
                console.error(error);
            }
        },
        renderChart() {
            const taskData = {
                labels: ['Ожидание', 'В прогрессе', 'Завершен'],
                datasets: [{
                    label: 'Статус задач',
                    data: this.taskCount, // Initial data
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(75, 192, 192, 0.5)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(75, 192, 192, 1)'
                    ],
                    borderWidth: 1
                }]
            };

            const ctx = document.getElementById('taskChart').getContext('2d');

            this.taskChart = new Chart(ctx, {
                type: 'bar',
                data: taskData,
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    },
    computed: {
        ...mapGetters('tasks', [
            'filteredTasks'
        ]),
    }
};
</script>
