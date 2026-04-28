<script setup lang="ts">
    const games = []

    games.push({team1: "NYR", team2: "TBL"})
    games.push({team1: "BUF", team2: "DAL"})
    games.push({team1: "CHI", team2: "SJS"})
</script>

<template>
    <h1>Today's Picks</h1>
    <template v-for="game in games">
        <game-template>
            <game-team1>{{ game.team1 }}</game-team1>
            <game-team2>{{ game.team2 }}</game-team2>
        </game-template>
    </template>
</template>

<style scoped>
    game-template {
        display: grid;
        grid-template: "team1 team2"
    }
</style>