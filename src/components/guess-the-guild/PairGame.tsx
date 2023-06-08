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
import GuildLogo from "components/common/GuildLogo"
import { Reorder } from "framer-motion"
import image from "next/image"
import { useEffect, useRef, useState } from "react"
import { GuildBase } from "types"
import DropableGuildCard from "./DropableGuildCrad"

type Props = {
  guilds: GuildBase[]
  addToCurrentScore: (score: number) => void
  resetCurrentScore: () => void
}

const PairGame = ({
  guilds,
  addToCurrentScore,
  resetCurrentScore,
}: Props): JSX.Element => {
  const { colorMode } = useColorMode()
  const options = useRef<GuildBase[]>([])
  const [guildIds, setGuildIds] = useState<number[]>([])
  const border = useColorModeValue("blackAlpha.100", "whiteAlpha.100")
  const [showAnswer, setShowAnswer] = useState(false)

  useEffect(() => {
    if (showAnswer) {
    } else {
      options.current = shuffle(guilds).slice(0, 4)
      setGuildIds(shuffle(options.current).map((guild) => guild.id))
    }
  }, [showAnswer])

  const checkAnswer = () =>
    options.current.every((option, index) => option.id === guildIds[index])

  const handelScore = () => {
    if (checkAnswer()) {
      addToCurrentScore(2)
    } else {
      resetCurrentScore()
    }
  }

  return (
    <ColorCard color="transparent" colorMode={colorMode} w="full">
      <Heading as="h2" size="md" mb={4}>
        Pair the logos to their guilds
      </Heading>
      <Grid templateColumns={"2fr 5fr"} gap={1}>
        <Flex direction={"column"} gap={2} pb={2}>
          {options.current.map((option) => (
            <Box
              key={option.id}
              h="full"
              w="full"
              display={"flex"}
              flexDirection={"column"}
              border={"3px solid"}
              borderRight={"none"}
              justifyContent={"center"}
              borderRadius={"2xl"}
              borderRightRadius={{ base: "none", sm: "none" }}
              alignItems={"center"}
              borderColor={border}
              m={0}
            >
              {image && <GuildLogo imageUrl={option.imageUrl} />}
              {showAnswer && (
                <Text fontSize={"xs"} pt={1} fontFamily="display" align="center">
                  {option.name}
                </Text>
              )}
            </Box>
          ))}
        </Flex>
        <Reorder.Group
          axis="y"
          values={guildIds}
          onReorder={(values) => {
            if (!showAnswer) setGuildIds(values)
          }}
        >
          {guildIds?.map((id, index) => (
            <Reorder.Item key={id} value={id}>
              <DropableGuildCard
                guildData={options.current.find((option) => id === option.id)}
                showAnswer={showAnswer}
                isCorrect={options.current[index].id === id}
              />
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </Grid>
      {showAnswer ? (
        <Button
          h="10"
          colorScheme="purple"
          onClick={() => {
            setShowAnswer(false)
            handelScore()
          }}
        >
          Next
        </Button>
      ) : (
        <Button
          h="10"
          colorScheme="green"
          onClick={() => {
            setShowAnswer(true)
          }}
        >
          Submit
        </Button>
      )}
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

export default PairGame
