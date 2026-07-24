import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Flex, Spinner } from '@chakra-ui/react'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Spinner size="xl" />
      </Flex>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}