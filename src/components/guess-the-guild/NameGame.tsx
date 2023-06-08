import {
  Box,
  Flex,
  Grid,
  Heading,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react"
import Button from "components/common/Button"
import ColorCard from "components/common/ColorCard/ColorCard"
import DisplayCard from "components/common/DisplayCard"
import GuildLogo from "components/common/GuildLogo"
import image from "next/image"
import { CheckCircle, Circle, XCircle } from "phosphor-react"
import { useEffect, useRef, useState } from "react"
import { GuildBase } from "types"

type Props = {
  guilds: GuildBase[]
  addToCurrentScore: (score: number) => void
  resetCurrentScore: () => void
}

const NameGame = ({
  guilds,
  addToCurrentScore,
  resetCurrentScore,
}: Props): JSX.Element => {
  const { colorMode } = useColorMode()
  const options = useRef<GuildBase[]>([])
  const [guildIds, setGuildIds] = useState<number[]>([])
  const border = useColorModeValue("blackAlpha.100", "whiteAlpha.100")
  const [showAnswer, setShowAnswer] = useState(false)
  const background = useColorModeValue("blackAlpha.100", "whiteAlpha.100")
  const [guess, setGuess] = useState<number | undefined>()

  useEffect(() => {
    if (showAnswer) {
    } else {
      options.current = shuffle(guilds).slice(0, 4)
      setGuildIds(shuffle(options.current).map((guild) => guild.id))
    }
  }, [showAnswer])

  const handelScore = () => {
    if (checkAnswer()) {
      addToCurrentScore(1)
    } else {
      resetCurrentScore()
    }
  }

  const checkAnswer = () => guess === options.current[0].id

  return (
    <ColorCard color="transparent" colorMode={colorMode} w="full">
      <Heading as="h2" size="md" mb={4}>
        Guess the guild by the logo
      </Heading>
      <Flex direction={"column"} gap={2} pb={2}>
        {options.current.length && (
          <Box
            key={options.current[0].id}
            h="full"
            w="full"
            display={"flex"}
            flexDirection={"column"}
            border={"3px solid"}
            borderBottom={"none"}
            justifyContent={"center"}
            borderRadius={"2xl"}
            borderBottomRadius={{ base: "none", sm: "none" }}
            alignItems={"center"}
            borderColor={border}
            p={5}
            m={0}
          >
            {image && <GuildLogo imageUrl={options.current[0].imageUrl} />}
            {showAnswer ? (
              <Text fontSize={"md"} pt={3} fontFamily="display">
                {options.current[0].name}
              </Text>
            ) : (
              <Text fontSize={"md"} pt={3} fontFamily="display">
                ???
              </Text>
            )}
          </Box>
        )}
      </Flex>
      <Grid gap={2} pb={2}>
        {guildIds?.map((id, index) => (
          <DisplayCard
            key={id}
            shadow="none"
            bg={background}
            cursor="pointer"
            onClick={() => {
              setGuess(id)
              setShowAnswer(true)
            }}
          >
            <Grid templateColumns={"7fr 1fr"} gap={4} alignItems="center">
              <Text
                as="span"
                fontFamily="display"
                fontSize="xl"
                fontWeight="bold"
                letterSpacing="wide"
                maxW="full"
                noOfLines={1}
              >
                {options.current.find((option) => id === option.id).name}
              </Text>
              {showAnswer && guess === id ? (
                checkAnswer() ? (
                  <Text color="green.400">
                    <CheckCircle size={32} />
                  </Text>
                ) : (
                  <Text color="red.400">
                    <XCircle size={32} />
                  </Text>
                )
              ) : (
                <Text color="gray.400">
                  <Circle size={32} />
                </Text>
              )}
            </Grid>
          </DisplayCard>
        ))}
      </Grid>
      <Button
        h="10"
        colorScheme="purple"
        onClick={() => {
          setShowAnswer(false)
          handelScore()
        }}
        isDisabled={!showAnswer}
      >
        Next
      </Button>
    </ColorCard>
  )
}

function shuffle(array) {
  const newArray = [...array]

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }

  return newArray
}

export default NameGame
