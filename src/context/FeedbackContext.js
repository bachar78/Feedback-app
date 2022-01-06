import { createContext, useState } from 'react'
import { v4 as uuid } from 'uuid'
import FeedbackData from '../data/FeedbackData'
const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState(FeedbackData)
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })
  //delete feedback
  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }
  //add feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuid()
    setFeedback((prev) => [newFeedback, ...prev])
  }
  //set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({ item, edit: true })
  }

  //Update feedback item
  const updateFeedback = (id, updItem) => {
    const updatedItem = feedback.map((item) =>
      item.id === id ? { ...item, ...updItem } : item
    )
    setFeedback(updatedItem)
  }

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}
export default FeedbackContext
