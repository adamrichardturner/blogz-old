function formatDate(inputStr) {
  const date = new Date(inputStr)

  const now = new Date()

  // Get the time difference in milliseconds
  const diffMs = now - date
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

    const dayWithSuffix = ordinalize(date.getDate())
    const monthName = months[date.getMonth()]
    const year = date.getFullYear()
    const time = `${String(date.getHours()).padStart(2, '0')}:${String(
      date.getMinutes()
    ).padStart(2, '0')}`

    return `${dayWithSuffix} ${monthName} ${year} ${time}`
  }
}

export default formatDate
