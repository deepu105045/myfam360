import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './routes/Login'
import Dashboard from './routes/Dashboard'
import Expenses from './routes/Expenses'
import AddExpense from './routes/AddExpense'
import ProtectedRoute from './components/ProtectedRoute'
import { initFirebaseAuthListener } from './firebase/config'

export default function App() {
  useEffect(() => {
    const unsubscribe = initFirebaseAuthListener()
    return () => unsubscribe && unsubscribe()
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/expenses" element={<ProtectedRoute><Expenses /></ProtectedRoute>} />
        <Route path="/expenses/add" element={<ProtectedRoute><AddExpense /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}
