"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function ProductForm() {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const { error } = await supabase.from("products").insert({ name, price: Number.parseFloat(price) })

    if (error) {
      console.error("Error adding product:", error)
    } else {
      setName("")
      setPrice("")
      // You might want to trigger a refresh of the product list here
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold mb-2">Add New Product</h2>
      <div>
        <label htmlFor="name" className="block mb-1">
          Product Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="price" className="block mb-1">
          Price
        </label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 border rounded"
          step="0.01"
          min="0"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Add Product
      </button>
    </form>
  )
}

