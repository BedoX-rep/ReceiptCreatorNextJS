"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function ProductList() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()

    const channel = supabase
      .channel('products_channel')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'products' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setProducts(prev => [...prev, payload.new])
          } else if (payload.eventType === 'DELETE') {
            setProducts(prev => prev.filter(product => product.id !== payload.old.id))
          } else if (payload.eventType === 'UPDATE') {
            setProducts(prev => prev.map(product => 
              product.id === payload.new.id ? payload.new : product
            ))
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
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

  async function deleteProduct(id: number) {
    setLoading(true)
    setError(null)
    const { error } = await supabase.from("products").delete().eq("id", id)

    if (error) {
      console.error("Error deleting product:", error)
      setError("Failed to delete product. Please try again.")
    } else {
      // fetchProducts()  No need to refetch, real-time updates handle this.
    }
    setLoading(false)
  }

  if (loading) {
    return <div className="text-center">Loading products...</div>
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Product List</h2>
      {products.length === 0 ? (
        <p>No products found. Add some products to get started.</p>
      ) : (
        <ul className="space-y-2">
          {products.map((product) => (
            <li key={product.id} className="flex justify-between items-center bg-white p-2 rounded shadow">
              <span>
                {product.name} - ${product.price.toFixed(2)}
              </span>
              <button
                onClick={() => deleteProduct(product.id)}
                className="text-red-500 hover:text-red-700"
                disabled={loading}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}