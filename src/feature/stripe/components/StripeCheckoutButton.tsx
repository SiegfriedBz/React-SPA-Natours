import { useEffect } from 'react'
import { loadStripe, type Stripe } from '@stripe/stripe-js'
import { toast } from 'react-toastify'
import { getStripeCheckoutSession } from '../../../service/booking.stripe.service'
import logger from '../../../utils/logger.utils'

type TProps = {
  tourId?: string
  className?: string
}

const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY
let stripe: Stripe | null = null

const StripeCheckoutButton = ({ tourId, className = '' }: TProps) => {
  useEffect(() => {
    ;(async () => {
      stripe = await loadStripe(STRIPE_PUBLIC_KEY as string)
    })()
  }, [])

  const handleGetStripeCheckoutSession = async (tourId: string) => {
    try {
      /** 1. Get Checkout session from API */
      const data = await getStripeCheckoutSession(tourId)

      // display success msg
      toast.success('Redirecting to checkout...')

      /** 2. Redirect to Stripe Checkout => create check out form and Charge Credit card */
      const {
        data: {
          stripeSession: { id }
        }
      } = data

      if (!stripe) {
        throw new Error('Error loading stripe')
      }

      const result = await stripe.redirectToCheckout({
        sessionId: id
      })

      if (result.error) {
        throw new Error(result.error.message)
      }
    } catch (error) {
      logger.info(error)
      toast.error('Getting stripe checkout went wrong')
    }
  }

  return (
    <button
      className={className}
      type="button"
      onClick={() => handleGetStripeCheckoutSession(tourId as string)}
    >
      Book tour now!
    </button>
  )
}

export default StripeCheckoutButton
