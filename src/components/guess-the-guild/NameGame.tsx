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
import NoGuilds from "./NoGuilds"
import { shuffle } from "./utils/shuffle"

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

  if (guilds.length < 4) return <NoGuilds />

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
            {image && (
              <GuildLogo imageUrl={options.current[0].imageUrl} size={"100px"} />
            )}
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
        {guildIds?.map((id) => (
          <DisplayCard
            key={id}
            shadow="none"
            bg={background}
            px={{ base: 3, md: 4 }}
            py={{ base: 4, md: 5 }}
            cursor="pointer"
            onClick={() => {
              if (!showAnswer) {
                setGuess(id)
                setShowAnswer(true)
              }
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
              <Flex justifyContent={"flex-end"}>
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
              </Flex>
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

export default NameGame
