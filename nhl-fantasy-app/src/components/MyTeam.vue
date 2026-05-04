<script setup lang="ts">
    import { onMounted, ref, computed } from 'vue'
    import type { Player } from '@/ts/types'
    import { get_team, remove_player, get_player_stats } from '@/ts/api'
    import Leaders from './Leaders.vue'
    import Games from './Games.vue'

    const user_players = ref<Player[]>([])

    const populate_user_players = async () => {
        user_players.value = await get_team()
        for (const player of user_players.value) {
            get_player_stats(player)
        }
    }

    const handle_remove_player = async (player: Player) => {
        await remove_player(player)
        await populate_user_players()
    }

    const lw = computed(() => user_players.value.find(p => p.position === 'L') ?? null)
    const center = computed(() => user_players.value.find(p => p.position === 'C') ?? null)
    const rw = computed(() => user_players.value.find(p => p.position === 'R') ?? null)
    const defense = computed(() => user_players.value.filter(p => p.position === 'D'))
    const goalie = computed(() => user_players.value.find(p => p.position === 'G') ?? null)

    const total_points = computed(() => user_players.value.reduce((sum, p) => sum + (p.points ?? 0), 0))

    onMounted(() => populate_user_players())
</script>

<template>
    <div class="home">
        <Leaders />
        <div class="my-team">
            <div class="team-header">
                <h1>My Team</h1>
                <RouterLink to="/performance" class="btn-performance">Season Performance</RouterLink>
            </div>

            <template v-if="user_players.length === 0">
                <div class="empty-state">
                    <h2>You haven't drafted any players yet.</h2>
                    <RouterLink to="/draft" class="btn-draft">Go to Draft</RouterLink>
                </div>
            </template>

            <div v-else class="lineup">
                <div class="lineup-row">
                    <div v-for="slot in [{ label: 'LW', player: lw }, { label: 'C', player: center }, { label: 'RW', player: rw }]" :key="slot.label" class="slot">
                        <div class="slot-label">{{ slot.label }}</div>
                        <template v-if="slot.player">
                            <img v-if="slot.player.headshot" class="slot-headshot" :src="slot.player.headshot">
                            <div class="slot-name">{{ slot.player.first_name }} {{ slot.player.last_name }}</div>
                            <div class="slot-points">{{ slot.player.points ?? 0 }} pts</div>
                            <button class="btn-drop" @click="handle_remove_player(slot.player!)">Drop</button>
                        </template>
                        <template v-else>
                            <div class="slot-empty">No player drafted</div>
                            <RouterLink to="/draft" class="btn-draft">Go to Draft</RouterLink>
                        </template>
                    </div>
                </div>

                <div class="lineup-row defense-row">
                    <div v-for="(player, i) in [defense[0] ?? null, defense[1] ?? null]" :key="i" class="slot">
                        <div class="slot-label">D</div>
                        <template v-if="player">
                            <img v-if="player.headshot" class="slot-headshot" :src="player.headshot">
                            <div class="slot-name">{{ player.first_name }} {{ player.last_name }}</div>
                            <div class="slot-points">{{ player.points ?? 0 }} pts</div>
                            <button class="btn-drop" @click="handle_remove_player(player)">Drop</button>
                        </template>
                        <template v-else>
                            <div class="slot-empty">No player drafted</div>
                            <RouterLink to="/draft" class="btn-draft">Go to Draft</RouterLink>
                        </template>
                    </div>
                </div>

                <div class="lineup-row goalie-row">
                    <div class="slot">
                        <div class="slot-label">G</div>
                        <template v-if="goalie">
                            <img v-if="goalie.headshot" class="slot-headshot" :src="goalie.headshot">
                            <div class="slot-name">{{ goalie.first_name }} {{ goalie.last_name }}</div>
                            <div class="slot-points">{{ goalie.points ?? 0 }} pts</div>
                            <button class="btn-drop" @click="handle_remove_player(goalie)">Drop</button>
                        </template>
                        <template v-else>
                            <div class="slot-empty">No player drafted</div>
                            <RouterLink to="/draft" class="btn-draft">Go to Draft</RouterLink>
                        </template>
                    </div>
                </div>
            </div>

            <div v-if="user_players.length > 0" class="total-points">
                <span>Total Points</span>
                <span>{{ total_points }}</span>
            </div>
        </div>
        <Games />
    </div>
</template>

<style scoped>
    .home {
        display: grid;
        grid-template: "leaders team games" / 250px 1fr 250px
    }

    .my-team {
        max-width: 700px;
        margin: 0 auto;
        padding: 2rem 1.5rem;
    }

    .team-header {
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

    .btn-performance {
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

    .btn-performance:hover {
        background: #0284c7;
    }

    .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        padding: 3rem;
        background: #f8fafc;
        border: 1px dashed #cbd5e1;
        border-radius: 12px;
        text-align: center;
    }

    .empty-state h2 {
        font-size: 1.1rem;
        font-weight: 500;
        color: #64748b;
        margin: 0;
    }

    .lineup {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .lineup-row {
        display: flex;
        justify-content: center;
        gap: 1rem;
    }

    .defense-row {
        gap: 2rem;
    }

    .slot {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.4rem;
        width: 160px;
        padding: 1rem 0.75rem;
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 10px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.07);
        text-align: center;
    }

    .slot-headshot {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        object-fit: cover;
    }

    .slot-label {
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: #94a3b8;
    }

    .slot-name {
        font-size: 0.95rem;
        font-weight: 600;
        color: #0f172a;
        line-height: 1.3;
    }

    .slot-points {
        font-size: 0.9rem;
        font-weight: 700;
        color: #0ea5e9;
    }

    .slot-empty {
        font-size: 0.8rem;
        color: #94a3b8;
        font-style: italic;
    }

    .btn-draft {
        display: inline-block;
        margin-top: 0.25rem;
        padding: 0.4rem 1rem;
        background: #0ea5e9;
        color: #ffffff;
        border: none;
        border-radius: 5px;
        font-size: 0.85rem;
        font-weight: 600;
        cursor: pointer;
        text-decoration: none;
        transition: background 0.15s;
    }

    .btn-draft:hover {
        background: #0284c7;
    }

    .btn-drop {
        margin-top: 0.25rem;
        padding: 0.25rem 0.75rem;
        background: #fee2e2;
        color: #dc2626;
        border: none;
        border-radius: 5px;
        font-size: 0.8rem;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.15s;
    }

    .btn-drop:hover {
        background: #fecaca;
    }

    .total-points {
        display: flex;
        justify-content: space-between;
        padding: 0.75rem 1rem;
        margin-top: 1rem;
        background: #f1f5f9;
        border-radius: 8px;
        font-weight: 700;
        color: #0f172a;
    }
</style>
