import { Flex, Heading, Text, useColorMode } from "@chakra-ui/react"
import Button from "components/common/Button"
import ColorCard from "components/common/ColorCard/ColorCard"
import { Trophy } from "phosphor-react"

type Props = {
  action: () => void
  score: number
}

const GameOver = ({ action, score }: Props): JSX.Element => {
  const { colorMode } = useColorMode()

  return (
    <ColorCard color="transparent" colorMode={colorMode} w="full">
      <Flex justifyContent="center" h="full" alignItems="center" direction="column">
        <Heading as="h2" size="md" mb={4} fontFamily="display" fontWeight="bold">
          Game over
        </Heading>
        <Text fontSize={"xs"}>
          <Trophy size={50} />
        </Text>
        <Text
          fontSize="sm"
          fontFamily="display"
          fontWeight="bold"
          letterSpacing="wide"
          align="center"
          pt={5}
        >
          Your score
        </Text>
        <Text
          fontSize="xl"
          fontFamily="display"
          fontWeight="bold"
          letterSpacing="wide"
          align="center"
          pb={5}
        >
          {score} points
        </Text>
      </Flex>

      <Button h="10" colorScheme="purple" onClick={action}>
        New game
      </Button>
    </ColorCard>
  )
}

export default GameOver
