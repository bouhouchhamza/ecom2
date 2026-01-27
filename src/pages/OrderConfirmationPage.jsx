import { Link } from 'react-router-dom'
import { CheckCircle, Package, Truck, ArrowRight } from 'lucide-react'

export default function OrderConfirmationPage() {
  const orderNumber = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center py-16">
        {/* Success Icon */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
        </div>

        {/* Confirmation Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
        <p className="text-xl text-gray-600 mb-8">
          Thank you for your purchase. Your order has been successfully placed.
        </p>

        {/* Order Number */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8 max-w-md mx-auto">
          <p className="text-sm text-gray-600 mb-2">Order Number</p>
          <p className="text-2xl font-bold text-gray-900">{orderNumber}</p>
        </div>

        {/* Next Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Package className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="font-semibold mb-2">Order Processing</h3>
            <p className="text-sm text-gray-600">We're preparing your order for shipment</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Truck className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="font-semibold mb-2">Shipping</h3>
            <p className="text-sm text-gray-600">Your order will arrive within 2-3 business days</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="font-semibold mb-2">Delivery</h3>
            <p className="text-sm text-gray-600">Track your order until it reaches your doorstep</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/products" className="btn-primary inline-flex items-center justify-center">
            Continue Shopping
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link to="/account/orders" className="btn-secondary inline-flex items-center justify-center">
            View Order Details
          </Link>
        </div>

        {/* Email Confirmation */}
        <div className="mt-12 p-6 bg-blue-50 rounded-lg max-w-md mx-auto">
          <h3 className="font-semibold text-blue-900 mb-2">Check Your Email</h3>
          <p className="text-sm text-blue-700">
            We've sent a confirmation email with your order details and tracking information.
          </p>
        </div>
      </div>
    </div>
  )
}
