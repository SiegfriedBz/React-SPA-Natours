import { CloudinaryImage } from '@cloudinary/url-gen'
import { AdvancedImage, responsive, placeholder } from '@cloudinary/react'
import { cldBaseUrl, cloudConfig, urlConfig } from './utils'

type TProps = {
  url: string
  className: string
}

const CloudinaryImg = ({ url, className = '' }: TProps) => {
  const publicId = url?.split(cldBaseUrl)[1]

  if (!publicId) return null

  // Create a CloudinaryImage instance
  const image = new CloudinaryImage(publicId, cloudConfig, urlConfig)

  return (
    <AdvancedImage
      className={className}
      cldImg={image}
      plugins={[responsive({ steps: 200 }), placeholder({ mode: 'blur' })]}
    />
  )
}

export default CloudinaryImg
