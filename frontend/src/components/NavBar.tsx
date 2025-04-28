import { Container, HStack, Flex, Avatar, Stack, Text, Tabs, IconButton, Button, AbsoluteCenter, Link as ChakraLink } from '@chakra-ui/react';
import { MdNotes } from "react-icons/md";
import { FaDumbbell } from "react-icons/fa6";
import { GiWeightLiftingUp } from "react-icons/gi";
import { BsCalendar3Week } from "react-icons/bs";
import { IoMoon, IoSettingsSharp } from "react-icons/io5";
import { useColorMode } from './ui/color-mode';
import { LuSun } from 'react-icons/lu';
import { Link as ReactRouterLink } from 'react-router-dom';
import './NavBar.css'


const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode(); // this is a hook from chakraUI

  return (
    <Container>
      <Flex
        h={32}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base:"column",
          sm:"row"
        }}
      >
        {/* Section for avatar display */}
        <Stack gap="8">
          <HStack key={"rylan51402@gmail.com"} gap="4">
            <Avatar.Root>
              <Avatar.Fallback name={"Rylan"} />
              <Avatar.Image src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQudP1MDYkN_zh3qKPTPDKnFUWT48zmtrTldg&s"} />
            </Avatar.Root>
            <Stack gap="0">
              <Text fontWeight="medium">{"Rylan"}</Text>
              <Text color="fg.muted" textStyle="sm">
                {"rylan51402@gmail.com"}
              </Text>
            </Stack>
          </HStack>
        </Stack>

        {/* Section for tabs */}
        <AbsoluteCenter axis={"horizontal"}>
          <Tabs.Root key={"enclosed"} defaultValue="exercises" variant={"enclosed"}>
            <Tabs.List>
              <Tabs.Trigger value="exercises" asChild>
                <ChakraLink unstyled asChild variant={"plain"}>
                  <ReactRouterLink to="/exercises" className='tabs'><FaDumbbell />Exercises</ReactRouterLink>
                </ChakraLink>
              </Tabs.Trigger>
              <Tabs.Trigger value="workouts" asChild>
                <ChakraLink unstyled asChild variant={"plain"}>
                  <ReactRouterLink to="/workouts" className='tabs'><GiWeightLiftingUp />Workouts</ReactRouterLink>
                </ChakraLink>
              </Tabs.Trigger>
              <Tabs.Trigger value="plans" asChild>
                <ChakraLink unstyled asChild variant={"plain"}>
                  <ReactRouterLink to="/plans" className='tabs'><MdNotes />Plans</ReactRouterLink>
                </ChakraLink>
              </Tabs.Trigger>
              <Tabs.Trigger value="calendar" asChild>
                <ChakraLink unstyled asChild variant={"plain"}>
                  <ReactRouterLink to="/calendar" className='tabs'><BsCalendar3Week />Calendar</ReactRouterLink>
                </ChakraLink>
              </Tabs.Trigger>
              <Tabs.Indicator rounded={12}/>
            </Tabs.List>
          </Tabs.Root>
        </AbsoluteCenter>

        {/* Section for the settings Icon Button */}
        <HStack>
          <IconButton>
            <IoSettingsSharp />
          </IconButton>
          <Button onClick={toggleColorMode}>{colorMode === "light" ? <IoMoon /> : <LuSun />}</Button>
        </HStack>
      </Flex>
    </Container>
  )
}

export default NavBar;