<template>
    <div class="row">
        <div class="col-lg-8 col-sm-12 mx-auto">
            <div class="card">
                <div class="card-header">
                    <h4>Редактирование Задание</h4>
                </div>
                <div class="card-body">
                    <form @submit.prevent="update">
                        <div class="row">
                            <div class="col-12 mb-2">
                                <div class="form-group">
                                    <label>Название <span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" v-model="task.title" :class="{ 'is-invalid': formSubmitted && !task.title }" >
                                    <div class="invalid-feedback">Пожалуйста, введите название.</div>
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="form-group">
                                    <label>Описание</label>
                                    <textarea class="form-control" v-model="task.description"></textarea>
                                </div>
                            </div>

                            <div class="col-12 mb-2">
                                <div class="form-group">
                                    <label>Статус <span class="text-danger">*</span></label>
                                    <select class="form-control" v-model="task.status" :class="{ 'is-invalid': formSubmitted && !task.status }" >
                                        <option value="" disabled selected>Выберите статус</option>
                                        <option value="pending">Ожидание</option>
                                        <option value="in_progress">В прогрессе</option>
                                        <option value="completed">Завершен</option>
                                    </select>
                                    <div class="invalid-feedback">Пожалуйста, выберите статус.</div>
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="form-group">
                                    <label>Дата завершения <span class="text-danger">*</span></label>
                                    <input type="date" class="form-control" v-model="task.due_date" :class="{ 'is-invalid': formSubmitted && !task.due_date }">
                                     <div class="invalid-feedback">Пожалуйста, выберите Дата завершения.</div>
                                </div>
                            </div>
                            <div class="col-12 d-flex justify-content-between">
                                <button type="button" class="btn btn-secondary me-auto" @click="$router.go(-1)">Назад</button>
                                <button type="submit" class="btn btn-primary">Редактирование</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "update-task",
    data() {
        return {
            task: {
                title: "",
                description: "",
                status: "",
                due_date: "",
                _method: "put"
            },
            formSubmitted: false
        }
    },
    mounted() {
        this.showTask()
    },
    methods: {
        async showTask() {
            await this.axios.get(`/api/task/${this.$route.params.id}`).then(response => {
                const {title, description, status, due_date} = response.data.data;
                this.task.title = title;
                this.task.description = description;
                this.task.status = status;
                this.task.due_date = due_date;
            }).catch(error => {
                console.log(error)
            })
        },
        async update() {
            if (!this.task.title || !this.task.status || !this.task.due_date ) {
                this.formSubmitted = true;
                return;
            }
            await this.axios.put(`/api/task/${this.$route.params.id}`, this.task).then(response => {
                this.$router.push({name: "tasks"})
            }).catch(error => {
                console.log(error)
            })
        }
    }
}
</script>
