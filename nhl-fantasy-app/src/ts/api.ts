import type { Player } from "./types"

const BASE_URL = "http://localhost:4449/api/"

export const fetch_players = async () => {
    try {
        const response = await fetch(BASE_URL + "get-players")
        const data = await response.json()
        return data
    } catch (e) {
        console.error("Error fetching avaliable players: ", e)
    }
}

export const get_team = async () => {
    try {
        const reponse = await fetch(BASE_URL + "user-team")
        const data = await reponse.json()
        return data
    } catch (e) {
        console.error("Error fetching team: ", e)
    }
}

export const select_forward = async (player: Player) => {
    try {
        const response = await fetch(BASE_URL + "select-forward", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(player)
        })
        const data = await response.json()
        console.log(data)
    } catch (e) {
        console.error("Error selecting player: ", e)
    }
}

export const select_defense = async (player: Player) => {
    try {
        const response = await fetch(BASE_URL + "select-defense", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(player)
        })
        const data = await response.json()
        console.log(data)
    } catch (e) {
        console.error("Error selecting player: ", e)
    }
}

export const select_goalie = async (player: Player) => {
    try {
        const response = await fetch(BASE_URL + "select-goalie", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(player)
        })
        const data = await response.json()
        console.log(data)
    } catch (e) {
        console.error("Error selecting player: ", e)
    }
}

export const remove_player = async (player: Player) => {
    try {
        const response = await fetch(BASE_URL + "remove-player/" + player.id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json()
        console.log(data)
    } catch (e) {
        console.error("Error dropping player: ", e)
    }
}

export const get_player_stats = async (player: Player) => {
    try {
        const response = await fetch(BASE_URL + "get-player-stats/" + player.id)
        const data = await response.json()
        console.log(data)
        player.points = data
    } catch (e) {
        console.error("Error fetching stats: ", e)
    }
}

export const get_current_leaders = async () => {
    try {
        const response = await fetch(BASE_URL + "get-current-leaders")
        const data = await response.json()
        console.log(data)
        return data
    } catch (e) {
        console.error("Error getting current leaders: ", e)
    }
}

export const get_games = async () => {
    try {
        const response = await fetch(BASE_URL + "games")
        const data = await response.json()
        console.log(data)
        return data
    } catch (e) {
        console.error("Error getting games: ", e)
    }
}