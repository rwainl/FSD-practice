import React from 'react'
import { Card, Button, Tag, message } from 'antd'
import { ShoppingCartOutlined, LoginOutlined } from '@ant-design/icons/lib/icons'
import { Link, useNavigate } from "react-router-dom"
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const { Meta } = Card;

function ProductCard({ product }) {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    const {addToCart} = useCart();

    const handleAddToCart = (e) => {
        if(!isLoggedIn) {
            message.warning({
                content: 'Login to add products',
                duration: 3,
                icon: <LoginOutlined />,
                onClick: () => navigate('/login'),
            });
            setTimeout(() => {
                navigate('/login', {state: {from: location}})
            }, 1500);
            return;
        }

        e.stopPropagation();
        addToCart(product);
    };

    const handleCardClick = () => {
        navigate(`/products/${product._id}`)
    };

  return (
    <>
        <Card
            hoverable
            className='h-full flex flex-col overflow-hidden'
            bodyStyle={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '16px' }}
            cover={
                <Link to={`/products/${product._id}`} className='block overflow-hidden'>
                    <div className="relative w-full h-48 sm:h-56 md:h-64 bg-gray-50 overflow-hidden border-b border-gray-200">
                        <div className="absolute inset-0 flex items-center justify-center p-4">
                            <img 
                                alt={product.name}
                                // src={product.image || '/placeholder.webp'}
                                src=''
                                className='max-w-full max-h-full w-auto h-auto object-contain'
                                style={{ maxWidth: '100%', maxHeight: '100%' }}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = '/placeholder.webp';
                                }}
                            />
                        </div>
                    </div>
                </Link>
            }
            actions={[
                <Button
                    type='primary'
                    onClick={handleAddToCart}
                    icon={<ShoppingCartOutlined />}
                    key="cart"
                    className='!text-xs sm:!text-sm'
                >
                    <span className='hidden xs:inline'>Add to cart</span>
                    <span className='xs:hidden'>Add</span>
                </Button>
            ]}
        >
            <Meta
                title={
                    <Link to={`/products/${product._id}`} className='text-gray-800 hover:text-blue-600 text-sm sm:text-base md:text-lg font-semibold line-clamp-2 block mb-2' >
                        {product.name}
                    </Link>
                }
                description={
                    <div className="space-y-2">
                        <Tag color="blue" className='text-xs'>{product.category}</Tag>
                        <p className='text-base sm:text-lg md:text-xl font-bold text-blue-600 mb-1'>
                            Rp. {product.price.toLocaleString('id-ID')}
                        </p>
                        <p className='text-xs sm:text-sm text-gray-500'>
                            Stock: <span className={product.stock > 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>{product.stock}</span>
                        </p>
                    </div>
                }
            />
        </Card>
    </>
  )
}

export default ProductCard