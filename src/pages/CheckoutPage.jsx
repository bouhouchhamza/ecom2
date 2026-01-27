import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Shield, Truck, CreditCard } from 'lucide-react'
import { useCart } from '../contexts/CartContext'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { items, getTotalPrice, clearCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  })

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    saveCard: false
  })

  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true)

  const subtotal = getTotalPrice()
  const shipping = subtotal > 50 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleInputChange = (e, section) => {
    const { name, value, type, checked } = e.target
    const setter = section === 'shipping' ? setShippingInfo : setPaymentInfo
    
    setter(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      clearCart()
      navigate('/order-confirmation')
    }, 2000)
  }

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">No items in cart</h1>
          <Link to="/products" className="btn-primary">
            Return to Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link to="/cart" className="flex items-center text-gray-600 hover:text-primary-600 mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Cart
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Shipping Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-6">
              <Truck className="h-5 w-5 text-primary-600 mr-2" />
              <h2 className="text-xl font-semibold">Shipping Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={shippingInfo.firstName}
                onChange={(e) => handleInputChange(e, 'shipping')}
                className="input-field"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={shippingInfo.lastName}
                onChange={(e) => handleInputChange(e, 'shipping')}
                className="input-field"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={shippingInfo.email}
                onChange={(e) => handleInputChange(e, 'shipping')}
                className="input-field"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={shippingInfo.phone}
                onChange={(e) => handleInputChange(e, 'shipping')}
                className="input-field"
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Street Address"
                value={shippingInfo.address}
                onChange={(e) => handleInputChange(e, 'shipping')}
                className="input-field md:col-span-2"
                required
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={shippingInfo.city}
                onChange={(e) => handleInputChange(e, 'shipping')}
                className="input-field"
                required
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={shippingInfo.state}
                onChange={(e) => handleInputChange(e, 'shipping')}
                className="input-field"
                required
              />
              <input
                type="text"
                name="zipCode"
                placeholder="ZIP Code"
                value={shippingInfo.zipCode}
                onChange={(e) => handleInputChange(e, 'shipping')}
                className="input-field"
                required
              />
              <select
                name="country"
                value={shippingInfo.country}
                onChange={(e) => handleInputChange(e, 'shipping')}
                className="input-field"
              >
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="UK">United Kingdom</option>
              </select>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-6">
              <CreditCard className="h-5 w-5 text-primary-600 mr-2" />
              <h2 className="text-xl font-semibold">Payment Information</h2>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={paymentInfo.cardNumber}
                onChange={(e) => handleInputChange(e, 'payment')}
                className="input-field"
                required
              />
              <input
                type="text"
                name="cardName"
                placeholder="Name on Card"
                value={paymentInfo.cardName}
                onChange={(e) => handleInputChange(e, 'payment')}
                className="input-field"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={paymentInfo.expiryDate}
                  onChange={(e) => handleInputChange(e, 'payment')}
                  className="input-field"
                  required
                />
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={paymentInfo.cvv}
                  onChange={(e) => handleInputChange(e, 'payment')}
                  className="input-field"
                  required
                />
              </div>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="saveCard"
                  checked={paymentInfo.saveCard}
                  onChange={(e) => handleInputChange(e, 'payment')}
                  className="mr-2"
                />
                <span className="text-sm text-gray-600">Save card for future purchases</span>
              </label>
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start">
              <Shield className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
              <div>
                <h3 className="font-medium text-green-900 mb-1">Secure Payment</h3>
                <p className="text-sm text-green-700">
                  Your payment information is encrypted and secure. We never store your card details on our servers.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            {/* Order Items */}
            <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-sm font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full btn-primary mt-6 flex items-center justify-center disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                'Place Order'
              )}
            </button>

            {/* Terms */}
            <p className="text-xs text-gray-500 mt-4 text-center">
              By placing this order, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}
