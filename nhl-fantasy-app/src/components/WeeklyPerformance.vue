<script setup lang="ts">
    const weeks = []

    weeks.push({week: 1, points: 76, trend: "none"})
    weeks.push({week: 2, points: 89, trend: "up"})
    weeks.push({week: 3, points: 64, trend: "down"})
    weeks.push({week: 4, points: 113, trend: "up"})
</script>

<template>
    <h1>Season Performance</h1>
    <template v-for="week in weeks">
        <curr-week>
            <curr-week-number>Week {{ week.week }}</curr-week-number>
            <curr-week-points>{{ week.points }} pts</curr-week-points>
            <curr-week-trend v-if="week.trend === 'up'">^</curr-week-trend>
            <curr-week-trend v-else-if="week.trend === 'down'">\/</curr-week-trend>
            <curr-week-trend v-else>-</curr-week-trend>
        </curr-week>
    </template>
</template>

<style scoped>
    curr-week {
        display: grid;
        grid-template: "week points trend"
    }
</style>