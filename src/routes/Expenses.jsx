import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import useUserStore from '../store/useUserStore'
import { listExpenses } from '../utils/firestoreHelper'

export default function Expenses() {
  const user = useUserStore((s) => s.user)
  const [items, setItems] = useState([])

  useEffect(() => {
    if (!user) return
    listExpenses(user.uid).then(setItems).catch(console.error)
  }, [user])

  return (
    <div>
      <Header />
      <main className="max-w-3xl mx-auto p-4">
        <h2 className="text-xl font-semibold mb-4">All expenses</h2>
        <ul className="space-y-2">
          {items.map(i => (
            <li key={i.id} className="p-3 bg-white rounded shadow-sm flex justify-between">
              <div>
                <div className="font-medium">{i.title}</div>
                <div className="text-sm text-slate-500">{i.note}</div>
              </div>
              <div className="font-semibold">₹{i.amount}</div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
