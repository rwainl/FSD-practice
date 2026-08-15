/**
 * Product Detail Page
 * 
 * TODO untuk peserta:
 * 1. Import components dari Ant Design (Card, Button, Image, Descriptions, message)
 * 2. Import useQuery dari '@tanstack/react-query'
 * 3. Import useParams dari 'react-router-dom'
 * 4. Import useAuth dari '../context/AuthContext'
 * 5. Import useCart dari '../context/CartContext'
 * 6. Import apiClient dari '../services/api'
 * 7. Create ProductDetailPage component:
 *    - Get productId dari URL params
 *    - Fetch product dari /api/products/:id
 *    - Display product information
 *    - Add to cart button (requires login)
 *    - Related products section
 * 
 * Reference: ../finished-project/src/pages/ProductDetailPage.jsx
 */

// TODO: Import dependencies
// import { Card, Button, Image, Descriptions, message } from 'antd';
// import { useQuery } from '@tanstack/react-query';
// import { useParams } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { useCart } from '../context/CartContext';
// import apiClient from '../services/api';
import React from 'react'
import { Card, Button, Spin, Alert, Tag, Descriptions, message } from 'antd'
import { useQuery } from '@tanstack/react-query'
import { ShoppingCartOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { useCart } from '../context/CartContext'
import { getProductById } from '../../../fsd-module-7/src/services/api'
import { useNavigate, useParams } from 'react-router-dom'

// TODO: Create ProductDetailPage component
// function ProductDetailPage() {
//   // Get productId from params
//   // Fetch product dengan useQuery
//   // Handle add to cart
//   // Display product details
//   // Return JSX
// }

function ProductDetailPage() {
  const {id} = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const { data, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id).then((res) => res.data),
  });

  const product = data?.data;

  const handleAddToCart = () => {
    addToCart(product);
  };

  if(isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
        <Spin size='large' tip="Loading product details..." />
      </div>
    )
  }

  if(error) {
    return(
      <div className="container mx-auto px-4 py-8">
        <Alert 
          message="Product not found"
          description={error.response?.data?.message || 'Failed to load product detauls'}
          type='error'
          showIcon
        />
        <Button onClick={() => navigate("/products")} className='mt-4'>
          Back to products
        </Button>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <Button className='mb-4'
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate('/products')}
      >
        Back to products
      </Button>
      <Card>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="">
            <img src={product.imageUrl || 'https://via.placeholder.com/500x400?text=Health+Product'} alt={product.name} className='w-full rounded-lg' />
          </div>
          <div className="">
            <div className="mb-4">
              <Tag color="blue" className='mb-2'>
                {product.category}
              </Tag>
              <h1 className='text-3xl font-bold text-gray-800'>
                {product.name}
              </h1>
            </div>
            <p className='text-4xl font-bold text-blue-600 mb-6'>
              Rp. {product.price?.toLocaleString('id-ID')}
            </p>
            <Descriptions bordered column={1} className='mb-6'>
              <Descriptions.Item label="Category">
                {product.category}
              </Descriptions.Item>
              <Descriptions.Item label="Manufacturer">
                {product.manufacturer}
              </Descriptions.Item>
              <Descriptions.Item label="Stock">
                <span className={product.stock > 0 ? "text-green-600" : "text-red-600"}>
                  {product.stock > 0 ? `${product.stock} unit available` : "Out of stock"}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag color={product.isActive ? "green" : "red"}>
                  {product.status ? "Active" : "Inactive"}
                </Tag>
              </Descriptions.Item>
            </Descriptions>
            <div className="my-6">
              <h3 className='text-lg font-semibold mb-2'>
                Deskripsi
              </h3>
              <p className='text-gray-600'>
                {product.description}
              </p>
            </div>
            <Button
              type='primary'
              size='large'
              icon={<ShoppingCartOutlined />}
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              block
              className='h-12'
            >
              {product.stock > 0 ? "Add to cart" : "Out of stock"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

// TODO: Export
// export default ProductDetailPage;
export default ProductDetailPage

