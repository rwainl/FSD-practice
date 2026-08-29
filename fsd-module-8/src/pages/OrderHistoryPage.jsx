import React, {useState} from 'react'
import { useQuery } from '@tanstack/react-query'
import { Card, Table, Tag, Button, Empty, Spin, Pagination, Select, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { ShoppingOutlined, EyeOutlined, CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, TruckOutlined, HomeOutlined } from '@ant-design/icons'
import api from '../services/api'

const formatCurrency = (value) => {
  if(value === null || value === undefined || isNaN(value)) {
    return '0';
  }

  return Number(value).toLocaleString('id-ID');
};

const { Option } = Select;

function OrderHistoryPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['orderHistory', page, limit, statusFilter],
    queryFn: async() => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });
      if(statusFilter) {
        params.append('status', statusFilter);
      }
      const response = await api.get(`/api/orders?${params.toString()}`);
      return response.data;
    }
  });

  const orders = data?.data || [];
  const total = data?.total || 0;
  const totalPages = data?.totalPages || 1;

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

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
      render: (text) => (
        <span className='font-mono text-sm font-semibold'>{text}</span>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => {
        const d = new Date(date);
        return (
          <div className="">
            <div className="text-sm font-medium">
              {d.toLocaleString('id-ID' , {
                day: 'numeric', 
                month: 'short',
                year: 'numeric',
              })}
            </div>
            <div className="text-xs text-gray-500">
              {d.toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          </div>
        )
      }
    },
    {
      title: 'Items',
      key: "items",
      render: (_, record) => (
        <div className="">
          <div className="text-sm font-medium">
            {record.item?.length || 0} item(s)
          </div>
          <div className="text-xs text-gray-500">
            {record.items?.[0]?.name || 'N/A'}
            {record.items?.length > 1 && `+${record.items.length - 1} others`}
          </div>
        </div>
      )
    },
    {
      title: 'Total',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount) => (
        <span className='font-semibold text-blue-600'>
          {formatCurrency(amount)}
        </span>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => getStatusTag(status)
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button
          type='link'
          icon={<EyeOutlined />}
          onClick={() => navigate(`/orders/${record.orderId}`)}
          className='!p-0'
        >
          Detail
        </Button>
      )
    },
  ]

  if(isLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-10 max-w-7xl">
        <div className="flex justify-center items-center min-h-[400px]">
          <Spin size='large' />
        </div>
      </div>
    )
  }

  if(error) {
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-10 max-w-7xl">
      <Card>
        <Empty
          description={
            <span className='text-red-500'>
              Failed getting orders. Try again.
            </span>
          }
        >
          <Button type='primary' onClick={() => refetch()}>
            Try again
          </Button>
        </Empty>
      </Card>
    </div>
  }

  return (
    <div className='container mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-10 max-w-7xl'>
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div className="">
              <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2'>
                <ShoppingOutlined />
                Order History
              </h1>
              <p className='text-gray-600 mt-1 text-sm sm:text-base'>
                All your orders
              </p>
            </div>
            <Button
              icon={<HomeOutlined />}
              onClick={() => navigate('/')}
            >
              Back to home
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <Select
              placeholder="Filter"
              allowClear
              value={statusFilter || undefined}
              onChange={(value) => {
                setStatusFilter(value || '');
                setPage(1);
              }}
              className='w-full sm:w-48'
            >
              <Option value="pending">Waiting Payment</Option>
              <Option value="paid">Paid</Option>
              <Option value="processing">On Processing</Option>
              <Option value="shipped">On Delivery</Option>
              <Option value="delivered">Received</Option>
              <Option value="failed">Failed</Option>
              <Option value="cancelled">Cancelled</Option>
            </Select>
          </div>
        </div>

        <Card>
          {orders.length === 0 ? (
            <Empty
              description="No order yet"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            >
              <Button
                type='primary'
                onClick={() => navigate('/products')}
              >
                Explore Products
              </Button>
            </Empty>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table 
                  columns={columns}
                  dataSource={orders}
                  rowKey="_id"
                  pagination={false}
                  className='mb-4'
                />
              </div>
              {totalPages > 1 && (
                <div className="flex justify-center mt-4">
                  <Pagination 
                    current={page}
                    total={total}
                    pageSize={limit}
                    onChange={(newPage) => setPage(newPage)}
                    showSizeChanger={false}
                    showTotal={(total, range) => `${range[0]} - ${range[1]} of ${total} orders`}
                  />
                </div>
              )}
            </>
          )}
        </Card>
    </div>
  )
}

export default OrderHistoryPage

