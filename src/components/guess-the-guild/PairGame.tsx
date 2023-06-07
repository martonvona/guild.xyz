import { Card, Heading, SimpleGrid, useColorMode } from "@chakra-ui/react"
import Button from "components/common/Button"
import ColorCard from "components/common/ColorCard/ColorCard"
import GuildLogo from "components/common/GuildLogo"
import { motion } from "framer-motion"
import image from "next/image"
import { GuildBase } from "types"
import DropableGuildCard from "./DropableGuildCrad"
import usePairGame from "./hooks/usePairGame"

type Props = {
  guilds: GuildBase[]
}

const PairGame = ({ guilds }: Props): JSX.Element => {
  const { colorMode } = useColorMode()
  const {
    onDragStart,
    onDragEnd,
    check,
    onDragOver,
    logos,
    rows,
    removeLogo,
    solution,
    reset,
  } = usePairGame(guilds)

  return (
    <ColorCard color="transparent" colorMode={colorMode} w="fit-content">
      <Heading as="h2" size="md" mb={4}>
        Pair the logos to their guilds
      </Heading>
      <Card
        align={"center"}
        justify={"center"}
        direction={"row"}
        gap={3}
        p={4}
        shadow={"none"}
      >
        {logos.map((guild) => (
          <motion.div
            drag
            key={guild.imageUrl}
            draggable
            onDragStartCapture={() => onDragStart(guild)}
            onDragEnd={() => {
              onDragEnd()
              removeLogo(guild)
            }}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          >
            {image && <GuildLogo imageUrl={guild.imageUrl} />}
          </motion.div>
        ))}
      </Card>
      <SimpleGrid spacing={2}>
        {rows.map((guild) => (
          <DropableGuildCard
            solution={solution}
            key={guild.id}
            guildData={guild}
            onDragOver={() => onDragOver(guild)}
          />
        ))}
      </SimpleGrid>
      <SimpleGrid spacing={2} columns={2} pt={5}>
        <Button
          h="10"
          colorScheme="purple"
          onClick={() => {
            reset()
          }}
        >
          Reset
        </Button>
        <Button
          h="10"
          colorScheme="green"
          onClick={() => {
            console.log(check())
          }}
        >
          Submit
        </Button>
      </SimpleGrid>
    </ColorCard>
  )
}

export default PairGame
