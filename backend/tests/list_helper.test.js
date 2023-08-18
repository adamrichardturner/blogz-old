const listHelper = require('../utils/list_helper')

// Helper data

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    content: {
      text: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      giphyUrls: ['https://example-giphy-url.com/avatar1'],
    },
    likedBy: [
      '5a422aa71b54a676234d17f8',
      '5a422a851b54a676234d17f7',
      '5a422b3a1b54a676234d17f9',
    ],
    __v: 0,
  },
]
const manyBlogs = [
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

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('when list has only one blog, equal the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(2)
  })

  test('when the list has multiple blogs, equal the sum of all of their likes', () => {
    const result = listHelper.totalLikes(manyBlogs)
    expect(result).toBe(18)
  })

  test('when the list has no blogs, equal 0', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })
})

describe('favorite blogs', () => {
  const singleFavorite = {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    content: {
      text: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      giphyUrls: ['https://example-giphy-url.com/avatar1'],
    },
    likedBy: [
      '5a422aa71b54a676234d17f8',
      '5a422a851b54a676234d17f7',
      '5a422b3a1b54a676234d17f9',
    ],
    __v: 0,
  }

  const manyFavorite = {
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
  }

  test('when the list has only one blog, return the title, author and likes as an object', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(singleFavorite)
  })

  test('when the list has multiple blogs, return the title, author and likes of the favorite as an object', () => {
    const result = listHelper.favoriteBlog(manyBlogs)
    expect(result).toEqual(manyFavorite)
  })
})
