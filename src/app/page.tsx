import Link from "next/link"

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Link href="/products" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <h2 className="text-xl font-semibold mb-2">Product Management</h2>
        <p>Manage your product inventory</p>
      </Link>
      <Link href="/receipts/new" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <h2 className="text-xl font-semibold mb-2">New Receipt</h2>
        <p>Generate a new receipt for a customer</p>
      </Link>
      <Link href="/receipts" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <h2 className="text-xl font-semibold mb-2">Receipt History</h2>
        <p>View and manage past receipts</p>
      </Link>
    </div>
  )
}

