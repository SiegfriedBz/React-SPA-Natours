import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

type TProps = {
  className?: string
  children: React.ReactNode
}

const MotionCardWrapper = ({ className = '', children }: TProps) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['0 1', '1.5 1']
  })

  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.85, 1])
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.75, 1])

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        scale: scaleProgress,
        opacity: opacityProgress
      }}
      initial={{ scale: 1, opacity: 0.1 }}
    >
      {children}
    </motion.div>
  )
}

export default MotionCardWrapper
