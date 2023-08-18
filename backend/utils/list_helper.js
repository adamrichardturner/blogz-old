// Importing necessary modules
const _ = require('lodash') // Lodash library

// Function to return a fixed value of 1
const dummy = () => {
  return 1
}

// Function to calculate the total likes of all blogs
const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likedBy.length
  }, 0)
}

// Function to find the blog with the most likes
const favoriteBlog = (blogs) => {
  return blogs.reduce(
    (max, blog) => {
      return blog.likedBy.length > max.likes
        ? { title: blog.title, likes: blog.likedBy.length }
        : max
    },
    { title: '', author: '', likes: 0 }
  )
}

// Function to find the title with the most likes and the total number of likes they have received
const mostLikes = (blogs) => {
  const result = _.maxBy(blogs, (blog) => blog.likedBy.length)
  return result
}

// Exporting the functions as an object
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostLikes,
}
