// Importing necessary modules
const _ = require('lodash') // Lodash library

// Function to return a fixed value of 1
const dummy = () => {
  return 1
}

// Function to calculate the total likes of all blogs
const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
}

// Function to find the blog with the most likes
const favoriteBlog = (blogs) => {
  return blogs.reduce(
    (max, blog) => {
      return blog.likes > max.likes
        ? { title: blog.title, author: blog.author, likes: blog.likes }
        : max
    },
    { title: '', author: '', likes: 0 }
  )
}

// Function to find the author with the most blogs and the number of blogs they have written
const mostBlogs = (blogs) => {
  const freq = _.countBy(blogs, 'author')
  const author = _.maxBy(_.keys(freq), (author) => freq[author])
  return { author, blogs: freq[author] }
}

// Function to find the author with the most likes and the total number of likes they have received
const mostLikes = (blogs) => {
  const result = _.chain(blogs)
    .groupBy('author')
    .map((blogList, author) => ({
      author,
      likes: _.sumBy(blogList, 'likes'),
    }))
    .maxBy('likes')
    .value()
  return result
}

// Exporting the functions as an object
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
