<script setup lang="ts">
    import { ref } from 'vue'
    import { user_players } from '@/ts/constants';
    import PlayerCard from './PlayerCard.vue';
</script>

<template>
    <h1>My Team</h1>
    <template v-for="player in user_players">
        <PlayerCard :player="player"></PlayerCard>
    </template>
</template>

<style scoped>

</style>