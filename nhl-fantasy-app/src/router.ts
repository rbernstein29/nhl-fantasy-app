import { createRouter, createWebHistory } from 'vue-router'
import MyTeam from './components/MyTeam.vue'
import Draft from './components/Draft.vue'
import WeeklyPerformance from './components/WeeklyPerformance.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: MyTeam },
        { path: '/draft', component: Draft },
        { path: '/performance', component: WeeklyPerformance },
    ]
})

export default router
