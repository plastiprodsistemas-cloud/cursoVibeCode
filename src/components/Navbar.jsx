import { Link, useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
} from '@chakra-ui/react'
import { HamburgerIcon, SearchIcon, StarIcon } from '@chakra-ui/icons'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const bg = useColorModeValue('gray.100', 'gray.900')

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <Box bg={bg} px={4} boxShadow="sm">
      <Container maxW="container.xl">
        <Flex h={16} align="center" justify="space-between">
          <Heading
            size="md"
            as={Link}
            to="/"
            _hover={{ textDecoration: 'none' }}
            color="blue.500"
          >
            🎮 Achievement Hub
          </Heading>

          {user && (
            <HStack spacing={4}>
              <Button
                as={Link}
                to="/my-games"
                leftIcon={<StarIcon />}
                variant="ghost"
                size="sm"
              >
                Mis Juegos
              </Button>
              <Button
                as={Link}
                to="/search"
                leftIcon={<SearchIcon />}
                variant="ghost"
                size="sm"
              >
                Buscar
              </Button>
              <Menu>
                <MenuButton
                  as={Button}
                  size="sm"
                  colorScheme="blue"
                >
                  {user.username}
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          )}
        </Flex>
      </Container>
    </Box>
  )
}