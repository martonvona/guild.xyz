import { Flex, Heading, Text, useColorMode } from "@chakra-ui/react"
import Button from "components/common/Button"
import ColorCard from "components/common/ColorCard/ColorCard"
import { Crown } from "phosphor-react"

type Props = {
  startNewGame: () => void
  highScore: number
}

const NewHighScore = ({ startNewGame, highScore }: Props): JSX.Element => {
  const { colorMode } = useColorMode()

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
        >
          {highScore} points
        </Text>
      </Flex>

      <Button h="10" colorScheme="purple" onClick={startNewGame}>
        New game
      </Button>
    </ColorCard>
  )
}

export default NewHighScore
