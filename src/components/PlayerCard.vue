<script setup lang="ts">
    import type { Player } from '@/ts/player';

    const props = defineProps<{
        player?: Player
    }>()
    console.log(props.player)
</script>

<template>
    <curr-player>
        <play-first-name>{{ player?.first_name }}</play-first-name>
        <play-last-name>{{ player?.last_name }}</play-last-name>
        <play-pos>{{ player?.position }}</play-pos>
        <play-team>{{ player?.team }}</play-team>
        <play-points v-if="player?.points">{{ player.points }} pts</play-points>
    </curr-player>
</template>

<style scoped>
    curr-player {
        display: grid;
        grid-template: "first-name last-name position team points";
    }
</style>