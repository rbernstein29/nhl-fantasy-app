import type { Player } from "./types"

export const fetch_players = async () => {
    try {
        const response = await fetch("http://localhost:4449/api/get-players")
        const data = await response.json()
        return data
    } catch (e) {
        console.error("Error fetching avaliable players: ", e)
    }
}

export const get_team = async () => {
    try {
        const reponse = await fetch("http://localhost:4449/api/user-team")
        const data = await reponse.json()
        return data
    } catch (e) {
        console.error("Error fetching team: ", e)
    }
}

export const select_player = async (player: Player) => {
    try {
        const response = await fetch("http://localhost:4449/api/select-player", {
            method: "POST",
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