<script setup lang="ts">
    import { ref, computed, onMounted } from 'vue'
    import { fetch_players, get_team, select_forward, select_defense, select_goalie, remove_player } from '@/ts/api'
    import type { Player } from '@/ts/types';
    import PlayerCard from './PlayerCard.vue';

    const all_players = ref<Player[]>([])
    const user_players = ref<Player[]>([])

    const available_centers = computed(() => all_players.value.filter(p => p.position === 'C' && !user_players.value.some(up => up.id === p.id)))
    const available_rightw = computed(() => all_players.value.filter(p => p.position === 'R' && !user_players.value.some(up => up.id === p.id)))
    const available_leftw = computed(() => all_players.value.filter(p => p.position === 'L' && !user_players.value.some(up => up.id === p.id)))
    const available_defense = computed(() => all_players.value.filter(p => p.position === 'D' && !user_players.value.some(up => up.id === p.id)))
    const available_goalies = computed(() => all_players.value.filter(p => p.position === 'G' && !user_players.value.some(up => up.id === p.id)))

    const populate_available_players = async () => {
        all_players.value = await fetch_players()
    }

    const populate_user_players = async () => {
        user_players.value = await get_team()
    }

    const handle_select_forward = async (player: Player) => {
        await select_forward(player)
        await populate_user_players()
    }

    const handle_select_defense = async (player: Player) => {
        await select_defense(player)
        await populate_user_players()
    }

    const handle_select_goalie = async (player: Player) => {
        await select_goalie(player)
        await populate_user_players()
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

    onMounted(() => Promise.all([populate_available_players(), populate_user_players()]))
</script>

<template>
    <div class="draft">
        <div class="draft-header">
            <h1>Draft</h1>
            <RouterLink to="/" class="btn-end-draft">End Draft</RouterLink>
        </div>
        <div class="draft-layout">

            <div class="your-team">
                <h2>Your Team</h2>
                <div class="lineup">
                    <div class="lineup-row">
                        <div v-for="slot in [{ label: 'LW', player: lw }, { label: 'C', player: center }, { label: 'RW', player: rw }]" :key="slot.label" class="slot">
                            <div class="slot-label">{{ slot.label }}</div>
                            <template v-if="slot.player">
                                <div class="slot-name">{{ slot.player.first_name }} {{ slot.player.last_name }}</div>
                                <div class="slot-points">{{ slot.player.points ?? 0 }} pts</div>
                                <button class="btn-drop" @click="handle_remove_player(slot.player!)">Drop</button>
                            </template>
                            <div v-else class="slot-empty">Empty</div>
                        </div>
                    </div>

                    <div class="lineup-row defense-row">
                        <div v-for="(player, i) in [defense[0] ?? null, defense[1] ?? null]" :key="i" class="slot">
                            <div class="slot-label">D</div>
                            <template v-if="player">
                                <div class="slot-name">{{ player.first_name }} {{ player.last_name }}</div>
                                <div class="slot-points">{{ player.points ?? 0 }} pts</div>
                                <button class="btn-drop" @click="handle_remove_player(player)">Drop</button>
                            </template>
                            <div v-else class="slot-empty">Empty</div>
                        </div>
                    </div>

                    <div class="lineup-row goalie-row">
                        <div class="slot">
                            <div class="slot-label">G</div>
                            <template v-if="goalie">
                                <div class="slot-name">{{ goalie.first_name }} {{ goalie.last_name }}</div>
                                <div class="slot-points">{{ goalie.points ?? 0 }} pts</div>
                                <button class="btn-drop" @click="handle_remove_player(goalie)">Drop</button>
                            </template>
                            <div v-else class="slot-empty">Empty</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="available">
                <h2>Available</h2>

                <h3>Centers</h3>
                <div class="player-list">
                    <div v-for="player in available_centers" :key="player.id">
                        <PlayerCard :player="player">
                                <button class="btn-add" @click="handle_select_forward(player)">Add</button>
                            </PlayerCard>
                    </div>
                </div>

                <h3>Right Wing</h3>
                <div class="player-list">
                    <div v-for="player in available_rightw" :key="player.id">
                        <PlayerCard :player="player">
                                <button class="btn-add" @click="handle_select_forward(player)">Add</button>
                            </PlayerCard>
                    </div>
                </div>

                <h3>Left Wing</h3>
                <div class="player-list">
                    <div v-for="player in available_leftw" :key="player.id">
                        <PlayerCard :player="player">
                                <button class="btn-add" @click="handle_select_forward(player)">Add</button>
                            </PlayerCard>
                    </div>
                </div>

                <h3>Defensemen</h3>
                <div class="player-list">
                    <div v-for="player in available_defense" :key="player.id">
                        <PlayerCard :player="player">
                                <button class="btn-add" @click="handle_select_defense(player)">Add</button>
                            </PlayerCard>
                    </div>
                </div>

                <h3>Goalies</h3>
                <div class="player-list">
                    <div v-for="player in available_goalies" :key="player.id">
                        <PlayerCard :player="player">
                                <button class="btn-add" @click="handle_select_goalie(player)">Add</button>
                            </PlayerCard>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>
    .draft {
        padding: 2rem 1.5rem;
    }

    .draft-header {
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

    .btn-end-draft {
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

    .btn-end-draft:hover {
        background: #0284c7;
    }

    .draft-layout {
        display: grid;
        grid-template-columns: 480px 1fr;
        gap: 2rem;
        align-items: start;
    }

    .your-team {
        position: sticky;
        top: 1rem;
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        padding: 1.25rem;
    }

    h2 {
        font-size: 1.1rem;
        font-weight: 700;
        color: #0f172a;
        margin: 0 0 1rem;
    }

    .lineup {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    .lineup-row {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
    }

    .defense-row {
        gap: 1.25rem;
    }

    .slot {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.3rem;
        flex: 1;
        max-width: 130px;
        padding: 0.75rem 0.5rem;
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 10px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.07);
        text-align: center;
    }

    .slot-label {
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: #94a3b8;
    }

    .slot-name {
        font-size: 0.8rem;
        font-weight: 600;
        color: #0f172a;
        line-height: 1.3;
    }

    .slot-points {
        font-size: 0.8rem;
        font-weight: 700;
        color: #0ea5e9;
    }

    .slot-empty {
        font-size: 0.75rem;
        color: #cbd5e1;
        font-style: italic;
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

    .player-list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .available h3 {
        font-size: 0.9rem;
        font-weight: 600;
        color: #64748b;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin: 1.5rem 0 0.5rem;
    }

    .available h3:first-of-type {
        margin-top: 0;
    }

    .available .player-list > div {
        cursor: pointer;
    }
</style>