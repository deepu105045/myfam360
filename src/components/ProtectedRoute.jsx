import React from 'react'
import { Navigate } from 'react-router-dom'
import useUserStore from '../store/useUserStore'

export default function ProtectedRoute({ children }) {
  const user = useUserStore((s) => s.user)
  if (!user) {
    return <Navigate to="/login" replace />
  }
  return children
}
