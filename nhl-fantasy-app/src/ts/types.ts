export type Player = {
    id: number,
    first_name: string
    last_name: string
    position: string
    team: string
    team_logo: string
    headshot: string
    points?: number
    goals?: number
    assists?: number
}

export type Game = {
    id: number
    away_team: string
    away_logo: string
    away_score?: number
    home_team: string
    home_logo: string
    home_score?: number
}