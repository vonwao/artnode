import React, { useEffect, useState } from 'react';
import { render } from '../tiny-dinos/render';
import { Box, Flex, Button, Input, Text } from "@chakra-ui/react";

const HomePage = () => {
  const [tokenId, setTokenId] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const [svgContent, setSvgContent] = useState('');
  const [traits, setTraits] = useState('');
  const [showJson, setShowJson] = useState(false);

  useEffect(() => {
    const [traits, svg] = render(tokenId);
    setSvgContent(svg);
    setTraits(traits);
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight') handleTokenChange(1);
      if (e.key === 'ArrowLeft') handleTokenChange(-1);
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [tokenId]);

  const handleTokenChange = (change) => {
    setTokenId(prev => Math.max(1, prev + change));
    setInputValue('');
  };

  const toggleJsonDisplay = () => {
    setShowJson(!showJson);
  };

  return (
    <Flex direction="column" align="center" justify="center" height="100vh">
      <Box border="1px" borderColor="black" width="200px" height="200px" mb="4" dangerouslySetInnerHTML={{ __html: svgContent }} />
      
      <Flex justify="space-between" width="200px" mb="4">
        <Text mr="4">Tiny Dino #{tokenId}</Text>
        <Box>
          <Button onClick={() => handleTokenChange(-1)} size="md">&lt;</Button>
          <Button onClick={() => handleTokenChange(1)} size="md">&gt;</Button>
        </Box>
      </Flex>

      <Flex mb="4">
        <Input
          type="number"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          width="80px"
          mr="2"
        />
        <Button onClick={() => { setTokenId(Number(inputValue) || tokenId); setInputValue(''); }} size="md">Go</Button>
      </Flex>

      <Box>
        <Button onClick={toggleJsonDisplay} size="md">{showJson ? 'Hide JSON' : 'Show JSON'}</Button>
        {showJson && <pre style={{ textAlign: 'left' }}>{JSON.stringify(traits, null, 2)}</pre>}
      </Box>
    </Flex>
  );
};

export default HomePage;
