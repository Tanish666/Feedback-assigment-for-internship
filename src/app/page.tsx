"use client"

import { useState } from "react"
import FeedbackCard from "../components/feedback-card"

// Static data for demo purposes
const feedbackItems = [
  {
    text: "This app has completely transformed how I manage my daily tasks!",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    text: "The user interface is intuitive and beautifully designed.",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    text: "Customer support responded within minutes. Amazing service!",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    text: "The new features released last month are exactly what I needed.",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    text: "Loading times could be improved, but overall great experience.",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    text: "Love the dark mode option - easy on the eyes during late work sessions.",
    image: "/placeholder.svg?height=300&width=400",
  },
]

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleSwipe = (direction: "left" | "right") => {
    console.log(`Swiped ${direction} on: "${feedbackItems[currentIndex].text}"`)
    setCurrentIndex((prev) => prev + 1)
  }

  const currentItem = feedbackItems[currentIndex]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Feedback Collector</h1>
          <p className="text-gray-600">Swipe right to like, left to pass</p>
          <div className="mt-4 text-sm text-gray-500">
            {currentIndex < feedbackItems.length ? (
              <span>
                {currentIndex + 1} of {feedbackItems.length}
              </span>
            ) : (
              <span>All done!</span>
            )}
          </div>
        </div>

        <div className="relative h-96 flex items-center justify-center">
          {currentItem ? (
            <FeedbackCard key={currentIndex} item={currentItem} onSwipe={handleSwipe} />
          ) : (
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">All Done!</h2>
              <p className="text-gray-600">No more feedback to review.</p>
              <button
                onClick={() => setCurrentIndex(0)}
                className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Start Over
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-center mt-8 space-x-8 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">👎</span>
            <span>Swipe left to pass</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-2xl">👍</span>
            <span>Swipe right to like</span>
          </div>
        </div>
      </div>
    </div>
  )
}
