export type Player = {
    id: number,
    first_name: string
    last_name: string
    position: string
    team: string
    points?: number
}

export type Game = {
    id: number
    team1: string
    team2: string
    choice: string
}