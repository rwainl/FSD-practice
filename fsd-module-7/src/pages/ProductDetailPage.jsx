// TODO: Import useParams dari react-router-dom
// TODO: Import useQuery dari @tanstack/react-query
// TODO: Import Ant Design components

function ProductDetailPage() {
  // TODO: Get product ID dari URL params
  // Hint: const { id } = useParams()

  // TODO: Fetch product detail dengan useQuery
  // Hint: queryKey: ['product', id]

  // TODO: Show loading state

  // TODO: Show error state

  // TODO: Display product details:
  // - Image
  // - Name & category
  // - Description
  // - Price
  // - Stock status
  // - Add to cart button

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Product Detail</h1>

      <p className="text-gray-600">
        TODO: Display product details dengan dynamic routing!
      </p>
    </div>
  );
}

export default ProductDetailPage;
