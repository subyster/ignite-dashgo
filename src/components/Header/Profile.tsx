import { Avatar, Box, Flex, Text } from "@chakra-ui/react"

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData }: ProfileProps) {
  return (
    <Flex align="center">
      { showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Arthur Amaral</Text>
          <Text color="gray.300" fontSize="small">
            arthur.amaral1@gmail.com
          </Text>
        </Box>
      )}

      <Avatar size="md" name="Arthur Amaral" />
    </Flex>
  );
}