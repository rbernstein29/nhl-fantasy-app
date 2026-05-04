import express from 'express'
import cors from 'cors'

const app = express()
app.use(express.json())

app.use(cors({
  origin: 'http://localhost:5173' 
}))

const BASE_URL = "https://api-web.nhle.com"

const user_players = []

const centers_max = 1
const rightw_max = 1
const leftw_max = 1
const defense_max = 2
const goalie_max = 1

let num_centers = 0
let num_rightw = 0
let num_leftw = 0
let num_defense = 0
let num_goalies = 0

const process_response = (data) => {
    const player_list = []
    for (const player of data.forwards) {
        const curr_player = process_player(player)
        player_list.push(curr_player)
    }
    for (const player of data.defensemen) {
        const curr_player = process_player(player)
        player_list.push(curr_player)
    }
    for (const player of data.goalies) {
        const curr_player = process_player(player)
        player_list.push(curr_player)
    }
    return player_list
}

const process_player = (player) => {
    const curr_player = {
        id: player.id, 
        first_name: player.firstName.default, 
        last_name: player.lastName.default, 
        position: player.positionCode,
        number: player.sweaterNumber,
        team: "CAR",
        headshot: player.headshot,
        points: 0,
    }
    return curr_player
}

const process_player_stats = (player) => {
    let points = 0
    for (const game of player.gameLog) {
        points += (game.goals * 2 || 0) + 
        (game.assists || 0) + 
        (game.plusMinus || 0) + 
        (game.powerPlayPoints || 0) + 
        (game.shorthandedPoints || 0) + 
        (game.gameWinningGoals * 3 || 0) + 
        (game.shots * 0.25 || 0) +
        (game.goalsAgainst * -1 || 0) +
        (game.decision === "W" ? 5 : 0) +
        ((game.shotsAgainst - game.goalsAgainst) * 0.1 || 0) +
        (game.shutouts * 3 || 0)
    }
    return points
}

const process_goal_leaders = (leaders) => {
    const goal_leaders = []
    for (const player of leaders.goals) {
        goal_leaders.push({
            first_name: player.firstName.default,
            last_name: player.lastName.default,
            team: player.teamAbbrev,
            team_logo: player.teamLogo,
            goals: player.value,
        })
    }
    return goal_leaders
}

const process_assist_leaders = (leaders) => {
    const assist_leaders = []
    for (const player of leaders.assists) {
        assist_leaders.push({
            first_name: player.firstName.default,
            last_name: player.lastName.default,
            team: player.teamAbbrev,
            team_logo: player.teamLogo,
            assists: player.value,
        })
    }
    return assist_leaders
}

const process_point_leaders = (leaders) => {
    const point_leaders = []
    for (const player of leaders.points) {
        point_leaders.push({
            first_name: player.firstName.default,
            last_name: player.lastName.default,
            team: player.teamAbbrev,
            team_logo: player.teamLogo,
            points: player.value,
        })
    }
    return point_leaders
}

const process_games = (data) => {
    const today_games = []
    for (const game of data.games) {
        today_games.push({
            id: game.id,
            away_team: game.awayTeam.abbrev,
            away_logo: game.awayTeam.logo,
            away_score: game.awayTeam.score,
            home_team: game.homeTeam.abbrev,
            home_logo: game.homeTeam.logo,
            home_score: game.homeTeam.score,
        })
    }
    return today_games
}

/* GET Methods */

app.get("/api/get-players", async (request, response) => {
    const res = await fetch(BASE_URL + "/v1/roster/CAR/current")
    const data = await res.json()
    const processed_data = process_response(data)
    response.json(processed_data);
})

app.get("/api/user-team", (request, response) => {
    response.json(user_players)
})

app.get("/api/get-player-stats/:id", async (request, response) => {
    const res = await fetch(BASE_URL + "/v1/player/" + request.params.id + "/game-log/20252026/3")
    const data = await res.json()
    const processed_data = process_player_stats(data)
    response.json(processed_data)
})

app.get("/api/get-current-leaders", async (request, response) => {
    const res = await fetch(BASE_URL + "/v1/skater-stats-leaders/current")
    const data = await res.json()
    const goal_leaders = process_goal_leaders(data)
    const assist_leaders = process_assist_leaders(data)
    const point_leaders = process_point_leaders(data)
    const processed_data = {
        goals: goal_leaders,
        assists: assist_leaders,
        points: point_leaders,
    }
    response.json(processed_data)
})

app.get("/api/games", async (request, response) => {
    const res = await fetch(BASE_URL + "/v1/score/now")
    const data = await res.json()
    const games = process_games(data)
    response.json(games)
})

/* PATCH Methods */

app.patch("/api/select-forward", (request, response) => {
    const player = request.body
    if (user_players.some(p => p.id === player.id)) {
        response.status(200).json({ message: "Player already selected" })
    }
    else if (player.position === 'C' && num_centers === centers_max) {
        response.status(200).json({ message: "Center already selected" })
    }
    else if (player.position === 'R' && num_rightw === rightw_max) {
        response.status(200).json({ message: "Right wing already selected" })
    }
    else if (player.position === 'L' && num_leftw === leftw_max) {
        response.status(200).json({ message: "Left wing already selected" })
    }
    else {
        user_players.push(player)
        if (player.position === 'C') { num_centers++ }
        else if (player.position === 'R') { num_rightw++ }
        else { num_leftw++ }
        response.status(201).send(player)
    }
})

app.patch("/api/select-defense", (request, response) => {
    const player = request.body
    if (user_players.some(p => p.id === player.id)) {
        response.status(200).json({ message: "Player already selected" })
    }
    else if (num_defense === defense_max) {
        response.status(200).json({ message: "Defensemen full" })
    }
    else {
        user_players.push(player)
        num_defense++
        response.status(201).send(player)
    }
})

app.patch("/api/select-goalie", (request, response) => {
    const player = request.body
    if (user_players.some(p => p.id === player.id)) {
        response.status(200).json({ message: "Player already selected" })
    }
    else if (num_goalies === goalie_max) {
        response.status(200).json({ message: "Goalies full" })
    }
    else {
        user_players.push(player)
        num_goalies++
        response.status(201).send(player)
    }
})

app.patch("/api/remove-player/:id", (request, response) => {
    const id = parseInt(request.params.id)
    const index = user_players.findIndex(p => p.id === id)
    if (index === -1) {
        response.status(404).json({ message: "Player not found" })
    }
    else {
        const player = user_players[index]
        user_players.splice(index, 1)
        if (player.position === 'C') { num_centers-- }
        else if (player.position === 'R') { num_rightw-- }
        else if (player.position === 'L') { num_leftw-- }
        else if (player.position === 'D') { num_defense-- }
        else { num_goalies-- }
        response.status(200).send(player)
    }
})

app.listen(4449)