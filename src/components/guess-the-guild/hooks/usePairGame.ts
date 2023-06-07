import { GuildBase } from "types"
import useDragAndDrop from "./useDragAndDrop"
import useShuffle from "./useShuffle"

const usePairGame = (guilds: GuildBase[]) => {
  const options: GuildBase[] = guilds.slice(0, 4)
  const { logos, rows, setLogos, setRows, reset } = useShuffle(options)
  const { onDragStart, onDragEnd, check, onDragOver, solution, clearSolution } =
    useDragAndDrop()

  const removeLogo = (logo: GuildBase) => {
    setLogos([...logos.filter((item) => item.id !== logo.id)])
  }

  const resetGame = () => {
    reset()
    clearSolution()
  }

  return {
    logos,
    rows,
    onDragStart,
    onDragEnd,
    check,
    onDragOver,
    removeLogo,
    solution,
    reset: resetGame,
  }
}

export default usePairGame
