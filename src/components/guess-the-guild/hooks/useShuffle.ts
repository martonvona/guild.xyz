import { useEffect, useState } from "react"
import { GuildBase } from "types"

const useShuffle = (solution) => {
  const [logos, setLogos] = useState<GuildBase[]>([])
  const [rows, setRows] = useState<GuildBase[]>([])

  useEffect(() => {
    setLogos(shuffle(solution))
    setRows(shuffle(solution))
  }, [])

  const reset = () => {
    setLogos(shuffle(solution))
    setRows(shuffle(solution))
  }
  return {
    logos,
    rows,
    setLogos,
    setRows,
    reset,
  }
}

function shuffle(array) {
  const newArray = [...array]

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }

  return newArray
}

export default useShuffle
