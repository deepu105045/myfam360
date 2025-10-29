import React, { useState } from 'react'
import Header from '../components/Header'
import useUserStore from '../store/useUserStore'
import { addExpense } from '../utils/firestoreHelper'
import { useNavigate } from 'react-router-dom'

export default function AddExpense() {
  const user = useUserStore((s) => s.user)
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    if (!user) return alert('not logged in')
    await addExpense(user.uid, { title, amount: Number(amount), note })
    navigate('/')
  }

  return (
    <div>
      <Header />
      <main className="max-w-3xl mx-auto p-4">
        <h2 className="text-xl font-semibold mb-4">Add Expense</h2>
        <form onSubmit={handleSubmit} className="space-y-3 bg-white p-4 rounded shadow">
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
          <input value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount" type="number" className="w-full p-2 border rounded" />
          <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Note" className="w-full p-2 border rounded" />
          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 bg-sky-600 text-white rounded">Save</button>
            <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 border rounded">Cancel</button>
          </div>
        </form>
      </main>
    </div>
  )
}
