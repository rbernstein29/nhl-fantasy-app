<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import { fetch_players, get_team, select_player } from '@/ts/api'
    import type { Player } from '@/ts/types';
    import PlayerCard from './PlayerCard.vue';

    const available_players = ref<Player[]>([])
    const user_players = ref<Player[]>([])

    const populate_available_players = async () => {
        const players = await fetch_players()
        for (const player of players) {
            available_players.value.push(player)
        }
    }

    const populate_user_players = async () => {
        user_players.value = await get_team()
    }

    const handle_select_player = async (player: Player) => {
        await select_player(player)
        await populate_user_players()
    }

    onMounted(() => Promise.all([populate_available_players(), populate_user_players()]))
</script>

<template>
    <h1>Draft</h1>

    <h2>Your Team</h2>
    <template v-for="player in user_players" :key="player.id">
        <PlayerCard :player="player" />
    </template>

    <h2>Available</h2>
    <div v-for="player in available_players" :key="player.id" @click="handle_select_player(player)">
        <PlayerCard :player="player" />
    </div>

</template>

<style scoped></style>