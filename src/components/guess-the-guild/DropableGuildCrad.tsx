import {
  Flex,
  Grid,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  VStack,
  Wrap,
  useColorModeValue,
} from "@chakra-ui/react"
import DisplayCard from "components/common/DisplayCard"
import { CheckCircle, DotsSixVertical, Users, XCircle } from "phosphor-react"
import { GuildBase } from "types"
import pluralize from "utils/pluralize"

type Props = {
  guildData: GuildBase
  showAnswer: boolean
  isCorrect: boolean
}

const DropableGuildCard = ({
  guildData,
  showAnswer,
  isCorrect,
}: Props): JSX.Element => {
  const background = useColorModeValue("blackAlpha.100", "whiteAlpha.100")

  return (
    <DisplayCard
      shadow="none"
      bg={background}
      borderLeftRadius={{ base: "none", sm: "none" }}
      mb={2}
      cursor="grab"
      pr={{ base: 3, md: 3 }}
    >
      <Grid templateColumns={"7fr 1fr"} gap={4} alignItems="center">
        <VStack spacing={2} alignItems="start" w="full" maxW="full" mb="1" mt="-1">
          <Text
            as="span"
            fontFamily="display"
            fontSize="xl"
            fontWeight="bold"
            letterSpacing="wide"
            maxW="full"
            noOfLines={1}
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
        <Flex justifyContent={"flex-end"}>
          {showAnswer ? (
            isCorrect ? (
              <Text color="green.400">
                <CheckCircle size={32} />
              </Text>
            ) : (
              <Text color="red.400">
                <XCircle size={32} />
              </Text>
            )
          ) : (
            <DotsSixVertical size={32} />
          )}
        </Flex>
      </Grid>
    </DisplayCard>
  )
}

export default DropableGuildCard
