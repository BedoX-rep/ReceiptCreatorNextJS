import ProductList from "./ProductList"
import ProductForm from "./ProductForm"

export default function ProductsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProductList />
        <ProductForm />
      </div>
    </div>
  )
}

