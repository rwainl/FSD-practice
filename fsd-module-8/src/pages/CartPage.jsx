/**
 * Cart Page
 * 
 * TODO untuk peserta:
 * 1. Import components dari Ant Design (Card, Table, Button, InputNumber, message)
 * 2. Import useCart dari '../context/CartContext'
 * 3. Import useNavigate dari 'react-router-dom'
 * 4. Create CartPage component:
 *    - Get cart dari useCart
 *    - Display cart items dalam Table
 *    - Update quantity
 *    - Remove items
 *    - Calculate total
 *    - Checkout button (redirect to /checkout)
 * 
 * Reference: ../finished-project/src/pages/CartPage.jsx
 */

// TODO: Import dependencies
// import { Card, Table, Button, InputNumber, message } from 'antd';
// import { useCart } from '../context/CartContext';
// import { useNavigate } from 'react-router-dom';
import React from 'react'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import { Card, Table, Button, InputNumber, message, Empty } from 'antd'
import { ShoppingOutlined } from '@ant-design/icons'

// TODO: Create CartPage component
// function CartPage() {
//   // Get cart from useCart
//   // Handle update quantity
//   // Handle remove item
//   // Calculate total
//   // Handle checkout
//   // Return JSX
// }
function CartPage() {
  const navigate = useNavigate();

  const {cart, removeFromCart, clearCart, updateQuantity, getCartTotal} = useCart();

  const columns = [
    {
      title: "Produk",
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div className="flex items-center gap-4">
          <img src={record.imageUrl || 'https://via.placeholder.com/80x80'} alt={text} className="w-20 h-20 object-cover rounded" />
          <div className="">
            <p className="font-semibold">{text}</p>
            <p className="text-sm text-gray-500">{record.category}</p>
          </div>
        </div>
      )
    },
    {
      title: 'Harga',
      dataIndex: 'price',
      key: 'price',
      render: (price) => (
        <span className="font-semibold">
          Rp. {price?.toLocaleString('id-ID')}
        </span>
      )
    },
    {
      title: 'Jumlah',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity, record) => (
        <InputNumber
          min={0}
          max={record.stock}
          value={quantity}
          onChange={(value) => updateQuantity(record._id, value)}
        />
      )
    },
  ];

  if(cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className='shadow-md'>
          <Empty
            description="Cart empty"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
          <Button
            type='primary'
            icon={<ShoppingOutlined />}
            onClick={() => navigate('/products')}
          >
            Explore products
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6'>Cart</h1>
      <Card>
        <Table 
          columns={columns}
          dataSource={cart}
          rowKey="_id"
          pagination={false}
          footer={() => (
            <div className='flex justify-between items-center pt-4'>
              <Button onClick={clearCart} danger>
                Clear Cart
              </Button>
              <div className="text-right">
                <p className='text-lg text-gray-600 mb-2'>
                  Total items: {cart.reduce((sum, item) => sum + item.quantity, 0)} unit
                </p>
                <p className='text-2xl font-bold text-blue-600'>
                  Total: Rp. {getCartTotal.toLocaleString('id-ID')}
                </p>
                <Button
                  type='primary'
                  size='large'
                  className='mt-4'
                  // onClick={}
                >
                  Checkout
                </Button>
              </div>
            </div>
          )}
        />
      </Card>
    </div>
  )
}

// TODO: Export
// export default CartPage;
export default CartPage

