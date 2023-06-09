import { Flex, useBreakpointValue, useColorModeValue } from "@chakra-ui/react"
import { useWeb3React } from "@web3-react/core"
import Layout from "components/common/Layout"
import LinkPreviewHead from "components/common/LinkPreviewHead"
import GameOver from "components/guess-the-guild/GameOver"
import MiniGameDashBoard from "components/guess-the-guild/MiniGameDashboard"
import NameGame from "components/guess-the-guild/NameGame"
import NewHighScore from "components/guess-the-guild/NewHighScore"
import PairGame from "components/guess-the-guild/PairGame"
import useMiniGame from "components/guess-the-guild/hooks/useMiniGame"
import { GetStaticProps } from "next"
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
  const {
    gameState,
    guildsToGuess,
    addToCurrentScore,
    resetCurrentScore,
    currentScore,
    highScore,
    setHighScore,
    nextRound,
    difficulty,
    setDifficulty,
  } = useMiniGame({ guilds })

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
        <Flex gap={2} direction={{ base: "column", md: "row" }}>
          {gameState === "pair" && (
            <PairGame
              guilds={guildsToGuess}
              addToCurrentScore={addToCurrentScore}
              resetCurrentScore={resetCurrentScore}
            />
          )}
          {gameState === "name" && (
            <NameGame
              guilds={guildsToGuess}
              addToCurrentScore={addToCurrentScore}
              resetCurrentScore={resetCurrentScore}
            />
          )}
          {gameState === "newHighScore" && (
            <NewHighScore
              action={nextRound}
              setHighScore={setHighScore}
              highScore={currentScore}
            />
          )}
          {gameState === "gameOver" && (
            <GameOver action={nextRound} score={currentScore} />
          )}
          <MiniGameDashBoard
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            currentScore={currentScore}
            highScore={highScore}
          />
        </Flex>
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const guilds = await fetcher(`/guild?sort=members&limit=1000&offset=0`).catch(
    (_) => []
  )

  const guildsWithImage = guilds.filter(
    (guild: GuildBase) => guild.imageUrl !== "" && guild.imageUrl
  )

  return {
    props: { guilds: guildsWithImage },
    revalidate: 300,
  }
}

export default Minigame
