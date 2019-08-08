import {
  newNotificationIterator,
  newUserIterator,
  newStoryReportIterator,
  newFeedbackIterator,
  newFollowedStoryIterator,
} from './subscription'

export const newNotification = {
  subscribe: newNotificationIterator,
  resolve: payload => payload,
}

export const newUser = {
  subscribe: newUserIterator,
  resolve: payload => payload,
}

export const newStoryReport = {
  subscribe: newStoryReportIterator,
  resolve: payload => payload,
}

export const newFeedback = {
  subscribe: newFeedbackIterator,
  resolve: payload => payload,
}

export const newFollowedStory = {
  subscribe: newFollowedStoryIterator,
  resolve: payload => payload,
}
