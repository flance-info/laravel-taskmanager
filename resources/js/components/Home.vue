<template>
    <div class="container">
        <!-- Dashboard Overview -->
        <div class="dashboard-container">
            <div class="row">
                <div class="col-md-12 mb-2 text-center">
                    <h2>Главная Страница</h2>
                </div>
            </div>
            <div class="row">

                <div class="col-md-6 ">
                    <task-charts></task-charts>
                </div>

                <div class="col-md-6 mt-sm-4 mt-md-0 d-flex justify-content-between ">

                    <quick-buttons></quick-buttons>

                </div>
            </div>
            <div class="row mt-4 justify-content-center">
                <div class="col-md-6 mt-sm-4 mt-md-0">
                    <reminders></reminders>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import TaskCharts from "./TaskCharts.vue";
import QuickButtons from './QuickButtons.vue';
import Reminders from "./Reminders.vue";
import TaskCalendar from "./TaskCalendar.vue";

export default {
    components: {QuickButtons, TaskCharts, Reminders, TaskCalendar},
    mounted() {
    }
};
</script>
