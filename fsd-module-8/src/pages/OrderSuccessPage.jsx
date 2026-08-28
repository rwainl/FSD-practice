import React from 'react'
import { Result, Button, Card, Tag } from 'antd'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons'
import { useEffect } from 'react'

function OrderSuccessPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const orderId = searchParams.get('order_id');
    const transactionStatus = searchParams.get('transaction_status') || searchParams.get('status');
    const statusCode = searchParams.get('status_code');

    useEffect(() => {
        if(orderId && (transactionStatus === 'settlement' || transactionStatus === 'capture')) {
            localStorage.removeItem('pending_order');
        }
    }, [orderId, transactionStatus, statusCode, searchParams]);

    const isPending = transactionStatus === 'pending';
    const isSuccess = transactionStatus === 'settlement' || transactionStatus === 'capture' || !transactionStatus;
  
    return (
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-10 max-w-4xl'>
            <Result
                icon={isPending ? <ClockCircleOutlined /> : <CheckCircleOutlined />}
                status={isPending ? "warning" : "success"}
                title={isPending ? "Payment On Process" : "Payment Success"}
                subTitle={
                    isPending ? "Payment is on process. You will be notified via email." : "Your order is on process. Thanks for ordering."
                }
                extra={[
                    <Button
                        type='primary'
                        key="orderHistory"
                        onClick={() => navigate('/orders')}
                        size='large'
                    >
                        Check Status
                    </Button>,
                    <Button
                        key="products"
                        onClick={() => navigate('/prducts')}
                        size='large'
                    >
                        Explore Products
                    </Button>,
                    <Button
                        key="home"
                        onClick={() => navigate('/')}
                        size='large'
                    >
                        Back to Home
                    </Button>
                ]}
            >
                {orderId && (
                    <Card className='max-w-md mx-auto mb-6' size='small'>
                        <div className="flex items-center justify-between mb-3">
                            <span className='text-sm font-semibold text-gray-700'>
                                Order ID:
                            </span>
                            <Tag color="blue" className='font-mono'>
                                {orderId}
                            </Tag>
                        </div>
                        {transactionStatus && (
                            <div className="flex items-center justify-between">
                                <span className='text-sm font-semibold text-gray-700'>
                                    Status:
                                </span>
                                <Tag color={isPending ? "orange" : "green"}>
                                    {transactionStatus.toUpperCase()}
                                </Tag>
                            </div>
                        )}
                    </Card>
                )}

                <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl max-w-md mx-auto">
                    <h3 className='font-semibold text-gray-800 mb-4 text-center'>
                        {isPending ? "Next" : "Next"}
                    </h3>
                    <div className="space=y=3">
                        <p className='text-sm text-gray-700 flex items-start gap-2'>
                            <span className='text-blue-500 font-bold'></span>
                            <span>Order has been sent to email.</span>
                        </p>
                        <p className='text-sm text-gray-700 flex items-start gap-2'>
                            <span className='text-blue-500 font-bold'></span>
                            <span>Delivery estimation: 2-3 days</span>
                        </p>
                        <p className='text-sm text-gray-700 flex items-start gap-2'>
                            <span className='text-blue-500 font-bold'></span>
                            <span>Call customer service if you have questions</span>
                        </p>

                    </div>
                </div>

                {isPending && (
                    <div className="mt-6 text-center">
                        <p className='text-sx text-gray-500'>
                            Tip: Some payment method need time for confirmation.
                        </p>
                    </div>
                )}
            </Result>
        </div>
    )
}

export default OrderSuccessPage