"use client"

import { motion, useMotionValue, useTransform } from "framer-motion"

const Example = () => {
  const value = useMotionValue(0)

  const rotation = useTransform(value, [-80, 0, 80], [-30, 0, 30])

  return (
    <motion.div className=" center min-h-screen w-full border border-white">
      <motion.div
        drag={true}
        className="h-96 w-72 border bg-red-500 shadow-md"
        style={{ rotate: `${rotation}deg` }}
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.15}
        dragMomentum={true}
        dragSnapToOrigin={true}
        onDragEnd={(event, info) => {
          console.log({ event, info })
        }}
      />
    </motion.div>
  )
}

export default function Home() {
  return (
    <div>
      <Example />
    </div>
  )
}
