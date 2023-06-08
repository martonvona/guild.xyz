import { GameStates } from "../hooks/useMiniGame"

export function randomPlay() {
  const gameTypes: GameStates[] = ["name", "pair"]
  return gameTypes[Math.floor(Math.random() * gameTypes.length)]
}
