import {
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react"
import ColorCard from "components/common/ColorCard/ColorCard"
import { Crown, Lightning, Sword } from "phosphor-react"
import { GameDifficulty } from "./hooks/useMiniGame"

type Props = {
  difficulty: GameDifficulty
  setDifficulty: (difficulty: GameDifficulty) => void
  currentScore: number
  highScore: number
}

const MiniGameDashBoard = ({
  difficulty,
  setDifficulty,
  currentScore,
  highScore,
}: Props): JSX.Element => {
  const { colorMode } = useColorMode()
  const labelColor = useColorModeValue("blackAlpha.600", "whiteAlpha.600")

  return (
    <ColorCard
      color="transparent"
      colorMode={colorMode}
      w={{ base: "full", md: "fit-content" }}
    >
      <Heading
        as="h2"
        size="md"
        mb={4}
        fontFamily="display"
        fontWeight="bold"
        letterSpacing="wide"
      >
        Dashboard
      </Heading>
      <Flex alignItems="center" gap={2} pb={2}>
        <Sword size={21} />
        <Text fontSize={"xs"} color={labelColor}>
          Difficulty
        </Text>
      </Flex>
      <ButtonGroup size="sm" isAttached variant="outline">
        <Button
          isActive={difficulty === "easy"}
          onClick={() => setDifficulty("easy")}
        >
          Easy
        </Button>
        <Button
          isActive={difficulty === "medium"}
          onClick={() => setDifficulty("medium")}
        >
          Medium
        </Button>
        <Button
          isActive={difficulty === "hard"}
          onClick={() => setDifficulty("hard")}
        >
          Hard
        </Button>
      </ButtonGroup>
      <Flex alignItems="center" gap={2} pb={2} pt={6}>
        <Text fontSize={"xs"} color="yellow.500">
          <Crown size={21} />
        </Text>
        <Text fontSize={"xs"} color={labelColor}>
          High Score
        </Text>
      </Flex>
      <Text
        fontSize="xl"
        fontFamily="display"
        fontWeight="bold"
        letterSpacing="wide"
      >
        {highScore} points
      </Text>
      <Flex alignItems="center" gap={2} pb={2} pt={6}>
        <Text fontSize={"xs"} color="purple.500">
          <Lightning size={21} />
        </Text>
        <Text fontSize={"xs"} color={labelColor}>
          Current Score
        </Text>
      </Flex>
      <Text
        fontSize="xl"
        fontFamily="display"
        fontWeight="bold"
        letterSpacing="wide"
      >
        {currentScore} points
      </Text>
    </ColorCard>
  )
}

export default MiniGameDashBoard
