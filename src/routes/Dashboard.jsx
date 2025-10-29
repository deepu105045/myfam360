import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import useUserStore from '../store/useUserStore'
import { listExpenses } from '../utils/firestoreHelper'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const user = useUserStore((s) => s.user)
  const [expenses, setExpenses] = useState([])

  useEffect(() => {
    if (!user) return
    listExpenses(user.uid).then(setExpenses).catch(console.error)
  }, [user])

  return (
    <div>
      <Header />
      <main className="max-w-3xl mx-auto p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Dashboard</h2>
          <Link to="/expenses/add" className="px-3 py-1 bg-sky-600 text-white rounded">Add Expense</Link>
        </div>

        <section>
          <h3 className="text-lg font-medium">Recent expenses</h3>
          <ul className="mt-3 space-y-2">
            {expenses.length === 0 && <li className="text-sm text-slate-500">No expenses yet</li>}
            {expenses.map(e => (
              <li key={e.id} className="p-3 bg-white rounded shadow-sm flex justify-between">
                <div>
                  <div className="font-medium">{e.title || 'Untitled'}</div>
                  <div className="text-sm text-slate-500">{e.note || ''}</div>
                </div>
                <div className="font-semibold">₹{e.amount}</div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  )
}
