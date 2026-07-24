import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
  useToast,
  VStack,
  Select,
  Button,
  Badge,
  IconButton,
  Progress,
} from '@chakra-ui/react'
import { StarIcon, DeleteIcon } from '@chakra-ui/icons'
import { supabase } from '../api/supabase'
import { useAuth } from '../context/AuthContext'

export default function MyGames() {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const { user } = useAuth()
  const toast = useToast()

  useEffect(() => {
    fetchMyGames()
  }, [filter, sortBy])

  const fetchMyGames = async () => {
    setLoading(true)

    const { data: userGames, error } = await supabase
      .from('user_games')
      .select(`
        id,
        status,
        is_favorite,
        playtime_hours,
        games (
          id,
          title,
          cover_url,
          developer,
          total_achievements
        )
      `)
      .eq('user_id', user.id)

    if (error) {
      setLoading(false)
      return
    }

    const gamesWithProgress = await Promise.all(
      (userGames || []).map(async (ug) => {
        const { count: totalAchievements } = await supabase
          .from('achievements')
          .select('*', { count: 'exact', head: true })
          .eq('game_id', ug.games?.id)

        const { count: completedAchievements } = await supabase
          .from('user_achievements')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .in('achievement_id',
            (await supabase
              .from('achievements')
              .select('id')
              .eq('game_id', ug.games?.id)
            ).data?.map(a => a.id) || []
          )

        const percentage = totalAchievements > 0
          ? Math.round((completedAchievements / totalAchievements) * 100)
          : 0

        let autoStatus = 'not_started'
        if (percentage === 100) autoStatus = 'completed'
        else if (percentage > 0) autoStatus = 'in_progress'

        if (autoStatus !== ug.status) {
          await supabase
            .from('user_games')
            .update({ status: autoStatus })
            .eq('id', ug.id)
        }

        return {
          ...ug,
          status: autoStatus,
          percentage,
          completedAchievements,
          totalAchievements,
        }
      })
    )

    let filtered = gamesWithProgress

    if (filter === 'favorites') {
      filtered = filtered.filter(g => g.is_favorite)
    } else if (filter === 'in_progress') {
      filtered = filtered.filter(g => g.status === 'in_progress')
    } else if (filter === 'completed') {
      filtered = filtered.filter(g => g.status === 'completed')
    } else if (filter === 'not_started') {
      filtered = filtered.filter(g => g.status === 'not_started')
    }

    if (sortBy === 'name') {
      filtered.sort((a, b) => (a.games?.title || '').localeCompare(b.games?.title || ''))
    } else if (sortBy === 'recent') {
      filtered.sort((a, b) => new Date(b.added_at) - new Date(a.added_at))
    } else if (sortBy === 'percentage') {
      filtered.sort((a, b) => b.percentage - a.percentage)
    }

    setGames(filtered)
    setLoading(false)
  }

  const toggleFavorite = async (userGameId, currentStatus) => {
    const { error } = await supabase
      .from('user_games')
      .update({ is_favorite: !currentStatus })
      .eq('id', userGameId)

    if (!error) fetchMyGames()
  }

  const removeFromList = async (userGameId) => {
    const { error } = await supabase
      .from('user_games')
      .delete()
      .eq('id', userGameId)

    if (!error) {
      toast({ title: 'Juego eliminado', status: 'info', duration: 2000 })
      fetchMyGames()
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'green'
      case 'in_progress': return 'blue'
      default: return 'gray'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Completado'
      case 'in_progress': return 'En progreso'
      default: return 'Sin empezar'
    }
  }

  const getProgressColor = (percentage) => {
    if (percentage === 100) return 'green'
    if (percentage >= 50) return 'blue'
    if (percentage > 0) return 'yellow'
    return 'gray'
  }

  return (
    <Container maxW="container.xl" py={6}>
      <VStack spacing={6} align="stretch">
        <Flex justify="space-between" align="center">
          <Heading size="lg">Mis Juegos</Heading>
          <Button as={Link} to="/search" colorScheme="blue">
            + Agregar Juego
          </Button>
        </Flex>

        <Flex gap={4} flexWrap="wrap">
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            w="200px"
          >
            <option value="all">Todos</option>
            <option value="favorites">Favoritos</option>
            <option value="in_progress">En progreso</option>
            <option value="completed">Completados</option>
            <option value="not_started">Sin empezar</option>
          </Select>

          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            w="200px"
          >
            <option value="name">Ordenar por nombre</option>
            <option value="percentage">Ordenar por progreso</option>
            <option value="recent">Más recientes</option>
          </Select>
        </Flex>

        {loading ? (
          <Flex justify="center" py={10}>
            <Spinner size="xl" />
          </Flex>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={6}>
            {games.map(({ id, games: game, status, is_favorite, percentage, completedAchievements, totalAchievements }) => (
              <Box
                key={id}
                borderWidth={1}
                borderRadius="lg"
                overflow="hidden"
                boxShadow="md"
                _hover={{ boxShadow: 'lg' }}
                transition="all 0.2s"
              >
                {game?.cover_url && (
                  <Box h="180px" bg="gray.100">
                    <img
                      src={game.cover_url}
                      alt={game.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </Box>
                )}
                <Box p={4}>
                  <Flex justify="space-between" align="start">
                    <Box flex={1}>
                      <Heading size="sm" mb={1}>
                        {game?.title || 'Juego desconocido'}
                      </Heading>
                      {game?.developer && (
                        <Text fontSize="xs" color="gray.600" mb={2}>
                          {game.developer}
                        </Text>
                      )}
                    </Box>
                    <IconButton
                      icon={<StarIcon />}
                      size="sm"
                      colorScheme={is_favorite ? 'yellow' : 'gray'}
                      variant={is_favorite ? 'solid' : 'outline'}
                      onClick={() => toggleFavorite(id, is_favorite)}
                      aria-label="Favorito"
                    />
                  </Flex>

                  <Flex gap={2} mb={2}>
                    <Badge colorScheme={getStatusColor(status)}>
                      {getStatusText(status)}
                    </Badge>
                    <Badge colorScheme={getProgressColor(percentage)}>
                      {percentage}%
                    </Badge>
                  </Flex>

                  {totalAchievements > 0 && (
                    <Text fontSize="xs" color="gray.500" mb={2}>
                      {completedAchievements}/{totalAchievements} logros
                    </Text>
                  )}

                  <Progress
                    value={percentage}
                    size="sm"
                    colorScheme={getProgressColor(percentage)}
                    borderRadius="full"
                    mb={3}
                  />

                  <Flex gap={2}>
                    <Button
                      as={Link}
                      to={`/game/${game?.id}`}
                      size="sm"
                      colorScheme="blue"
                      flex={1}
                    >
                      Ver Detalles
                    </Button>
                    <IconButton
                      icon={<DeleteIcon />}
                      size="sm"
                      colorScheme="red"
                      variant="outline"
                      onClick={() => removeFromList(id)}
                      aria-label="Eliminar"
                    />
                  </Flex>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        )}

        {!loading && games.length === 0 && (
          <Box textAlign="center" py={10}>
            <Text color="gray.500" mb={4}>
              No tienes juegos en tu lista aún
            </Text>
            <Button as={Link} to="/search" colorScheme="blue">
              Buscar juegos para agregar
            </Button>
          </Box>
        )}
      </VStack>
    </Container>
  )
}