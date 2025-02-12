"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function ReceiptDetails({ receipt }: { receipt: any }) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)

  async function handleDelete() {
    if (confirm("Are you sure you want to delete this receipt?")) {
      setDeleting(true)
      const { error } = await supabase.from("receipts").delete().eq("id", receipt.id)

      if (error) {
        console.error("Error deleting receipt:", error)
        alert("Failed to delete receipt. Please try again.")
      } else {
        router.push("/receipts")
      }
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Receipt Details</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Client Information</h2>
            <p>
              <strong>Name:</strong> {receipt.client_name}
            </p>
            <p>
              <strong>Phone:</strong> {receipt.client_phone}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Prescription</h2>
            <div>
              <h3 className="font-semibold">Right Eye</h3>
              <p>
                SPH: {receipt.prescription.rightEye.sph}, CYL: {receipt.prescription.rightEye.cyl}, AXE:{" "}
                {receipt.prescription.rightEye.axe}
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Left Eye</h3>
              <p>
                SPH: {receipt.prescription.leftEye.sph}, CYL: {receipt.prescription.leftEye.cyl}, AXE:{" "}
                {receipt.prescription.leftEye.axe}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Items</h2>
          <ul className="space-y-2">
            {receipt.items.map((item: any, index: number) => (
              <li key={index} className="flex justify-between">
                <span>
                  {item.name} x{item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Total</h2>
          <p className="text-2xl font-bold">${receipt.total.toFixed(2)}</p>
        </div>
        <div className="mt-6">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:bg-red-300"
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete Receipt"}
          </button>
        </div>
      </div>
    </div>
  )
}

