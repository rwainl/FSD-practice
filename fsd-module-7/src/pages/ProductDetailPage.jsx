// TODO: Import useParams dari react-router-dom
// TODO: Import useQuery dari @tanstack/react-query
// TODO: Import Ant Design components
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, Button, Spin, Alert, Tag, Descriptions } from 'antd';
import { ShoppingCartOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useCart } from '../context/CartContext';
import { getProductById } from '../services/api';

function ProductDetailPage() {
  // TODO: Get product ID dari URL params
  // Hint: const { id } = useParams()
  const {id} = useParams();
  const navigate = useNavigate();
  const {addToCart} = useCart();

  // TODO: Fetch product detail dengan useQuery
  // Hint: queryKey: ['product', id]
  const {data, isLoading, error} = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id).then((res) => res.data),
  });

  const product = data?.data;

  const handleAdd = () => {
    addToCart(product);
  }

  // TODO: Show loading state
  if(isLoading) {
    return(
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
        <Spin size="large" tip="Loading product details..." />
      </div>
    )
  }

  
  // TODO: Show error state
  if(error) {
    return(
      <div className="container mx-auto px-4 py-8">
        <Alert
          message="Product Not Found"
          description={error.response?.data?.message || 'Failed to load product details'}
          type="error"
          showIcon
        />
        <Button onClick={() => navigate('/products')} className="mt-4">
          Back to Products
        </Button>
      </div>
    )
  }

  // TODO: Display product details:
  // - Image
  // - Name & category
  // - Description
  // - Price
  // - Stock status
  // - Add to cart button

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate('/products')}
        className="mb-4"
      >
        Kembali ke Products
      </Button>
      <Card>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="">
            <img src={product.imageUrl || 'https://via.placeholder.com/500x400?text=Health+Product'} alt={product.name} className='w-full rounded-lg' />
          </div>
          <div className="">
            <div className="mb-4">
              <Tag color='blue' className='mb-2'>{product.category}</Tag>
              <h1 className='text-3xl font-bold text-gray-800'>{product.name}</h1>
            </div>
            <p className='text-4xl font-bold text-blue-600 mb-6'>{product.price?.toLocaleString('id-ID')}</p>
            <Descriptions bordered column={1} className='mb-6'>
              <Descriptions.Item label="Category">{product.category}</Descriptions.Item>
              <Descriptions.Item label="Manufacturer">{product.manufacturer}</Descriptions.Item>
              <Descriptions.Item label="Stock">
                <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600' }>{product.stock > 0 ? `${product.stock} Unit available` : "Out of stock"}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag color={product.isActive ? "green" : "red" }>
                  {product.status ? "Active" : "Inactive"}
                </Tag>
              </Descriptions.Item>
            </Descriptions>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Deskripsi</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>

            <Button
              type="primary"
              size="large"
              icon={<ShoppingCartOutlined />}
              onClick={handleAdd}
              disabled={product.stock <= 0}
              block
              className="h-12"
            >
              {product.stock > 0 ? 'Tambah ke Keranjang' : 'Out of Stock'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ProductDetailPage;
