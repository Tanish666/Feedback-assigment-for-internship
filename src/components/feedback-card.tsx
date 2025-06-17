"use client"

import { motion, useMotionValue, useTransform } from "framer-motion"
import Image from "next/image"

interface FeedbackItem {
  text: string
  image: string
}

interface FeedbackCardProps {
  item: FeedbackItem
  onSwipe: (direction: "left" | "right") => void
}

export default function FeedbackCard({ item, onSwipe }: FeedbackCardProps) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-150, 0, 150], [-10, 0, 10])
  const opacity = useTransform(x, [-150, -50, 0, 50, 150], [0, 1, 1, 1, 0])

  // Transform values for the feedback indicators
  const likeOpacity = useTransform(x, [0, 50, 150], [0, 0.5, 1])
  const likeScale = useTransform(x, [0, 50, 150], [0.8, 1, 1.2])

  const nopeOpacity = useTransform(x, [-150, -50, 0], [1, 0.5, 0])
  const nopeScale = useTransform(x, [-150, -50, 0], [1.2, 1, 0.8])

  const handleDragEnd = (event: any, info: any) => {
    const threshold = 100

    if (Math.abs(info.offset.x) > threshold) {
      // Determine swipe direction
      const direction = info.offset.x > 0 ? "right" : "left"
      onSwipe(direction)
    }
  }

  return (
    <div className="relative w-full max-w-sm">
      {/* Feedback Indicators */}
      <motion.div
        className="absolute -top-4 -left-4  bg-green-500 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg"
        style={{
          opacity: likeOpacity,
          scale: likeScale,
        }}
      >
        👍 LIKE
      </motion.div>

      <motion.div
        className="absolute -top-4 -right-4  bg-red-500 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg"
        style={{
          opacity: nopeOpacity,
          scale: nopeScale,
        }}
      >
        👎 NOPE
      </motion.div>

      {/* Main Card */}
      <motion.div
        className="bg-[#F2F2F2] rounded-xl shadow-xl p-6 cursor-grab active:cursor-grabbing select-none z-50"
        style={{
          x,
          rotate,
          opacity,
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        whileDrag={{ scale: 1.3 }}
        whileHover={{scale:1.1}}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: [1], opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      >
        {/* Image */}
        <div className="mb-4 rounded-xl overflow-hidden">
          <Image
            src={item.image || "/placeholder.svg"}
            alt="Feedback illustration"
            width={400}
            height={200}
            className="w-full h-[20rem] object-cover"
          />
        </div>

        {/* Text Content */}
        <div className="text-center">
          <p className="text-gray-800 font-mono text-lg leading-relaxed font-medium">"{item.text}"</p>
        </div>

        {/* Drag Hint */}

      </motion.div>
    </div>
  )
}
