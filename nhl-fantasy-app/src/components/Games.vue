<script setup lang="ts">
    import { get_games } from '@/ts/api';
    import { ref, onMounted } from 'vue';
    import type { Game } from '@/ts/types';

    const games = ref<Game[]>([])

    onMounted(async () => games.value = await get_games())
</script>

<template>
    <div class="games">
        <h1>Today's Games</h1>
        <div class="game-list">
            <div v-for="game in games" :key="game.id" class="game-card">
                <div class="team">
                    <img :src="game.away_logo" class="logo">
                    <span class="team-name">{{ game.away_team }}</span>
                    <span class="team-score" v-if="game.away_score !== undefined">{{ game.away_score }}</span>
                </div>
                <span class="vs">vs</span>
                <div class="team">
                    <img :src="game.home_logo" class="logo">
                    <span class="team-name">{{ game.home_team }}</span>
                    <span class="team-score" v-if="game.home_score !== undefined">{{ game.home_score }}</span>
                </div>
            </div>
            <div v-if="games.length === 0" class="empty">No games today</div>
        </div>
    </div>
</template>

<style scoped>
    .games {
        padding: 2rem 1.5rem;
    }

    h1 {
        font-size: 1.75rem;
        font-weight: 700;
        color: #0f172a;
        margin: 0 0 1.5rem;
    }

    .game-list {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
    }

    .game-card {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: 0.4rem;
        padding: 0.75rem 1rem;
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.07);
    }

    .team {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.25rem;
        flex: 1;
    }

    .logo {
        width: 28px;
        height: 28px;
        object-fit: contain;
    }

    .team-name {
        font-size: 0.85rem;
        font-weight: 600;
        color: #0f172a;
    }

    .vs {
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: #94a3b8;
    }

    .team-score {
        font-size: 1rem;
        font-weight: 700;
        color: #0f172a;
    }

    .empty {
        font-size: 0.85rem;
        color: #94a3b8;
        font-style: italic;
        text-align: center;
        padding: 1rem;
    }
</style>