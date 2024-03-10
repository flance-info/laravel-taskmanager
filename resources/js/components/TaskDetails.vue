<template>

    <div class="modal1 " v-if="task" v-on:click.self="closeTaskDetails">
        <div class="modal-content1 col-md-8 rounded-3" ref="modalContent">
            <span class="close" @click="closeTaskDetails">&times;</span>


            <div class="task-details row">
                <div v-if="task" class="col-md-12">
                    <div class="d-flex flex-row">
                        <div class="col-md-3 border border-gray lh-lg px-2"><label class="fw-bold">ID:</label> </div>
                        <div class="col-md-9 border border-gray lh-lg px-2">{{ task.id }}</div>
                    </div>
                    <div class="d-flex flex-row">
                        <div class="col-md-3 border border-gray lh-lg px-2"><label class="fw-bold">Название:</label> </div>
                        <div class="col-md-9 border border-gray lh-lg px-2">{{ task.title }}</div>
                    </div>
                    <div class="d-flex flex-rown">
                        <div class="col-md-3 border border-gray lh-lg px-2"><label class="fw-bold">Описание:</label> </div>
                        <div class="col-md-9 border border-gray lh-lg px-2">{{ task.description }}</div>
                    </div>

                    <div class="d-flex flex-row">
                        <div class="col-md-3 border border-gray lh-lg px-2"><label class="fw-bold">Статус:</label> </div>
                        <div class="col-md-9 border border-gray lh-lg px-2">{{ statusTranslations[task.status] }}</div>
                    </div>
                    <div class="d-flex flex-row">
                        <div class="col-md-3 border border-gray lh-lg px-2"><label class="fw-bold">Дата завершения:</label> </div>
                        <div class="col-md-9 border border-gray lh-lg px-2">{{ task.due_date }}</div>
                    </div>
                </div>
            </div>
             <!-- Edit and Delete buttons -->
        <div class="d-flex flex-row justify-content-end  mt-3 mx-4">
            <router-link :to="{ name: 'editTasks', params: { id: task.id } }" class="btn btn-success me-2"><i class="fa fa-pencil"></i> </router-link>
            <button class="btn btn-danger" @click="deleteTask(task.id)"><i class="fa fa-trash"></i> </button>
        </div>

        </div>
    </div>
</template>

<script>
export default {
    props: {
        task: Object
    },
    data() {
        return {
            statusTranslations: {
                pending: 'Ожидание',
                in_progress: 'В прогрессе',
                completed: 'Завершен'
            }
        };
    },
    methods: {
        closeTaskDetails() {
            this.$emit('clear-task');
        },
        deleteTask(id) {
            this.$emit('delete-task');
        }
    }
};
</script>
