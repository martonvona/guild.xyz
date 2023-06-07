import { useRef } from "react"
import { GuildBase } from "types"

const useDragAndDrop = () => {
  const solution = useRef<Guess[]>([])
  const dragging = useRef<GuildBase | undefined>()
  const over = useRef<GuildBase | undefined>()

  const onDragStart = (guild: GuildBase) => {
    dragging.current = guild
  }

  const onDragOver = (guild: GuildBase) => {
    over.current = guild
  }

  const onDragEnd = () => {
    if (dragging.current && over.current) {
      solution.current.push({
        guess: dragging.current,
        row: over.current,
      })
      dragging.current = undefined
      over.current = undefined
    }
  }

  const clearSolution = () => {
    solution.current = []
  }

  const check = () => {
    return solution.current.every((item) => item.guess.id === item.row.id)
  }

  return {
    onDragStart,
    onDragEnd,
    onDragOver,
    check,
    solution: solution.current,
    filled: solution.current.length === 4,
    clearSolution,
  }
}

export type Guess = {
  row: GuildBase
  guess: GuildBase
}

export default useDragAndDrop
