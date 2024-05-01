import logger from '../utils/logger.utils'

const API_URL = import.meta.env.VITE_API_URL

export async function getStripeCheckoutSession(tourId: string) {
  try {
    const response = await fetch(
      `${API_URL}/bookings/checkout-session/${tourId}`,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      }
    )
    const data = await response.json()

    if (!response.ok || data.status !== 'success') {
      throw new Error(`Getting stripe checkout session went wrong`)
    }

    return data
  } catch (error) {
    logger.info(error)
    throw error
  }
}
