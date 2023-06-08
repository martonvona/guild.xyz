import { Flex, useBreakpointValue, useColorModeValue } from "@chakra-ui/react"
import { useWeb3React } from "@web3-react/core"
import Layout from "components/common/Layout"
import LinkPreviewHead from "components/common/LinkPreviewHead"
import GameOver from "components/guess-the-guild/GameOver"
import MiniGameDashBoard from "components/guess-the-guild/MiniGameDashboard"
import NameGame from "components/guess-the-guild/NameGame"
import NewHighScore from "components/guess-the-guild/NewHighScore"
import PairGame from "components/guess-the-guild/PairGame"
import { GetStaticProps } from "next"
import { useEffect, useState } from "react"
import { GuildBase } from "types"
import fetcher from "utils/fetcher"

type Props = {
  guilds: GuildBase[]
}

const Minigame = ({ guilds }: Props): JSX.Element => {
  const { account } = useWeb3React()

  const bgColor = useColorModeValue("var(--chakra-colors-gray-800)", "#37373a") // dark color is from whiteAlpha.200, but without opacity so it can overlay the banner image
  const bgOpacity = useColorModeValue(0.06, 0.1)
  const bgLinearPercentage = useBreakpointValue({ base: "50%", sm: "55%" })
  const [difficulty, setDifficulty] = useState<GameDifficulty>("easy")
  const [guildsToGuess, setGuildsToGuess] = useState<GuildBase[]>(
    guilds.slice(0, 100)
  )
  const [currentScore, setCurrentScore] = useState(0)
  const [game, setGame] = useState<GameStates>("name")

  const highScore = 1

  const addToCurrentScore = (score: number) => {
    setCurrentScore((prev) => prev + score)

    nextPlay()
  }

  const resetCurrentScore = () => {
    if (currentScore > highScore) {
      setGame("newHighScore")
    } else {
      setGame("gameOver")
    }
  }

  const newGame = () => {
    setCurrentScore(0)
    nextPlay()
  }

  const nextPlay = () => {
    //give a random game type
    const gameTypes: GameStates[] = ["name", "pair"]
    const randomGame = gameTypes[Math.floor(Math.random() * gameTypes.length)]
    setGame(randomGame)
  }

  useEffect(() => {
    if (difficulty === "easy") setGuildsToGuess(guilds.slice(0, 4))
    else if (difficulty === "medium") setGuildsToGuess(guilds.slice(0, 500))
    else if (difficulty === "hard") setGuildsToGuess(guilds.slice(0, 1000))
  }, [difficulty])

  return (
    <>
      <LinkPreviewHead path="" />
      <Layout
        title={"Minigame"}
        ogDescription="Automated membership management for the platforms your community already uses."
        background={bgColor}
        backgroundProps={{
          _before: {
            content: '""',
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            bg: `linear-gradient(to top right, ${bgColor} ${bgLinearPercentage}, transparent), url('/banner.png ')`,
            bgSize: { base: "auto 100%", sm: "auto 115%" },
            bgRepeat: "no-repeat",
            bgPosition: "top 10px right 0px",
            opacity: bgOpacity,
          },
        }}
        backgroundOffset={account ? 100 : 90}
        textColor="white"
      >
        <Flex gap={2}>
          {game === "pair" && (
            <PairGame
              guilds={guildsToGuess}
              addToCurrentScore={addToCurrentScore}
              resetCurrentScore={resetCurrentScore}
            />
          )}
          {game === "name" && (
            <NameGame
              guilds={guildsToGuess}
              addToCurrentScore={addToCurrentScore}
              resetCurrentScore={resetCurrentScore}
            />
          )}
          {game === "newHighScore" && (
            <NewHighScore startNewGame={newGame} highScore={currentScore} />
          )}
          {game === "gameOver" && (
            <GameOver startNewGame={newGame} highScore={currentScore} />
          )}
          <MiniGameDashBoard
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            currentScore={currentScore}
          />
        </Flex>
      </Layout>
    </>
  )
}

export type GameDifficulty = "easy" | "medium" | "hard"
export type GameStates = "name" | "pair" | "gameOver" | "newHighScore"

export const getStaticProps: GetStaticProps = async () => {
  const guilds = await fetcher(`/guild?sort=members&limit=1000&offset=0`).catch(
    (_) => []
  )

  return {
    props: { guilds },
    revalidate: 300,
  }
}

export default Minigame
