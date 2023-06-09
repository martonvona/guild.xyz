import { Flex, Heading, Text, useColorMode } from "@chakra-ui/react"
import Button from "components/common/Button"
import ColorCard from "components/common/ColorCard/ColorCard"
import { Crown } from "phosphor-react"
import { useEffect } from "react"
import { HIGH_SCORE_KEY } from "./utils/constants"
import { newHighScoreMessages } from "./utils/messages"

type Props = {
  action: () => void
  highScore: number
  setHighScore: (score: number) => void
}

const NewHighScore = ({ action, highScore, setHighScore }: Props): JSX.Element => {
  const { colorMode } = useColorMode()

  useEffect(() => {
    window.localStorage.setItem(HIGH_SCORE_KEY, highScore.toString())
    setHighScore(highScore)
  }, [])

  return (
    <ColorCard color="transparent" colorMode={colorMode} w="full">
      <Flex justifyContent="center" h="full" alignItems="center" direction="column">
        <Heading as="h2" size="md" mb={4} fontFamily="display" fontWeight="bold">
          New high score
        </Heading>
        <Text fontSize={"xs"} color="yellow.500">
          <Crown size={50} />
        </Text>
        <Text
          fontSize="xl"
          fontFamily="display"
          fontWeight="bold"
          letterSpacing="wide"
          align="center"
          pb={5}
        >
          {highScore} points
        </Text>
        <Text
          fontSize="md"
          fontFamily="display"
          letterSpacing="wide"
          align="center"
          pb={5}
        >
          {newHighScoreMessages()}
        </Text>
      </Flex>
      <Button h="10" colorScheme="purple" onClick={action}>
        New game
      </Button>
    </ColorCard>
  )
}

export default NewHighScore
