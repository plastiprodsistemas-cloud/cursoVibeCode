import { useState, useEffect, useCallback } from 'react'
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Spinner,
  Text,
  useToast,
  VStack,
  Select,
  Badge,
} from '@chakra-ui/react'
import { SearchIcon, AddIcon } from '@chakra-ui/icons'
import { supabase } from '../api/supabase'
import { useAuth } from '../context/AuthContext'

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('')
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(false)
  const [platforms, setPlatforms] = useState([])
  const [selectedPlatform, setSelectedPlatform] = useState('')
  const { user } = useAuth()
  const toast = useToast()

  useEffect(() => {
    fetchPlatforms()
    fetchGames()
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchGames(searchTerm)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm, selectedPlatform])

  const fetchPlatforms = async () => {
    const { data } = await supabase.from('platforms').select('*')
    if (data) setPlatforms(data)
  }

  const fetchGames = async (term = '') => {
    setLoading(true)
    let query = supabase.from('games').select('*')

    if (term) {
      query = query.ilike('title', `%${term}%`)
    }

    if (selectedPlatform) {
      query = query.eq('game_platforms.platform_id', selectedPlatform)
    }

    const { data, error } = await query.limit(20)
    if (!error) setGames(data || [])
    setLoading(false)
  }

  const addToMyGames = async (gameId) => {
    try {
      const { error } = await supabase.from('user_games').insert([{
        user_id: user.id,
        game_id: gameId,
        status: 'not_started',
      }])

      if (error) throw error

      toast({
        title: 'Juego agregado!',
        status: 'success',
        duration: 2000,
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Este juego ya está en tu lista',
        status: 'warning',
        duration: 3000,
      })
    }
  }

  return (
    <Container maxW="container.xl" py={6}>
      <VStack spacing={6} align="stretch">
        <Heading size="lg">Buscar Juegos</Heading>

        <Flex gap={4}>
          <InputGroup flex={1}>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Escribe para buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
          <Select
            placeholder="Todas las plataformas"
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            w="200px"
          >
            {platforms.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </Select>
        </Flex>

        {loading ? (
          <Flex justify="center" py={10}>
            <Spinner size="xl" />
          </Flex>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {games.map(game => (
              <Box
                key={game.id}
                borderWidth={1}
                borderRadius="lg"
                overflow="hidden"
                boxShadow="md"
                _hover={{ boxShadow: 'lg', transform: 'translateY(-2px)' }}
                transition="all 0.2s"
              >
                {game.cover_url && (
                  <Box h="200px" bg="gray.100">
                    <img
                      src={game.cover_url}
                      alt={game.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </Box>
                )}
                <Box p={4}>
                  <Heading size="md" mb={2}>{game.title}</Heading>
                  {game.developer && (
                    <Text fontSize="sm" color="gray.600" mb={2}>
                      {game.developer}
                    </Text>
                  )}
                  {game.total_achievements > 0 && (
                    <Badge colorScheme="purple" mb={2}>
                      {game.total_achievements} logros
                    </Badge>
                  )}
                  <Button
                    leftIcon={<AddIcon />}
                    colorScheme="green"
                    size="sm"
                    w="100%"
                    mt={2}
                    onClick={() => addToMyGames(game.id)}
                  >
                    Agregar a mi lista
                  </Button>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        )}

        {!loading && games.length === 0 && (
          <Box textAlign="center" py={10}>
            <Text color="gray.500">No se encontraron juegos</Text>
          </Box>
        )}
      </VStack>
    </Container>
  )
}