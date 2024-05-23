import { CloudConfig, URLConfig } from '@cloudinary/url-gen'

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
export const cloudConfig = new CloudConfig({ cloudName })
export const urlConfig = new URLConfig({ secure: true })
export const cldBaseUrl = `https://res.cloudinary.com/${cloudName}/image/upload/`
