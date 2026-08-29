import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Descriptions, Tag, Button, Spin, Empty, Divider, List, Alert } from 'antd'
import { ArrowLeftOutlined, CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, TruckOutlined, ShoppingOutlined, HomeOutlined } from '@ant-design/icons'
import api from '../services/api'

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
        <div className="container mx-auto"></div>
      )
    }
  
  return (
    <div className=''>
      
    </div>
  )
}

export default OrderDetailPage
