function formatDate(inputStr) {
  const date = new Date(inputStr)

  // Convert current time to UK time
  const now = new Date()
  const ukTime = new Date(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds(),
    now.getUTCMilliseconds()
  )

  // Factor in the Daylight Saving Time (BST) for the UK
  // Assuming DST starts on the last Sunday of March and ends on the last Sunday of October
  if (ukTime.getUTCMonth() > 2 && ukTime.getUTCMonth() < 10) {
    const lastSundayOfMarch = new Date(
      Date.UTC(ukTime.getUTCFullYear(), 2, 31, 1)
    )
    const lastSundayOfOctober = new Date(
      Date.UTC(ukTime.getUTCFullYear(), 9, 31, 1)
    )

    if (
      !(
        (ukTime.getUTCMonth() === 3 &&
          ukTime.getUTCDate() < lastSundayOfMarch.getUTCDate()) ||
        (ukTime.getUTCMonth() === 9 &&
          ukTime.getUTCDate() >= lastSundayOfOctober.getUTCDate())
      )
    ) {
      ukTime.setHours(ukTime.getHours() + 1)
    }
  }

  // Get the time difference in milliseconds
  const diffMs = ukTime - date
  const diffSeconds = Math.floor(diffMs / 1000)
  const diffMinutes = Math.floor(diffSeconds / 60)
  const diffHours = Math.floor(diffMinutes / 60)
  const diffDays = Math.floor(diffHours / 24)

  // Format based on the difference
  if (diffMinutes < 1) {
    return 'Just now'
  } else if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes === 1 ? '' : 's'} ago`
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`
  } else if (diffDays === 1) {
    return '1 day ago'
  } else if (diffDays < 7) {
    return `${diffDays} days ago`
  } else {
    const ordinalize = (day) => {
      if (day % 10 === 1 && day !== 11) return day + 'st'
      if (day % 10 === 2 && day !== 12) return day + 'nd'
      if (day % 10 === 3 && day !== 13) return day + 'rd'
      return day + 'th'
    }

    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]

    const dayWithSuffix = ordinalize(date.getUTCDate())
    const monthName = months[date.getUTCMonth()]
    const year = date.getUTCFullYear()
    const time = `${String(date.getUTCHours()).padStart(2, '0')}:${String(
      date.getUTCMinutes()
    ).padStart(2, '0')}`

    return `${dayWithSuffix} ${monthName} ${year} ${time}`
  }
}

export default formatDate
