declare const Stripe: {
  (publicKey: string): {
    redirectToCheckout: (options: {
      sessionId: string
    }) => Promise<{ error?: Error }>
  }
}

import { toast } from 'react-toastify'
import { getStripeCheckoutSession } from '../../../service/booking.stripe.service'
import logger from '../../../utils/logger.utils'

type TProps = {
  tourId: string
}

const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY
const stripe = Stripe(STRIPE_PUBLIC_KEY as string)

const StripeCheckoutButton = ({ tourId }: TProps) => {
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

      await stripe.redirectToCheckout({
        sessionId: id
      })
    } catch (error) {
      logger.info(error)
      toast.error('Getting stripe checkout went wrong')
    }
  }

  return (
    <button
      className="px-4 py-2 bg-blue-500"
      type="button"
      onClick={() => handleGetStripeCheckoutSession(tourId as string)}
    >
      Book tour
    </button>
  )
}

export default StripeCheckoutButton
