import React from 'react'
import { Card, Button, Tag } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons/lib/icons'
import { useNavigate } from "react-router-dom"
import { useCart } from '../context/CartContext'

const { Meta } = Card;

function ProductCard({ product }) {
    const navigate = useNavigate();

    const {addToCart} = useCart();

    const handleAddToCart = (e) => {
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
            onClick={handleCardClick}
            cover={
                <img
                    alt={product.name}
                    src={
                        product.imageUrl || "https://via.placeholder.com/300x200?text=Health+Product"
                    }
                    className='h-48 object-cover'
                />
            }
            actions={[
                <Button
                    type='primary'
                    onClick={handleAddToCart}
                    icon={<ShoppingCartOutlined />}
                    key="add-to-cart"
                >
                    Add to cart
                </Button>
            ]}
        >
            <Meta
                title={
                    <div className='flex flex-col justify-between items-start'>
                        <span className='text-lg font-semibold'>
                            {product.name}
                        </span>
                        <Tag color="blue">{product.category}</Tag>
                    </div>
                }
                description={
                    <div className="">
                        <p className='text-gray-600 text-sm mb-2'>
                            {product.description}
                        </p>
                        <p className='text-2xl font-bold text-blue-600'>
                            Rp. {product.price.toLocaleString('id-ID')}
                        </p>
                        <p className='text-sm tex-gray-500 mt-1'>
                            Stock: {product.stock || 0} unit
                        </p>
                    </div>
                }
            />
        </Card>
    </>
  )
}

export default ProductCard