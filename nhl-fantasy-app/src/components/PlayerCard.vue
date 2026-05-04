<script setup lang="ts">
    import type { Player } from '@/ts/types';
    import { get_player_stats } from '@/ts/api';
    import { onMounted, useSlots } from 'vue';

    const slots = useSlots()

    const props = defineProps<{
        player?: Player
    }>()

    onMounted(() => { if (props.player) { get_player_stats(props.player) }})
</script>

<template>
    <curr-player :style="{ gridTemplateColumns: slots.default ? '1fr auto auto auto auto' : '1fr auto auto auto' }">
        <play-name>
            <play-first-name>{{ player?.first_name }}</play-first-name>
            <play-last-name>{{ player?.last_name }}</play-last-name>
        </play-name>
        <play-pos>{{ player?.position }}</play-pos>
        <play-team>{{ player?.team }}</play-team>
        <play-points>{{ player?.points || 0 }} pts</play-points>
        <slot v-if="slots.default" />
    </curr-player>
</template>

<style scoped>
    curr-player {
        display: grid;
        align-items: center;
        gap: 1rem;
        padding: 0.6rem 1rem;
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
        transition: box-shadow 0.15s, transform 0.15s;
        cursor: pointer;
    }

    curr-player:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
        transform: translateY(-1px);
    }

    play-name {
        display: flex;
        gap: 0.35rem;
        align-items: baseline;
    }

    play-first-name {
        color: #334155;
        font-size: 0.95rem;
    }

    play-last-name {
        color: #0f172a;
        font-weight: 700;
        font-size: 0.95rem;
    }

    play-pos {
        background: #f1f5f9;
        border-radius: 4px;
        padding: 2px 8px;
        font-size: 0.8rem;
        font-weight: 600;
        color: #475569;
    }

    play-team {
        color: #64748b;
        font-size: 0.85rem;
        min-width: 3ch;
        text-align: center;
    }

    play-points {
        color: #0ea5e9;
        font-weight: 700;
        font-size: 0.95rem;
        min-width: 5ch;
        text-align: right;
    }

    :slotted(button) {
        padding: 0.25rem 0.75rem;
        border: none;
        border-radius: 5px;
        font-size: 0.8rem;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.15s;
    }

    :slotted(.btn-add) {
        background: #0ea5e9;
        color: #ffffff;
    }

    :slotted(.btn-add):hover {
        background: #0284c7;
    }

    :slotted(.btn-drop) {
        background: #fee2e2;
        color: #dc2626;
    }

    :slotted(.btn-drop):hover {
        background: #fecaca;
    }
</style>