<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { get_current_leaders } from '@/ts/api';
    import type { Player } from '@/ts/types';

    const goal_leaders = ref<Player[]>([])
    const assist_leaders = ref<Player[]>([])
    const point_leaders = ref<Player[]>([])


    onMounted(async () => {
        const data = await get_current_leaders()
        goal_leaders.value = data.goals
        assist_leaders.value = data.assists
        point_leaders.value = data.points
    })
</script>

<template>
    <div class="leaders">
        <h1>Current Leaders</h1>

        <div class="section">
            <h2>Goals</h2>
            <div class="player-list">
                <div v-for="(player, i) in goal_leaders" :key="player.id" class="player-row">
                    <span class="rank">{{ i + 1 }}</span>
                    <span class="name">{{ player.first_name }} {{ player.last_name }}</span>
                    <img :src="player.team_logo">
                    <span class="stat">{{ player.goals ?? 0 }} G</span>
                </div>
            </div>
        </div>

        <div class="section">
            <h2>Assists</h2>
            <div class="player-list">
                <div v-for="(player, i) in assist_leaders" :key="player.id" class="player-row">
                    <span class="rank">{{ i + 1 }}</span>
                    <span class="name">{{ player.first_name }} {{ player.last_name }}</span>
                    <img :src="player.team_logo">
                    <span class="stat">{{ player.assists ?? 0 }} A</span>
                </div>
            </div>
        </div>

        <div class="section">
            <h2>Points</h2>
            <div class="player-list">
                <div v-for="(player, i) in point_leaders" :key="player.id" class="player-row">
                    <span class="rank">{{ i + 1 }}</span>
                    <span class="name">{{ player.first_name }} {{ player.last_name }}</span>
                    <img :src="player.team_logo">
                    <span class="stat">{{ player.points ?? 0 }} PTS</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .leaders {
        max-width: 700px;
        margin: 0 auto;
        padding: 2rem 1.5rem;
    }

    h1 {
        font-size: 1.75rem;
        font-weight: 700;
        color: #0f172a;
        margin: 0 0 1.5rem;
    }

    .section {
        margin-bottom: 1.75rem;
    }

    h2 {
        font-size: 1rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.07em;
        color: #64748b;
        margin: 0 0 0.5rem;
    }

    .player-list {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
    }

    .player-row {
        display: grid;
        grid-template-columns: 1.5rem 1fr auto auto;
        align-items: center;
        gap: 0.75rem;
        padding: 0.65rem 1rem;
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.07);
    }

    .rank {
        font-size: 0.8rem;
        font-weight: 700;
        color: #94a3b8;
        text-align: center;
    }

    .name {
        font-size: 0.95rem;
        font-weight: 600;
        color: #0f172a;
    }

    .team {
        font-size: 0.8rem;
        font-weight: 500;
        color: #64748b;
    }

    img {
        width: 28px;
        height: 28px;
        object-fit: contain;
    }

    .stat {
        font-size: 0.95rem;
        font-weight: 700;
        color: #0ea5e9;
        min-width: 4rem;
        text-align: right;
    }
</style>
