import React, { useState } from 'react'
import { Card, Input, Select, Row, Col, Pagination, Empty, Alert, Spin } from 'antd';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { SearchOutlined } from '@ant-design/icons';
import ProductSkeleton from '../components/ProductSkeleton';

const {Search} = Input;

function ProductsPage() {
  const navigate = useNavigate();
  const [category, setCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('latest');

  const itemsPerPage = 12;

  const {data, isLoading, error} = useQuery({
    queryKey: ["products", category, searchTerm, currentPage, sortBy],
    queryFn: async() => {
      const params = {
        page: currentPage,
        limit: itemsPerPage,
        sort: sortBy,
      };
      if(category) params.category = category;
      if(searchTerm) params.search = searchTerm;

      const response = await api.get('/products', { params });
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  const products = data?.data || [];
  const totalPages = data?.totalPages || 1;
  const totalProducts = data?.total || 0;

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
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-10'>
      <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-10 text-gray-800'>Catalogue Product</h1>

      <div className="mb-6 sm:mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Select
            placeholder="Filter by Category"
            className='w-full sm:w-64'
            value={category || undefined}
            onChange={(value) => {
              setCategory(value);
              setCurrentPage(1);
            }}
            allowClear
            size='large'
          >
            <Select.Option value="Vitamin">Vitamin</Select.Option>
            <Select.Option value="Supplement">Supplement</Select.Option>
            <Select.Option value="Medical Equipment">Medical Equipment</Select.Option>
            <Select.Option value="Medicine">Medicine</Select.Option>
            <Select.Option value="Other">Other</Select.Option>
          </Select>

          <Select
            placeholder="Sort by"
            className='w-full sm:w-48'
            value={sortBy}
            onChange={setSortBy}
            size='large'
          >
            <Select.Option value="latest" >Latest</Select.Option>
            <Select.Option value="price-asc" >Cheapest</Select.Option>
            <Select.Option value="price-desc" >Expensive</Select.Option>
            <Select.Option value="name-asc" >Name: A~Z</Select.Option>
            <Select.Option value="name-desc" >Name: Z~A</Select.Option>
          </Select>
          
          <Search  
            placeholder="Search products..."
            enterButton={<SearchOutlined />}
            size="large"
            className="w-full sm:flex-1 sm:max-w-md"
            onSearch={(value) => {
              setSearchTerm(value);
              setCurrentPage(1);
            }}
            allowClear
          />
        </div>

        {!isLoading && !error && (
          <div className="text-sm text-gray-600">
            Showing {products.length} of {totalProducts} products
            {category && ` • Category: ${category}`}
            {searchTerm && ` • Search: "${searchTerm}"`}
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className='text-red-500 text-lg mb-4'>Failed getting products. Try again.</p>
            <Button onClick={() => window.location.reload()}>Try again</Button>
          </div>
        )}
        
        {isLoading && (
          <Row gutter={[12,12]} className='sm:gutter-[16,16]'>
            {[1,2,3,4,5,6].map((i) => (
              <Col xs={24} sm={12} md={8} lg={6} key={i} >
                <ProductSkeleton />
              </Col>
            ))}
          </Row>
        )}

        {!isLoading && !error && products && (
          <Row gutter={[12,12]} className='sm:gutter-[16,16]' >
            {products.length === 0 && (
              <Col span={24}>
                <div className="text-center py-12">
                  <p className='text-gray-500 text-base sm:text-lg'>No products found.</p>
                </div>
              </Col>
            )}

            {products.map((product) => (
              <Col xs={24} sm={12} md={8} lg={6} key={product._id} >
                  <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        )}

        {!isLoading && !error && products.length > 0 && totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination 
              current={currentPage}
              total={totalProducts}
              pageSize={itemsPerPage}
              onChange={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: smooth });
              }}
              showSizeChanger={false}
              showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} products`}
              responsive
            />
          </div>
        )}
      </div>
      {/* <h1 className='text-3xl font-bold mb-6'>
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
      )} */}
    </div>
  )
}

export default ProductsPage

