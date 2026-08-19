import React from 'react'
import { Card, Input, Select, Row, Col, Pagination, Empty, Alert, Spin } from 'antd';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import ProductCard from '../components/ProductCard';

function ProductsPage() {
  const {data, isLoading, error} = useQuery({
    queryKey: ["products"],
    queryFn: () => api.get("/products").then((res) => res.data),
    staleTime: 5 * 60 * 1000,
  });

  const products = data?.data || [];
  
  if(error) {
    return (
      <div className="">
        <Alert
          message="Error loading products"
          description={error.message || "Failed to fetch products"}
          type="error"
          showIcon
        />
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6'>
        Health Products
      </h1>
      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <Spin size='large' />
        </div>
      )}
      {!isLoading && products.length === 0 && (
        <Empty
          description="Products empty"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      )}
      {!isLoading && products.length > 0 && (
        <>
          <p className='text-gray-600 mb-4'>
            {products.length} products found
          </p>
          <Row gutter={[16, 16]}>
            {products.map((product) => (
              <Col xs={24} sm={12} lg={8} xl={6} key={product._id}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </div>
  )
}

export default ProductsPage

