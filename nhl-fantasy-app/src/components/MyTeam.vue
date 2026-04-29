<script setup lang="ts">
    import { ref } from 'vue'
    import type { Player } from '@/ts/types'
    import PlayerCard from './PlayerCard.vue';

    const user_players = ref<Player[]>([])
</script>

<template>
    <h1>My Team</h1>
    <template v-for="player in user_players">
        <PlayerCard :player="player"></PlayerCard>
    </template>
</template>

<style scoped>

</style>