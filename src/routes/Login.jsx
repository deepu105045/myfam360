import React from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithGoogle } from '../firebase/config'
import useUserStore from '../store/useUserStore'

export default function Login() {
  const navigate = useNavigate()
  const setUser = useUserStore((s) => s.setUser)

  async function handleGoogle() {
    try {
      const user = await signInWithGoogle()
      setUser({ uid: user.uid, email: user.email, name: user.displayName })
      navigate('/')
    } catch (e) {
      console.error(e)
      alert('Login failed')
    }
  }

  function guestLogin() {
    const guest = { uid: 'guest-' + Date.now(), email: null, name: 'Guest' }
    setUser(guest)
    navigate('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-semibold mb-4">Welcome to myfam360</h1>
        <p className="mb-6 text-sm text-slate-600">Sign in to manage family expenses together.</p>
        <button onClick={handleGoogle} className="w-full mb-3 py-2 rounded bg-sky-600 text-white">Sign in with Google</button>
        <button onClick={guestLogin} className="w-full py-2 rounded border">Continue as guest</button>
      </div>
    </div>
  )
}
