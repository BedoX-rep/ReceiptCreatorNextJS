
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Business Management</span>
            <span className="block text-primary mt-2">Made Simple</span>
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Manage your products and receipts with ease
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link href="/products" 
            className="group relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 p-8 border border-gray-100 overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full"></div>
            <div className="relative">
              <h2 className="text-2xl font-semibold text-gray-900 group-hover:text-primary transition-colors">
                Product Management
              </h2>
              <p className="mt-4 text-gray-600">
                Efficiently manage your inventory with our intuitive product management system
              </p>
              <div className="mt-6 text-primary font-medium">
                Get Started →
              </div>
            </div>
          </Link>

          <Link href="/receipts/new"
            className="group relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 p-8 border border-gray-100 overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full"></div>
            <div className="relative">
              <h2 className="text-2xl font-semibold text-gray-900 group-hover:text-primary transition-colors">
                New Receipt
              </h2>
              <p className="mt-4 text-gray-600">
                Create and generate professional receipts for your customers instantly
              </p>
              <div className="mt-6 text-primary font-medium">
                Create Receipt →
              </div>
            </div>
          </Link>

          <Link href="/receipts"
            className="group relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 p-8 border border-gray-100 overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full"></div>
            <div className="relative">
              <h2 className="text-2xl font-semibold text-gray-900 group-hover:text-primary transition-colors">
                Receipt History
              </h2>
              <p className="mt-4 text-gray-600">
                Access and manage your complete receipt history in one place
              </p>
              <div className="mt-6 text-primary font-medium">
                View History →
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
