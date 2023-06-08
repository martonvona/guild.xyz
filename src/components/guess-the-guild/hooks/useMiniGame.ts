import { useEffect, useState } from "react"
import { GuildBase } from "types"
import { HIGH_SCORE_KEY } from "../utils/constants"
import { randomPlay } from "../utils/randomPlay"

type Props = {
  guilds: GuildBase[]
}

const useMiniGame = ({ guilds }: Props) => {
  const [difficulty, setDifficulty] = useState<GameDifficulty>("easy")
  const [guildsToGuess, setGuildsToGuess] = useState<GuildBase[]>(
    guilds.slice(0, 100)
  )
  const [currentScore, setCurrentScore] = useState(0)
  const [highScore, setHighScore] = useState(0)

  const [gameState, setGameState] = useState<GameStates>("name")

  const addToCurrentScore = (score: number) => {
    setCurrentScore((prev) => prev + score)
    nextPlay()
  }

  const resetCurrentScore = () => {
    if (currentScore > highScore) {
      setGameState("newHighScore")
    } else {
      setGameState("gameOver")
    }
  }

  const nextRound = () => {
    setCurrentScore(0)
    nextPlay()
  }

  const nextPlay = () => {
    setGameState(randomPlay())
  }

  useEffect(() => {
    switch (difficulty) {
      case "easy":
        setGuildsToGuess(guilds.slice(0, 100))
        break
      case "medium":
        setGuildsToGuess(guilds.slice(0, 500))
        break
      case "hard":
        setGuildsToGuess(guilds.slice(0, 1000))
        break
      default:
        break
    }
  }, [difficulty])

  useEffect(() => {
    const storedHighScore = window.localStorage.getItem(HIGH_SCORE_KEY)

    if (storedHighScore) {
      setHighScore(parseInt(storedHighScore))
    } else {
      setHighScore(0)
    }
  }, [])

  return {
    difficulty,
    setDifficulty,
    guildsToGuess,
    currentScore,
    highScore,
    setHighScore,
    addToCurrentScore,
    resetCurrentScore,
    nextRound,
    gameState,
    setGame: setGameState,
  }
}

export default useMiniGame
export type GameDifficulty = "easy" | "medium" | "hard"
export type GameStates = "name" | "pair" | "gameOver" | "newHighScore"
