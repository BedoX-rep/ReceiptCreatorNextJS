"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

export default function ReceiptList() {
  const [receipts, setReceipts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchReceipts()

    const channel = supabase
      .channel('receipts_channel')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'receipts' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setReceipts(prev => [payload.new, ...prev])
          } else if (payload.eventType === 'DELETE') {
            setReceipts(prev => prev.filter(receipt => receipt.id !== payload.old.id))
          } else if (payload.eventType === 'UPDATE') {
            setReceipts(prev => prev.map(receipt =>
              receipt.id === payload.new.id ? payload.new : receipt
            ))
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  async function fetchReceipts() {
    setLoading(true)
    setError(null)
    const { data, error } = await supabase.from("receipts").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching receipts:", error)
      setError("Failed to fetch receipts. Please try again.")
    } else {
      setReceipts(data || [])
    }
    setLoading(false)
  }

  if (loading) {
    return <div className="text-center">Loading receipts...</div>
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  return (
    <div className="space-y-4">
      {receipts.length === 0 ? (
        <p>No receipts found.</p>
      ) : (
        receipts.map((receipt) => (
          <Link href={`/receipts/${receipt.id}`} key={receipt.id}>
            <div className="bg-white p-4 rounded shadow hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">{receipt.client_name}</h2>
                <span>{new Date(receipt.created_at).toLocaleDateString()}</span>
              </div>
              <p>Phone: {receipt.client_phone}</p>
              <p>Total: ${receipt.total.toFixed(2)}</p>
            </div>
          </Link>
        ))
      )}
    </div>
  )
}