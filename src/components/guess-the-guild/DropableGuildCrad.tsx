import {
  Circle,
  SimpleGrid,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  VStack,
  Wrap,
  useColorModeValue,
} from "@chakra-ui/react"
import DisplayCard from "components/common/DisplayCard"
import GuildLogo from "components/common/GuildLogo"
import { motion } from "framer-motion"
import { Users } from "phosphor-react"
import { useState } from "react"
import { GuildBase } from "types"
import pluralize from "utils/pluralize"
import { Guess } from "./hooks/useDragAndDrop"

type Props = {
  guildData: GuildBase
  onDragOver: () => void
  solution: Guess[]
}

const DropableGuildCard = ({
  guildData,
  onDragOver,
  solution,
}: Props): JSX.Element => {
  const border = useColorModeValue("blackAlpha.500", "whiteAlpha.500")
  const [hover, setHover] = useState(false)

  const guess = solution.find((item) => item.row.id === guildData.id)

  return (
    <motion.div
      onDragOver={() => {
        onDragOver()
        setHover(true)
      }}
      onDragLeave={() => setHover(false)}
    >
      <DisplayCard>
        <SimpleGrid
          templateColumns={"3rem calc(100% - 4.25rem)"}
          gap={4}
          alignItems="center"
        >
          {guess ? (
            <GuildLogo imageUrl={guess.guess.imageUrl} />
          ) : (
            <Circle
              size={"3rem"}
              __css={{
                borderWidth: "2px",
                borderColor: hover ? "purple.500" : border,
                borderStyle: "dashed",
              }}
            />
          )}
          <VStack spacing={2} alignItems="start" w="full" maxW="full" mb="1" mt="-1">
            <Text
              as="span"
              fontFamily="display"
              fontSize="xl"
              fontWeight="bold"
              letterSpacing="wide"
              maxW="full"
              noOfLines={1}
              color={hover ? "purple.500" : "inherit"}
            >
              {guildData.name}
            </Text>
            <Wrap zIndex="1">
              <Tag as="li">
                <TagLeftIcon as={Users} />
                <TagLabel>
                  {new Intl.NumberFormat("en", { notation: "compact" }).format(
                    guildData.memberCount ?? 0
                  )}
                </TagLabel>
              </Tag>
              <Tag as="li">
                <TagLabel>{pluralize(guildData.rolesCount ?? 0, "role")}</TagLabel>
              </Tag>
            </Wrap>
          </VStack>
        </SimpleGrid>
      </DisplayCard>
    </motion.div>
  )
}

export default DropableGuildCard
