import React from 'react'
import useUserStore from '../store/useUserStore'
import { signOutUser } from '../firebase/config'
import DarkModeToggle from './DarkModeToggle'

export default function Header() {
  const user = useUserStore((s) => s.user)
  return (
    <header className="p-4 bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-xl font-semibold">myfam360</div>
        </div>
        <div className="flex items-center gap-3">
          <DarkModeToggle />
          <div className="text-sm">{user?.name || user?.email}</div>
          <button className="px-3 py-1 rounded bg-slate-100" onClick={() => signOutUser()}>Sign out</button>
        </div>
      </div>
    </header>
  )
}
