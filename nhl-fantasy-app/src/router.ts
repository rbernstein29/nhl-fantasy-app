import { createRouter, createWebHistory } from 'vue-router'
import MyTeam from './components/MyTeam.vue'
import Draft from './components/Draft.vue'
import WeeklyPerformance from './components/WeeklyPerformance.vue'
import Leaders from './components/Leaders.vue'
import Games from './components/Games.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: MyTeam },
        { path: '/draft', component: Draft },
        { path: '/performance', component: WeeklyPerformance },
        { path: '/leaders', component: Leaders },
        { path: '/games', component: Games },
    ]
})

export default router
