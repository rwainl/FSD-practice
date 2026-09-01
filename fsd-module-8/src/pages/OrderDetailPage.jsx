import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Descriptions, Tag, Button, Spin, Empty, Divider, List, Alert } from 'antd'
import { ArrowLeftOutlined, CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, TruckOutlined, ShoppingOutlined, HomeOutlined } from '@ant-design/icons'
import api from '../services/api'
import Item from 'antd/es/list/Item'

const formatCurrency = (value) => {
  if(value === null || value === undefined || isNaN(value)) {
    return '0';
  }
  return Number(value).toLocaleString('id-ID');
}

const formatDate = (date) => {
  if(!date) return '-';
  const d = new Date(date);
  return d.toLocaleString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function OrderDetailPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ['orderDetail', orderId],
    queryFn: async() => {
      const response = await api.get(`/api/orders/${orderId}`);
      return response.data.data;
    }
  });

  const getStatusTag = (status) => {
      const statusConfig = {
        pending: {
          color: 'orange',
          icon: <ClockCircleOutlined />,
          text: 'Waiting for payment',
        },
        paid: {
          color: 'blue',
          ion: <CheckCircleOutlined />,
          text: 'Paid',
        },
        processing: {
          color: 'cyan',
          icon: <ClockCircleOutlined />,
          text: 'On Process',
        },
        shipped: {
          color: 'purple',
          icon: <TruckOutlined />,
          text: 'On Delivery',
        },
        delivered: {
          color: 'green',
          icon: <CheckCircleOutlined />,
          text: 'Received',
        },
        failed: {
          color: 'red',
          icon: <CloseCircleOutlined />,
          text: 'Failed',
        },
        cancelled: {
          color: 'default',
          icon: <CloseCircleOutlined />,
          text: 'Cancelled',
        },
      };
  
      const config = statusConfig[status] || {color: 'default', icon: null, text: status};
      return (
        <Tag color={config.color} icon={config.icon}>
          {config.text}
        </Tag>
      )
    };

    if(isLoading) {
      return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-10 max-w-4xl">
          <div className="flex justify-center items-center min-h-[400px]">
            <Spin size='large' />
          </div>
        </div>
      )
    }

    if(error) {
      return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-10 max-w-4xl">
          <Card>
            <Empty
              description={
                <span className='text-red-500'>
                  Order not found. Might be an error.
                </span>
              }
            >
              <Button
                type='primary'
                onClick={() => navigate('/orders')}
              >
                Back to Order History
              </Button>
            </Empty>
          </Card>
        </div>
      )
    }

    const order = data;

    if(!order) {
      return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-10 max-w-4xl">
          <Card>
            <Empty description="Order not found" />
          </Card>
        </div>
      )
    }
  
  return (
    <div className='container mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-10 max-w-4xl'>
      <div className="mb-6">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/orders')}
          className='mb-4'
        >
          Back to Order History
        </Button>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="">
            <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2'>
              <ShoppingOutlined />
              Detail Order
            </h1>
            <p className='text-gray-600 mt-1 text-sm sm:text-base'>
              Order ID: <span className='font-mono font-semibold'>{order.orderId}</span>
            </p>
          </div>
          {getStatusTag(order.status)}
        </div>
      </div>

      {order.status === 'pending' && (
        <Alert 
          message="Waiting Payment"
          description="Please continue payment. Order will be updated after payment."
          type='warning'
          showIcon
          className='mb-6'
        />
      )}

      <Card title="Order Information" className='mb-6'>
        <Descriptions column={{xs: 1, sm: 2}} bordered>
          <Descriptions.Item label="Order ID">
            <span className='font-mono'>{order.orderId}</span>
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            {getStatusTag(order.status)}
          </Descriptions.Item>
          <Descriptions.Item label="Date">
            {formatDate(order.createdAt)}
          </Descriptions.Item>
          {order.midtransData?.transactionTime &&  (
              <Descriptions.Item label="Transaction Time">
                {formatDate(order.midtransData.transactionTime)}
              </Descriptions.Item>
          )}
          {order.midtransData?.settlementTime && (
              <Descriptions.Item label="Settlement Time">
                {formatDate(order.midtransData.settlementTime)}
              </Descriptions.Item>
          )}
          {order.transactionStatus && (
            <Descriptions.Item label="Transaction Status" >
              <Tag>{order.transactionStatus.toUpperCase()}</Tag>
            </Descriptions.Item>
          )}
          {order.midtransData?.paymentType && (
            <Descriptions.Item label="Payment Method">
              {order.midtransData.paymentType}
            </Descriptions.Item>
          )}
        </Descriptions>
      </Card>

      {order.customerDetails && (
        <Card title="Customer Details" className='mb-6' >
          <Descriptions column={{ xs:1, sm:2 }} >
            <Descriptions.Item label="Name">
              {order.customerDetails.name || '-'}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {order.customerDetails.email || '-'}
            </Descriptions.Item>
            {order.customerDetails.phone && (
              <Descriptions.Item label="Phone">
                {order.customerDetails.phone || '-'}
              </Descriptions.Item>
            )}
            {order.customerDetails.address && (
              <Descriptions.Item label="Address" span={2}>
                {order.customerDetails.address}
              </Descriptions.Item>
            )}
          </Descriptions>
        </Card>
      )}

      <Card title="Order Item" className='mb-6' >
        <List 
          dataSource={order.items || []}
          renderItem={(item, index) => (
            <List.Item>
              <div className="w-full">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold text-lg">
                      {index + 1}. {item.name}
                    </div>
                    {item.product?.category && (
                      <div className="text-sm text-gray-500 mt-1">
                        Category: {item.product.category}
                      </div>
                    )}
                    <div className="text-sm text-gray-600 mt-1">
                      Quantity: {item.quantity} x Rp. {formatCurrency(item.price)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">
                      Rp. {formatCurrency(item.price * item.quantity)}
                    </div>
                  </div>
                </div>
              </div>
            </List.Item>
          )}
        />
        <Divider />
        <div className="flex justify-between items-center text-xl font-bold">
          <span>Total Cost:</span>
          <span className='text-blue-600'>
            Rp. {formatCurrency(order.totalAmount)}
          </span>
        </div>
      </Card>

      {order.midtransData && (
        <Card title="Midtrans Transaction Details" className='mb-6' >
          <Descriptions column={{xs:1, sm:2}} bordered >
            {order.midtransData.transactionId && (
              <Descriptions.Item label="Transaction ID" >
                <span className='font-mono text-sm'>{order.midtransData.transactionId}</span>
              </Descriptions.Item>
            )}
          </Descriptions>
        </Card>
      )}
    </div>
  )
}

export default OrderDetailPage
