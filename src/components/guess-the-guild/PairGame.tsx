import {
  Box,
  Flex,
  Grid,
  Heading,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react"
import Button from "components/common/Button"
import ColorCard from "components/common/ColorCard/ColorCard"
import GuildLogo from "components/common/GuildLogo"
import { Reorder } from "framer-motion"
import image from "next/image"
import { useEffect, useState } from "react"
import { GuildBase } from "types"
import DropableGuildCard from "./DropableGuildCrad"

type Props = {
  guilds: GuildBase[]
}

const PairGame = ({ guilds }: Props): JSX.Element => {
  const { colorMode } = useColorMode()
  const options: GuildBase[] = guilds.slice(0, 4)
  const [guildIds, setGuildIds] = useState<number[]>([])
  const border = useColorModeValue("blackAlpha.100", "whiteAlpha.100")

  useEffect(() => {
    setGuildIds(shuffle(options).map((guild) => guild.id))
  }, [])

  return (
    <ColorCard color="transparent" colorMode={colorMode} w="fit-content">
      <Heading as="h2" size="md" mb={4}>
        Pair the logos to their guilds
      </Heading>
      <Grid templateColumns={"2fr 5fr"} gap={1}>
        <Flex direction={"column"} gap={2} pb={2}>
          {options.map((option) => (
            <Box
              key={option.id}
              h="full"
              w="full"
              display={"flex"}
              border={"3px dashed"}
              borderRight={"none"}
              justifyContent={"center"}
              borderRadius={"2xl"}
              borderRightRadius={{ base: "none", sm: "none" }}
              alignItems={"center"}
              borderColor={border}
              m={0}
            >
              {image && <GuildLogo imageUrl={option.imageUrl} />}
            </Box>
          ))}
        </Flex>
        <Reorder.Group axis="y" values={guildIds} onReorder={setGuildIds}>
          {guildIds?.map((id) => (
            <Reorder.Item key={id} value={id}>
              <DropableGuildCard
                guildData={options.find((option) => id === option.id)}
              />
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </Grid>

      <Button h="10" colorScheme="green" onClick={() => {}}>
        Submit
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

export default PairGame
