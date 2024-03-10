import axios from 'axios';

export default {
    namespaced: true,
    state: {
        tasks: [],
        allTasks: [],
        statusTranslations: {
            pending: 'Ожидание',
            in_progress: 'В прогрессе',
            completed: 'Завершен'
        },
        statusFilter: "",
        dueDateFilter: "",
        currentPage: 1,
        totalPages: 1,
        selectedDateRange: null
    },
    mutations: {
        setTasks(state, tasks) {
            state.tasks = tasks;
        },
        setAllTasks(state, tasks) {
            state.allTasks = tasks;
        },
        setCurrentPage(state, page) {
            state.currentPage = page;
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages;
        },
        updateSelectedDateRange(state, value) {
            state.selectedDateRange = value;
        },
        setStatusFilter(state, value) {
            state.statusFilter = value;
        }
    },
    actions: {
        async fetchTasks({commit, state}, values = {page: 1, status: "", selectedDateRange: null}) {
            const {page, status, selectedDateRange} = values;

            try {
                const params = {};
                if (status !== "") params.status = status;
                params.due_date = selectedDateRange;
                params.page = page;
                const response = await axios.get('/api/tasks', {params});
                commit('setTasks', response.data.data);
                commit('setAllTasks', response.data.data);
                commit('setCurrentPage', response.data.current_page);
                commit('setTotalPages', response.data.last_page);
                commit('setStatusFilter', status);
                commit('updateSelectedDateRange', selectedDateRange);
            } catch (error) {
                console.error(error);
                commit('setTasks', []);
                commit('setAllTasks', []);
            }
        },
        async deleteTask({commit, dispatch}, id) {
            if (confirm("Вы уверены, что хотите удалить эту задачу?")) {
                try {
                    await axios.delete(`/api/task/${id}`);
                    dispatch('fetchTasks');
                } catch (error) {
                    console.error(error);
                }
            }
        },
        async setStatusFilter({commit, dispatch}, status) {
            dispatch('fetchTasks', status);
        },
        async applyFilter({dispatch, state}) {
            try {
                // Fetch tasks with the current page after applying the filter
                dispatch('fetchTasks', state.currentPage);
            } catch (error) {
                console.error(error);
            }
        },
    },
    getters: {
        tasks: state => state.tasks,
        allTasks: state => {
            let allTasks = state.allTasks
            // Define the number of days ahead to consider for due tasks
            const daysAhead = 7;

            // Calculate the due date range
            const currentDate = new Date();
            const dueDateRange = new Date();
            dueDateRange.setDate(currentDate.getDate() + daysAhead);
            const dueDateRangeString = dueDateRange.toISOString().split('T')[0];

            return allTasks.filter(task => task.due_date <= dueDateRangeString);
        },
        statusTranslations: state => state.statusTranslations,
        statusFilter: state => state.statusFilter,
        dueDateFilter: state => state.dueDateFilter,
        currentPage: state => state.currentPage,
        totalPages: state => state.totalPages,
        selectedDateRange: state => state.selectedDateRange,
        filteredTasks: state => {
            let filteredTasks = state.tasks;
            if (state.statusFilter) {
                filteredTasks = filteredTasks.filter(task => task.status === state.statusFilter);
            }
            if (state.dueDateFilter) {
                filteredTasks = filteredTasks.filter(task => task.due_date === state.dueDateFilter);
            }
            return filteredTasks;
        },
        getTaskStatusTranslation: state => status => {
            return state.statusTranslations[status] || status;
        },
    }
};
