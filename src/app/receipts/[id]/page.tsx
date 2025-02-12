import { supabase } from "@/lib/supabase"
import ReceiptDetails from "./ReceiptDetails"

export default async function ReceiptPage({ params }: { params: { id: string } }) {
  const { data: receipt, error } = await supabase.from("receipts").select("*").eq("id", params.id).single()

  if (error) {
    return <div className="text-center text-red-500">Failed to load receipt. Please try again.</div>
  }

  if (!receipt) {
    return <div className="text-center">Receipt not found.</div>
  }

  return <ReceiptDetails receipt={receipt} />
}

