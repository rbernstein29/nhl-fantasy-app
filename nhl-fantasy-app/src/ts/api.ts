import type { Player, Team } from "./types"

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

export const save_team = async (players: Player[]) => {
    try {
        const team = {
            id: Date.now(),
            center: players.find(player => player.position === "C"),
            left_wing: players.find(player => player.position === "L"),
            right_wing: players.find(player => player.position === "R"),
            defense_1: players.find(player => player.position === "D"),
            defense_2: players.filter(player => player.position === "D")[1],
            goalie: players.find(player => player.position === "G"),
            points: players.reduce((sum, p) => sum + (p.points ?? 0), 0)
        }
        const response = await fetch(BASE_URL + "save-team", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(team),
        })
        const data = await response.json()
        console.log(data)
    } catch (e) {
        console.error("Error saving team: ", e)
    }
}

export const delete_team = async (team: Team) => {
    try {
        const response = await fetch(BASE_URL + "remove-team/" + team.id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
        })
        const data = await response.json()
        console.log(data)
    } catch (e) {
        console.error("Error deleting team: ", e)
    }
}

export const get_user_teams = async () => {
    try {
        const response = await fetch(BASE_URL + "get-user-teams")
        const data = await response.json()
        console.log(data)
        return data
    } catch (e) {
        console.error("Error getting user teams: ", e)
    }
}