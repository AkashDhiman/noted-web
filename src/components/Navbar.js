import React,{useContext} from 'react';
import {auth} from '../utils/firebase'
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Image,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
  FormControl,
  Input,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';
import { makeDiary } from '../utils/firebase';
import logo from '../static/logo.png';
import {UserContext} from '../providers/UserProvider'
const links = [];

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('green.200', 'green.700'),
    }}
    href={'#'}
  >
    {children}
  </Link>
);

export default function Navbar({ minW, maxW, toggleAuth, setJournal,currDiary,setCurrentDiary }) {
  const [user] = useContext(UserContext)
  const uid=user.data.uid
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isAddingJournal, setIsAddingJournal] = React.useState(false);
  const [textBox,setTextBox]=React.useState('')
  console.log(user)

  const submitHandler=async ()=>{
    var newDiary=await makeDiary(textBox,uid)
    var newDiaryName=newDiary
    newDiary={id:Math.random(),name:newDiaryName}
    console.log(newDiary)
    setJournal((prevState) => [...prevState, newDiary]);
    setTextBox('')
    setCurrentDiary(newDiaryName)
  }

  return (
    <>
      <Box bg={'#edf2f7'} px={4} minW={minW} maxW={maxW} boxShadow={'md'}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box size={'sm'}>
              <Image boxSize={'50px'} src={logo} borderRadius={'full'} />
            </Box>
            <Text color={'green.400'} fontSize={'xl'} fontWeight={'bold'}>
              Noted:
            </Text>
            <Text color={'green.400'} fontSize={'l'} fontWeight={'bold'}>
              {currDiary}
            </Text>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            {isAddingJournal ? (
              <>
                <FormControl id="journalName" mr={4}>
                  <Input type="text" name="diaryName" 
                  onChange={event => {
                    console.log(event.currentTarget.value)
                    setTextBox(event.currentTarget.value)}}/>
                </FormControl>
                <Button
                  mr={4}
                  variant={'solid'}
                  bg={'green.400'}
                  _hover={{
                    bg: 'green.500',
                  }}
                  color={'white'}
                  size={'sm'}
                  onClick={submitHandler}
                >
                  Add
                </Button>
                <Button
                  mr={4}
                  variant={'solid'}
                  bg={'red.400'}
                  _hover={{
                    bg: 'red.500',
                  }}
                  color={'white'}
                  size={'sm'}
                  onClick={() => setIsAddingJournal((prevState) => !prevState)}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                variant={'solid'}
                bg={'green.400'}
                _hover={{
                  bg: 'green.500',
                }}
                color={'white'}
                size={'sm'}
                mr={4}
                leftIcon={<AddIcon />}
                onClick={() => setIsAddingJournal(true)}
              >
                Add Journal
              </Button>
            )}
            <Button
              variant={'solid'}
              bg={'red.400'}
              _hover={{
                bg: 'red.500',
              }}
              color={'white'}
              size={'sm'}
              mr={4}
              p={4}
              onClick={()=>{auth.signOut()}}
            >
              Log Out
            </Button>
            <Text color={'green.400'} fontSize={'sm'} paddingRight={'3px'} >
              {user.data.name}
            </Text>
            <Avatar size={'sm'} />
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
