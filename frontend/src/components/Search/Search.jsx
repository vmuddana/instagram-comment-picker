import { Flex, Icon, Input, Button, Text, Img, useBreakpointValue, Spinner } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useState } from "react";
import logo from '../../assets/vite.png';

export default function Search({ setPage, searchOnClick, isLoading, package: { setIsLoading, setUser } }) {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  // Regular expression to match Instagram URL pattern
  const instagramUrlPattern = /^(?:https?:\/\/)?(?:www\.)?instagram\.com\/p\/\w+\/?$/i;
  const valid = input.startsWith('@') || instagramUrlPattern.test(input);
  const generalSizingMobile = useBreakpointValue({ base: '80vw', sm: '80vw', md: '300px' })
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  console.log(isLoading)
  return (
    <Flex flexDir='column' align='center' justify='center' gap={'3'}>
      <Flex
        align='center'
        mt='5vh'
        bg='white'
        p='2'
        borderRadius='lg'
        border={isFocused && valid ? '3px solid green' : isFocused && !valid ?  '3px solid orange' : 'none'}
        style={{
          transition: 'border-color 0.3s', // Add a transition for a smooth effect
        }}
      >
        <Img src={logo} w='30px' />
        <Input
          placeholder='Enter @username or Post Link'
          onChange={(e) => setInput(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          focusBorderColor="transparent"
          border='none'
          color={'black'}
          height='20px'
          w={generalSizingMobile}
        />
      </Flex>

      <Button
        onClick={() => {
          if (valid) {
            searchOnClick(input, setIsLoading, setUser, setPage);
          }
        }}
        borderRadius={'100vh'}
        w='150px'
        bg='transparent'
        border='2px solid white'
        p='20px'
        color='white'
        _hover={{ color: "black", background: "white" }}
      >
        {isLoading ? <Spinner /> : <>
        Search
        <span style={{ width: '15px' }}></span>
        <ArrowForwardIcon />
        </>}
      </Button>
      <Text pt='5vh' textAlign={'center'}>
        Formats allowed are @username or https://instagram.com/p/postid
      </Text>
    </Flex >
  );
}