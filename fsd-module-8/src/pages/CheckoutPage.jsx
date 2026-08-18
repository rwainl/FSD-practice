import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import { Alert, Card, Form, Input, Button, Steps, message } from 'antd';

function CheckoutPage() {
    const { cart, getCartTotal, getCartCount, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [shippingInfo, setShippingInfo] = useState(null);

    if(cart.length === 0) {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-4xl">
                <Alert 
                    message="Cart empty"
                    description="Add some products to checkout"
                    type='warning'
                    showIcon
                    action={
                        <Button
                            onClick={() => navigate('/products')}
                            size='large'
                        >
                            Explore products
                        </Button>
                    }
                />
            </div>
        );
    }

    const steps = [
    {
      title: 'Informasi Pengiriman',
      content: <ShippingForm 
        onComplete={(data) => {
          setShippingInfo(data);
          setCurrentStep(1);
        }}
      />
    },
    {
      title: 'Ringkasan & Pembayaran',
      content: <PaymentSummary
        cart={cart}
        cartTotal={getCartTotal}
        shippingInfo={shippingInfo}
        onPayment={handlePayment}
        loading={loading}
      />
    }
  ];

  async function handlePayment() {
    setLoading(true);

    try {
        if(!shippingInfo) {
            message.error('Fill out shipping information first');
            setLoading(false);
            return;
        }

        const safeCartTotal = getCartTotal || 0;
        if(safeCartTotal <= 0) {
            message.error('Total payment invalid');
            setLoading(false);
            return;
        }

        const paymentData = {
            orderId: `ORDER-${Date.now()}`,
            total: safeCartTotal,
            items: cart.map(item => ({
                ...item,
                price: item.price || 0,
                quantity: item.quantity || 1,
            })),
            customerName: shippingInfo.name,
            customerEmail: shippingInfo.email,
            customerPhone: shippingInfo.phone,
            shippingAddress: shippingInfo.address,
        };

        const paymentResponse = await createPayment(paymentData);

        if(paymentResponse && paymentResponse.success && paymentResponse.paymentUrl) {
            localStorage.setItem('pending_order', JSON.stringify({
                orderId: paymentData.orderId,
                total: safeCartTotal,
                items: cart.length,
                timestamps: Date.now(),
            }));

            message.success({
                content: 'Opening midtrans payment...',
                duration: 2,
            })

            await clearCart();

            window.location.href = paymentResponse.paymentUrl;
        } else {
            message.error('Payment URL not found. Try again later.');
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Payment failed. try again.';
      message.error('Payment failed: ' + errorMessage);
    } finally {
        setLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-10 max-w-4xl">
        <h1 className='text-2xl sm-text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-10 text-gray-800'>Checkout</h1>

        <Steps current={currentStep} className='mb-6 sm:mb-8'>
            {steps.map((step, index) => (
                <Steps.Step key={index} title={step.title} />
            ))}
        </Steps>
        <Card>
            {steps[currentStep].content}
        </Card>
    </div>
  )
}

function ShippingForm({ onComplete }) {
  const [form] = Form.useForm();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
      });
    }
  }, [user, form]);

  const onFinish = (values) => {
    onComplete(values);
  };

  return (
    <div>
      {user && (user.name || user.email || user.phone || user.address) && (
        <Alert
          message="Informasi pengiriman telah diisi otomatis dari profil Anda"
          description="Anda dapat mengubah informasi ini jika diperlukan"
          type="info"
          showIcon
          className="mb-4"
          closable
        />
      )}
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Nama Lengkap"
          name="name"
          rules={[{ required: true, message: 'Nama wajib diisi!' }]}
        >
          <Input placeholder="Nama lengkap" size="large" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Email wajib diisi!' },
            { type: 'email', message: 'Email tidak valid!' }
          ]}
        >
          <Input placeholder="email@example.com" size="large" />
        </Form.Item>

        <Form.Item
          label="No. Telepon"
          name="phone"
          rules={[{ required: true, message: 'Telepon wajib diisi!' }]}
        >
          <Input placeholder="08123456789" size="large" />
        </Form.Item>

        <Form.Item
          label="Alamat Lengkap"
          name="address"
          rules={[{ required: true, message: 'Alamat wajib diisi!' }]}
        >
          <Input.TextArea rows={4} placeholder="Alamat lengkap untuk pengiriman" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" size="large" block>
            Lanjut ke Pembayaran
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

function PaymentSummary({ cart, getCartTotal, shippingInfo, onPayment, loading }) {
  const shippingCost = 15000; 
  
  const safeCartTotal = getCartTotal || 0;
  const total = safeCartTotal + shippingCost;
  
  const formatCurrency = (value) => {
    if (value === null || value === undefined || isNaN(value)) {
      return '0';
    }
    return Number(value).toLocaleString('id-ID');
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Ringkasan Pesanan</h3>
      
      <Card size="small" className="mb-4">
        <h4 className="font-semibold mb-2">Informasi Pengiriman:</h4>
        <p className="text-sm mb-1"><strong>Nama:</strong> {shippingInfo.name}</p>
        <p className="text-sm mb-1"><strong>Email:</strong> {shippingInfo.email}</p>
        <p className="text-sm mb-1"><strong>Telepon:</strong> {shippingInfo.phone}</p>
        <p className="text-sm"><strong>Alamat:</strong> {shippingInfo.address}</p>
      </Card>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Produk ({cart.length} items):</h4>
        {cart.map(item => {
          const itemPrice = item.price || 0;
          const itemQuantity = item.quantity || 1;
          const subtotal = itemPrice * itemQuantity;
          
          return (
            <div key={item._id} className="flex justify-between mb-2 text-sm">
              <span>{item.name || 'Produk'} x{itemQuantity}</span>
              <span>Rp {formatCurrency(subtotal)}</span>
            </div>
          );
        })}
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between mb-2">
          <span>Subtotal:</span>
          <span>Rp {formatCurrency(safeCartTotal)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Ongkir:</span>
          <span>Rp {formatCurrency(shippingCost)}</span>
        </div>
        <div className="flex justify-between text-xl font-bold text-blue-600 border-t pt-2">
          <span>Total:</span>
          <span>Rp {formatCurrency(total)}</span>
        </div>
      </div>

      <Button
        type="primary"
        size="large"
        block
        icon={<CreditCardOutlined />}
        onClick={onPayment}
        loading={loading}
        className="mt-6 h-12"
      >
        Bayar Sekarang via Midtrans
      </Button>

      <p className="text-xs text-gray-500 text-center mt-2">
        Anda akan diarahkan ke halaman pembayaran Midtrans yang aman
      </p>
    </div>
  );
}

export default CheckoutPage
