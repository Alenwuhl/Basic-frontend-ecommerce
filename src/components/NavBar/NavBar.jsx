import React from 'react'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Box,
    Flex,
    IconButton,
    Text,
} from '@chakra-ui/react'
import { FaRegUserCircle } from "react-icons/fa";
import { BsFillGridFill } from "react-icons/bs";
import { GiBearFace } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import CartWidget from '../Cart/CartWidget';

const NavBar = () => {
    return (
        <Box bg="gray.100" px={4} py={2} shadow="md">
            <Flex alignItems="center" justifyContent="space-between">
                <Link to={"/"}>
                    <Flex alignItems="center">
                        <GiBearFace size={30} />
                        <Text ml={2} fontWeight="bold" fontSize="lg">
                            Bear-uy
                        </Text>
                    </Flex>
                </Link>

                <Flex alignItems="center" justifyContent="center" flex="1">
                    <Menu>
                        <MenuButton as={IconButton} icon={<BsFillGridFill />} variant="ghost" />
                        <MenuList>
                            <MenuItem as={Link} to="CurrentUser">
                                <FaRegUserCircle /> User
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>

                <Link to="/cart">
                    <IconButton
                        icon={<CartWidget />}
                        variant="ghost"
                        aria-label="Cart"
                    />
                </Link>
            </Flex>
        </Box>
    )
}

export default NavBar
