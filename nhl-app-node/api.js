import express from 'express'
import cors from 'cors'

const app = express()
app.use(express.json())

app.use(cors({
  origin: 'http://localhost:5173' 
}))

const user_players = []

const process_response = (data) => {
    const player_list = []
    for (const player of data.forwards) {
        const curr_player = {
            id: player.id, 
            first_name: player.firstName.default, 
            last_name: player.lastName.default, 
            position: player.positionCode,
            number: player.sweaterNumber,
            team: "NYR",
        }
        player_list.push(curr_player)
    }
    return player_list
}

app.get("/api/get-players", async (request, response) => {
    const res = await fetch("https://api-web.nhle.com/v1/roster/NYR/current")
    const data = await res.json()
    const processed_data = process_response(data)
    response.json(processed_data);
})

app.get("/api/user-team", (request, response) => {
    response.json(user_players)
})

app.post("/api/select-player", (request, response) => {
    const player = request.body
    if (user_players.some(p => p.id === player.id)) {
        response.status(200).json({ message: "Player already selected" })
    }
    else if (user_players.length === 5) {
        response.status(200).json({ message: "Team is full" })
    }
    else {
        user_players.push(player)
        response.status(201).send(player)
    }
})

app.listen(4449)