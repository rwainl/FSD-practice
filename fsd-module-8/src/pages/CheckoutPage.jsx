import React, { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import { Alert, Card, Form, Input, Button, Steps, message } from 'antd';
import { CreditCardOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';

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
        title: 'Shipping Information',
        content: <ShippingForm  
          onComplete={(data) => {
            setShippingInfo(data);
            setCurrentStep(1);
          }}
        />
      },
      {
        title: 'Payment',
        content: <PaymentSummary 
          cart={cart}
          cartTotal={getCartTotal}
          shippingInfo={shippingInfo}
          onPayment={handlePayment}
          loading={loading}
        />
      },
    ];

    async function handlePayment() {
      setLoading(true);

      try {
        if(!shippingInfo) {
          message.error('Complete shipping information first.');
          setLoading(false);
          return;
        }

        const safeCartTotal = cartTotal || 0;
        if(safeCartTotal <= 0) {
          message.error('Total cost is invalid.');
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
            timestamp: Date.now(),
          }));
          message.success({
            content: 'Opening Midtrans payment...',
            duration: 2,
          });
  
          await clearCart();
  
          window.location.href = paymentResponse.paymentUrl;
        } else {
          message.error('Payment URL not found. Try again.');
        }
      } catch (error) {
        console.error('Payment failed. Try again.')
      } finally {
        setLoading(false);
      }
    }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-10 max-w-4xl">
      <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-10 text-gray-800'>Checkout</h1>

      <Steps current={currentStep}>
        {steps.map((step, index) => (
          <Steps.Step key={index} title={step.title} className='mb-6 sm:mb-8' />
        ))}
      </Steps>

      <Card>
        {steps[currentStep].content}
      </Card>

      {currentStep > 0 && (
        <Button
          className='mt-4'
          size='large'
          onClick={() => setCurrentStep(0)}
        >
          Back
        </Button>
      )}
    </div>
  )
}

function ShippingForm({ onComplete }) {
  const [form] = Form.useForm();
  const { user } = useAuth();

  useEffect(() => {
    if(user) {
      form.setFieldsValue({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.adress || '',
      })
    }
  }, [user, form]);

  const onFinish = (values) => {
    onComplete(values);
  };

  return(
    <div className="">
      {user && (user.name || user.email || user.phone || user.adress) && (
        <Alert 
          message="Shipping information need to be completed."
          description="You can change this information later."
          type='info'
          showIcon
          className='mb-4'
          closable
        />
      )}
      <Form 
        form={form}
        layout='vertical'
        onFinish={onFinish}
        autoComplete='off'
      >
        <Form.Item
          label="Full Name"
          name="name"
          required={[
            {
              required: true,
              message: 'Name required.',
            }
          ]}
        >
          <Input placeholder='John Doe' size='large' />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Email required.',
            },
            {
              type: 'email',
              message: 'Email invalid',
            }
          ]}
        >
          <Input placeholder='johndoe@gmail.com' size='large' />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[
            {
              required: true,
              message: 'Phone number required'
            },
          ]}  
        >
          <Input placeholder='0123456789' size='large' />
        </Form.Item>
        <Form.Item
          label="Full Adress"
          name="address"
          rules={[
            {
              required: true,
              message: 'Address required',
            }
          ]}
        >
          <Input.TextArea rows={4} placeholder='Kenanga Sr. No. 7' />
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            size='large'
            block
          > 
            Continue
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
};

function PaymentSummary({ cart, cartTotal, shippingInfo, onPayment, loading }) {
  const shippingCost = 15000;

  const safeCartTotal = cartTotal || 0;
  const total = safeCartTotal + shippingCost;

  const formatCurrency = (value) => {
    if(value === null || value === undefined || isNaN(value)) {
      return '0';
    }
    return Number(value).toLocaleString('id-ID');
  };

  return (
    <div className="">
      <h3 className='text-lg font-semibold mb-4'>Summary</h3>

      <Card
        size='small'
        className='mb-4'
      >
        <h4 className='font-semibold mb-2'>
          Shipping Information
        </h4>
        <p className='text-sm mb-1'><strong>Name:</strong> {shippingInfo.name}</p>
        <p className='text-sm mb-1'><strong>Email:</strong> {shippingInfo.email}</p>
        <p className='text-sm mb-1'><strong>Phone Number:</strong> {shippingInfo.phone}</p>
        <p className='text-sm mb-1'><strong>Address:</strong> {shippingInfo.address}</p>
      </Card>

      <div className="mb-4">
        <h4 className='font-semibold mb-2'>Product ({cart.length} items):</h4>
        {cart.map(item => {
          const subTotal = item.price * item.quantity;

          return (
          <div className="flex justify-between mb-2 text-sm" key={item._id}>
            <span>{item.name || 'Product'} x{item.quantity}</span>
            <span>Rp. {formatCurrency(subTotal)}</span>
          </div>
          );
        })}
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between mb-2">
          <span>Subtotal:</span>
          <span>Rp. {formatCurrency(safeCartTotal)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Shipping cost:</span>
          <span>Rp. {formatCurrency(shippingCost)}</span>
        </div>
        <div className="flex justify-between text-xl font-bold text-blue-600 border-t pt-2">
          <span>Total:</span>
          <span>Rp. {formatCurrency(total)}</span>
        </div>
      </div>

      <Button
        type='primary'
        size='large'
        block
        icon={<CreditCardOutlined />}
        onClick={onPayment}
        loading={loading}
        className='mt-6 h-12'
      >
        Complete payment via Midtrans
      </Button>

      <p className='text-xs text-gray-500 text-center mt-2'>
        You will be redirected to Midtrans
      </p>
    </div>
  )
}


export default CheckoutPage
