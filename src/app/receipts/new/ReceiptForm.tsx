"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import type React from "react" // Added import for React

export default function ReceiptForm() {
  const router = useRouter()
  const [products, setProducts] = useState<any[]>([])
  const [selectedProducts, setSelectedProducts] = useState<any[]>([])
  const [clientName, setClientName] = useState("")
  const [clientPhone, setClientPhone] = useState("")
  const [prescription, setPrescription] = useState({
    rightEye: { sph: "", cyl: "", axe: "" },
    leftEye: { sph: "", cyl: "", axe: "" },
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    setLoading(true)
    setError(null)
    const { data, error } = await supabase.from("products").select("*").order("name")

    if (error) {
      console.error("Error fetching products:", error)
      setError("Failed to fetch products. Please try again.")
    } else {
      setProducts(data || [])
    }
    setLoading(false)
  }

  function addProduct(productId: number) {
    const product = products.find((p) => p.id === productId)
    if (product) {
      setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }])
    }
  }

  function updateQuantity(index: number, quantity: number) {
    const updatedProducts = [...selectedProducts]
    updatedProducts[index].quantity = quantity
    setSelectedProducts(updatedProducts)
  }

  function removeProduct(index: number) {
    const updatedProducts = selectedProducts.filter((_, i) => i !== index)
    setSelectedProducts(updatedProducts)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    const total = selectedProducts.reduce((sum, p) => sum + p.price * p.quantity, 0)

    const { error } = await supabase.from("receipts").insert({
      client_name: clientName,
      client_phone: clientPhone,
      prescription,
      items: selectedProducts,
      total,
    })

    if (error) {
      console.error("Error saving receipt:", error)
      setError("Failed to save receipt. Please try again.")
    } else {
      router.push("/receipts")
    }
    setSubmitting(false)
  }

  if (loading) {
    return <div className="text-center">Loading products...</div>
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Client Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="clientName" className="block mb-1">
              Name
            </label>
            <input
              type="text"
              id="clientName"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="clientPhone" className="block mb-1">
              Phone
            </label>
            <input
              type="tel"
              id="clientPhone"
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Prescription</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-1">Right Eye</h3>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="text"
                placeholder="SPH"
                value={prescription.rightEye.sph}
                onChange={(e) =>
                  setPrescription({ ...prescription, rightEye: { ...prescription.rightEye, sph: e.target.value } })
                }
                className="p-2 border rounded"
              />
              <input
                type="text"
                placeholder="CYL"
                value={prescription.rightEye.cyl}
                onChange={(e) =>
                  setPrescription({ ...prescription, rightEye: { ...prescription.rightEye, cyl: e.target.value } })
                }
                className="p-2 border rounded"
              />
              <input
                type="text"
                placeholder="AXE"
                value={prescription.rightEye.axe}
                onChange={(e) =>
                  setPrescription({ ...prescription, rightEye: { ...prescription.rightEye, axe: e.target.value } })
                }
                className="p-2 border rounded"
              />
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-1">Left Eye</h3>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="text"
                placeholder="SPH"
                value={prescription.leftEye.sph}
                onChange={(e) =>
                  setPrescription({ ...prescription, leftEye: { ...prescription.leftEye, sph: e.target.value } })
                }
                className="p-2 border rounded"
              />
              <input
                type="text"
                placeholder="CYL"
                value={prescription.leftEye.cyl}
                onChange={(e) =>
                  setPrescription({ ...prescription, leftEye: { ...prescription.leftEye, cyl: e.target.value } })
                }
                className="p-2 border rounded"
              />
              <input
                type="text"
                placeholder="AXE"
                value={prescription.leftEye.axe}
                onChange={(e) =>
                  setPrescription({ ...prescription, leftEye: { ...prescription.leftEye, axe: e.target.value } })
                }
                className="p-2 border rounded"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Products</h2>
        <select
          onChange={(e) => addProduct(Number.parseInt(e.target.value))}
          className="w-full p-2 border rounded mb-2"
        >
          <option value="">Select a product</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name} - ${product.price.toFixed(2)}
            </option>
          ))}
        </select>
        <ul className="space-y-2">
          {selectedProducts.map((product, index) => (
            <li key={index} className="flex items-center justify-between bg-white p-2 rounded shadow">
              <span>
                {product.name} - ${product.price.toFixed(2)}
              </span>
              <div>
                <input
                  type="number"
                  value={product.quantity}
                  onChange={(e) => updateQuantity(index, Number.parseInt(e.target.value))}
                  className="w-16 p-1 border rounded mr-2"
                  min="1"
                />
                <button onClick={() => removeProduct(index)} className="text-red-500 hover:text-red-700">
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Total</h2>
        <p className="text-2xl font-bold">
          ${selectedProducts.reduce((sum, p) => sum + p.price * p.quantity, 0).toFixed(2)}
        </p>
      </div>

      {error && <div className="text-red-500">{error}</div>}

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
        disabled={submitting}
      >
        {submitting ? "Generating Receipt..." : "Generate Receipt"}
      </button>
    </form>
  )
}

