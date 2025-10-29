import { db } from '../firebase/config'
import { collection, addDoc, getDocs } from 'firebase/firestore'

function prefixPath(...parts) {
  const env = import.meta.env.VITE_ENV || 'dev'
  const base = `fam360/${env}`
  return [base, ...parts].join('/')
}

export async function addExpense(familyId, expense) {
  const collRef = collection(db, `${prefixPath('families')}/${familyId}/expenses`)
  return await addDoc(collRef, { ...expense, createdAt: Date.now() })
}

export async function listExpenses(familyId) {
  const collRef = collection(db, `${prefixPath('families')}/${familyId}/expenses`)
  const snaps = await getDocs(collRef)
  return snaps.docs.map(d => ({ id: d.id, ...d.data() }))
}
