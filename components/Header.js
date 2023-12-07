// components/Header.js

import {
    Box,
    Flex,
    IconButton,
    useColorMode,
    useColorModeValue,
  } from '@chakra-ui/react';
  import { MoonIcon, SunIcon } from '@chakra-ui/icons';
  
  export default function Header() {
    const { colorMode, toggleColorMode } = useColorMode();
    const SwitchIcon = colorMode === 'light' ? MoonIcon : SunIcon;
  
    return (
      <Flex as="nav" align="center" justify="space-between" padding="3" bg={useColorModeValue('gray.100', 'gray.900')} color={useColorModeValue('gray.600', 'white')}>
        {/* Logo or Title */}
        <Box>ArtNode</Box>
  
        {/* 3 items at the top:  About, Project, Docs.  Projects should have a dropdown for 2 different projects */}
        {/* Dark Mode Switch */}
        <IconButton
          aria-label="Toggle dark mode"
          icon={<SwitchIcon />}
          onClick={toggleColorMode}
        />
      </Flex>
    );
  }
  