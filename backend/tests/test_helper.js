const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    content: {
      text: 'https://reactpatterns.com/',
      giphyUrls: ['https://example-giphy-url.com/avatar1'],
    },
    likedBy: ['5a422aa71b54a676234d17f8', '5a422a851b54a676234d17f7'],
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    content: {
      text: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      giphyUrls: ['https://example-giphy-url.com/avatar1'],
    },
    likedBy: ['5a422aa71b54a676234d17f8'],
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    content: {
      text: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      giphyUrls: ['https://example-giphy-url.com/avatar1'],
    },
    likedBy: [
      '5a422aa71b54a676234d17f8',
      '5a422a851b54a676234d17f7',
      '5a422b3a1b54a676234d17f9',
      '5a422b891b54a676234d17fa',
    ],
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    content: {
      text: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
      giphyUrls: ['https://example-giphy-url.com/avatar1'],
    },
    likedBy: [
      '5a422aa71b54a676234d17f8',
      '5a422a851b54a676234d17f7',
      '5a422b3a1b54a676234d17f9',
    ],
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    content: {
      text: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      giphyUrls: ['https://example-giphy-url.com/avatar1'],
    },
    likedBy: [
      '5a422aa71b54a676234d17f8',
      '5a422a851b54a676234d17f7',
      '5a422b3a1b54a676234d17f9',
      '5a422ba71b54a676234d17fb',
      '5a422bc61b54a676234d17fc',
    ],
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    content: {
      text: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      giphyUrls: ['https://example-giphy-url.com/avatar1'],
    },
    likedBy: [
      '5a422aa71b54a676234d17f8',
      '5a422a851b54a676234d17f7',
      '5a422b3a1b54a676234d17f9',
      '5a422ba71b54a676234d17fb',
    ],
    __v: 0,
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
}
