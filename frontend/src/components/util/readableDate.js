const readableDate = () => {
  const now = new Date()

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const month = months[now.getMonth()]
  const day = now.getDate().toString() // Pad with zero if a single-digit date
  const year = now.getFullYear()
  const hours = now.getHours().toString().padStart(2, '0') // Pad with zero if a single-digit hour
  const minutes = now.getMinutes().toString().padStart(2, '0') // Pad with zero if a single-digit minute

  const formattedDate = `${month} ${day} ${year} ${hours}:${minutes}`
  return formattedDate
}

export default readableDate
