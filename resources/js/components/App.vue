<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <router-link to="/" class="navbar-brand" href="#"> Laravel 9 Vue 3 - Приложение таск-менеджера - Ахмедов Рустамжон</router-link>
            <div class="collapse navbar-collapse">
                <div class="navbar-nav">
                    <router-link exact-active-class="active" to="/" class="nav-item nav-link">Главная</router-link>
                    <router-link exact-active-class="active" to="/tasks" class="nav-item nav-link">Задачи</router-link>
                </div>
            </div>
        </div>
    </nav>
    <main  class="d-flex flex-column min-vh-100 justify-content-center">

        <div class="container">
            <router-view></router-view>
        </div>

    </main>
    <!-- Footer -->
    <footer class="footer  mt-5 py-4 bg-dark">
        <div class="container">
            <span class="text-muted">© 2024 Laravel 9 Vue 3 Task Manager - Ахмедов Рустамжон</span>
        </div>
    </footer>
</template>

<script>
export default {}
</script>
