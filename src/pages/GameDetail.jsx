import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  Heading,
  Progress,
  Spinner,
  Text,
  useToast,
  VStack,
  Badge,
} from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { supabase } from '../api/supabase'
import { useAuth } from '../context/AuthContext'

export default function GameDetail() {
  const { gameId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const toast = useToast()

  const [game, setGame] = useState(null)
  const [achievements, setAchievements] = useState([])
  const [completedAchievements, setCompletedAchievements] = useState([])
  const [loading, setLoading] = useState(true)
  const [userGameId, setUserGameId] = useState(null)

  useEffect(() => {
    fetchGameData()
  }, [gameId, user.id])

  const fetchGameData = async () => {
    setLoading(true)

    const { data: gameData } = await supabase
      .from('games')
      .select('*')
      .eq('id', gameId)
      .single()

    setGame(gameData)

    const { data: achievementsData } = await supabase
      .from('achievements')
      .select('*')
      .eq('game_id', gameId)
      .order('sort_order')

    setAchievements(achievementsData || [])

    const { data: userGameData } = await supabase
      .from('user_games')
      .select('id')
      .eq('user_id', user.id)
      .eq('game_id', gameId)
      .single()

    if (userGameData) {
      setUserGameId(userGameData.id)

      const { data: completedData } = await supabase
        .from('user_achievements')
        .select('achievement_id')
        .eq('user_id', user.id)
        .in('achievement_id', (achievementsData || []).map(a => a.id))

      setCompletedAchievements(completedData?.map(c => c.achievement_id) || [])
    }

    setLoading(false)
  }

  const toggleAchievement = async (achievementId) => {
    const isCompleted = completedAchievements.includes(achievementId)

    if (isCompleted) {
      const { error } = await supabase
        .from('user_achievements')
        .delete()
        .eq('user_id', user.id)
        .eq('achievement_id', achievementId)

      if (!error) {
        setCompletedAchievements(prev => prev.filter(id => id !== achievementId))
      }
    } else {
      const { error } = await supabase
        .from('user_achievements')
        .insert([{
          user_id: user.id,
          achievement_id: achievementId,
        }])

      if (!error) {
        setCompletedAchievements(prev => [...prev, achievementId])
      }
    }
  }

  const completionPercentage = achievements.length > 0
    ? Math.round((completedAchievements.length / achievements.length) * 100)
    : 0

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Spinner size="xl" />
      </Flex>
    )
  }

  if (!game) {
    return (
      <Container maxW="container.md" py={10}>
        <Text>Juego no encontrado</Text>
        <Button onClick={() => navigate('/my-games')} mt={4}>
          Volver a mis juegos
        </Button>
      </Container>
    )
  }

  return (
    <Container maxW="container.md" py={6}>
      <VStack spacing={6} align="stretch">
        <Button
          leftIcon={<ArrowBackIcon />}
          variant="ghost"
          alignSelf="flex-start"
          onClick={() => navigate('/my-games')}
        >
          Volver
        </Button>

        {game.cover_url && (
          <Box borderRadius="lg" overflow="hidden" h="300px">
            <img
              src={game.cover_url}
              alt={game.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
        )}

        <Box>
          <Heading size="xl" mb={2}>{game.title}</Heading>
          {game.developer && (
            <Text color="gray.600" mb={2}>{game.developer}</Text>
          )}
          {game.description && (
            <Text color="gray.700">{game.description}</Text>
          )}
        </Box>

        <Box p={4} borderWidth={1} borderRadius="lg" bg="gray.50">
          <Flex justify="space-between" mb={2}>
            <Text fontWeight="bold">Progreso</Text>
            <Text>{completedAchievements.length} / {achievements.length} logros</Text>
          </Flex>
          <Progress
            value={completionPercentage}
            colorScheme="green"
            size="lg"
            borderRadius="full"
          />
          <Text textAlign="center" mt={2} fontWeight="bold" color="green.600">
            {completionPercentage}% completado
          </Text>
        </Box>

        <Box>
          <Heading size="md" mb={4}>Logros ({achievements.length})</Heading>
          <VStack spacing={3} align="stretch">
            {achievements.map(achievement => (
              <Box
                key={achievement.id}
                p={4}
                borderWidth={1}
                borderRadius="md"
                bg={completedAchievements.includes(achievement.id) ? 'green.50' : 'white'}
              >
                <Flex align="start">
                  <Checkbox
                    isChecked={completedAchievements.includes(achievement.id)}
                    onChange={() => toggleAchievement(achievement.id)}
                    colorScheme="green"
                    mr={3}
                    mt={1}
                  />
                  <Box flex={1}>
                    <Flex align="center" gap={2}>
                      <Text fontWeight="bold">{achievement.title}</Text>
                      {achievement.is_hidden && (
                        <Badge colorScheme="gray">Oculto</Badge>
                      )}
                    </Flex>
                    <Text fontSize="sm" color="gray.600">
                      {achievement.description}
                    </Text>
                    {achievement.rarity !== null && (
                      <Text fontSize="xs" color="gray.500" mt={1}>
                        Rareza: {achievement.rarity}% de jugadores
                      </Text>
                    )}
                  </Box>
                </Flex>
              </Box>
            ))}
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}