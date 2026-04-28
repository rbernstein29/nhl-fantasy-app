<script setup lang="ts">
    import { ref } from 'vue'
    import { user_players } from '@/ts/constants';
    import type { Player } from '@/ts/player';
    import PlayerCard from './PlayerCard.vue';

    const available_players = ref<Player[]>([
        {id: 0, first_name: "Connor", last_name: "McDavid", position: "F", team: "EDM"},
        {id: 1, first_name: "David", last_name: "Pastrnak", position: "F", team: "BOS"},
        {id: 2, first_name: "Jason", last_name: "Robertson", position: "F", team: "DAL"},
        {id: 3, first_name: "Evan", last_name: "Bouchard", position: "D", team: "EDM"},
        {id: 4, first_name: "Adam", last_name: "Fox", position: "D", team: "NYR"},
        {id: 5, first_name: "Scott", last_name: "Wedgewood", position: "G", team: "COL"},
    ])

    const select_player = (player: Player) => {
        const player_index = available_players.value.indexOf(player)
        if (player_index !== -1) {
            available_players.value.splice(player_index, 1)
            user_players.value.push(player)
        }
        console.log(user_players.value)
        console.log(available_players.value)    
    }
</script>

<template>
    <h1>Draft</h1>

    <h2>Your Team</h2>
    <template v-for="player in user_players">
        <PlayerCard :player="player"></PlayerCard>
    </template>

    <h2>Available</h2>
    <div v-for="player in available_players" @click="select_player(player)">
        <PlayerCard :player="player"></PlayerCard>
    </div>

</template>

<style scoped></style>