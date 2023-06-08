import { Flex, Text, useColorMode } from "@chakra-ui/react"
import ColorCard from "components/common/ColorCard/ColorCard"
import { MaskSad } from "phosphor-react"

const NoGuilds = (): JSX.Element => {
  const { colorMode } = useColorMode()

  return (
    <ColorCard color="transparent" colorMode={colorMode} w="full">
      <Flex
        direction={"column"}
        alignItems={"center"}
        h="full"
        justifyContent="center"
        gap={2}
        pb={2}
      >
        <MaskSad size={32} />
        <Text>Guilds are not available yet</Text>
      </Flex>
    </ColorCard>
  )
}

export default NoGuilds
