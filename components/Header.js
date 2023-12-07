import {
  Box,
  Flex,
  IconButton,
  useColorMode,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const SwitchIcon = colorMode === 'light' ? MoonIcon : SunIcon;

  const router = useRouter();
  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <Flex as="nav" align="center" justify="space-between" padding="2" bg={useColorModeValue('gray.100', 'gray.900')} color={useColorModeValue('gray.600', 'white')}>
      {/* Logo or Title */}
      <Box>ArtNode</Box>

      {/* Menu Items */}
      <Flex align="center">
        <Menu>
          <MenuButton as={Button} variant="ghost">
            Tools
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => handleNavigation('schema')}>
              schema
            </MenuItem>
            <MenuItem onClick={() => handleNavigation('/dinoVectors')}>
              vectors
            </MenuItem>
          </MenuList>
        </Menu>

        {/* Dark Mode Switch */}
        <IconButton
          aria-label="Toggle dark mode"
          icon={<SwitchIcon />}
          onClick={toggleColorMode}
          ml="2" // Added margin left
        />
      </Flex>
    </Flex>
  );
}
