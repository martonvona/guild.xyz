export function gameOverMessages() {
  const messages = [
    "Keep going, try again!",
    "Don't give up, give it another shot!",
    "Keep trying, give it one more go!",
    "Stay hopeful, give it another attempt!",
    "Stay strong, give it another chance!",
    "Don't lose hope, give it another attempt!",
  ]

  return messages[Math.floor(Math.random() * messages.length)]
}

export function newHighScoreMessages() {
  const messages = [
    "Great job! You achieved a new record!",
    "Well done! You've hit a new high score!",
    "Fantastic work! You've reached a new milestone!",
    "Congratulations! You've set a new personal best!",
    "Amazing achievement! You've reached an all-time high score!",
  ]

  return messages[Math.floor(Math.random() * messages.length)]
}
