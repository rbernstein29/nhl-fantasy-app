<script setup lang="ts">
    import { onMounted, ref, computed } from 'vue'
    import type { Player } from '@/ts/types'
    import { get_team, get_player_stats } from '@/ts/api'
    import PlayerCard from './PlayerCard.vue'

    const user_players = ref<Player[]>([])
    const selected_week = ref<number | null>(null)

    const total_points = computed(() => user_players.value.reduce((sum, p) => sum + (p.points ?? 0), 0))

    const toggle_week = (week: number) => {
        selected_week.value = selected_week.value === week ? null : week
    }

    onMounted(async () => {
        user_players.value = await get_team()
        for (const player of user_players.value) {
            await get_player_stats(player)
        }
    })
</script>

<template>
    <div class="performance">
        <div class="performance-header">
            <h1>Season Performance</h1>
            <RouterLink to="/" class="btn-back">My Team</RouterLink>
        </div>

        <div class="week-list">
            <div class="week-entry">
                <curr-week @click="toggle_week(1)">
                    <curr-week-number>Current Week</curr-week-number>
                    <curr-week-points>{{ total_points }} pts</curr-week-points>
                    <curr-week-trend>—</curr-week-trend>
                </curr-week>
                <div v-if="selected_week === 1" class="player-list">
                    <PlayerCard v-for="player in user_players" :key="player.id" :player="player" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .performance {
        max-width: 700px;
        margin: 0 auto;
        padding: 2rem 1.5rem;
    }

    .performance-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1.5rem;
    }

    h1 {
        font-size: 1.75rem;
        font-weight: 700;
        color: #0f172a;
        margin: 0;
    }

    .btn-back {
        display: inline-block;
        padding: 0.4rem 1rem;
        background: #0ea5e9;
        color: #ffffff;
        border-radius: 5px;
        font-size: 0.85rem;
        font-weight: 600;
        text-decoration: none;
        transition: background 0.15s;
    }

    .btn-back:hover {
        background: #0284c7;
    }

    .week-list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .week-entry {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    curr-week {
        display: grid;
        grid-template-columns: 1fr auto auto;
        align-items: center;
        gap: 1rem;
        padding: 0.75rem 1rem;
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.07);
        cursor: pointer;
        transition: box-shadow 0.15s;
    }

    curr-week:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    curr-week-number {
        font-size: 0.95rem;
        font-weight: 600;
        color: #0f172a;
    }

    curr-week-points {
        font-size: 0.95rem;
        font-weight: 700;
        color: #0ea5e9;
    }

    curr-week-trend {
        font-size: 0.9rem;
        font-weight: 700;
        color: #94a3b8;
        min-width: 1.5ch;
        text-align: center;
    }

    .player-list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding-left: 0.75rem;
        border-left: 2px solid #e2e8f0;
    }
</style>
