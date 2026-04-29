<script setup lang="ts">
    import { ref } from 'vue'
    import type { Game } from '@/ts/types'

    const games = ref<Game[]>([])

    games.value.push({id: 0, team1: "NYR", team2: "TBL", choice: ""})
    games.value.push({id: 1, team1: "BUF", team2: "DAL", choice: ""})
    games.value.push({id: 2, team1: "CHI", team2: "SJS", choice: ""})
</script>

<template>
    <h1>Today's Picks</h1>
    <template v-for="game in games">
        <game-template>
            <game-team1 @click="game.choice = game.team1">{{ game.team1 }}</game-team1>
            <game-team2 @click="game.choice = game.team2">{{ game.team2 }}</game-team2>
            <game-choice>{{ game.choice }}</game-choice>
        </game-template>
    </template>
</template>

<style scoped>
    game-template {
        display: grid;
        grid-template: "team1 team2 choice"
    }
</style>