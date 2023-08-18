const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')
const testToken = process.env.TEST_TOKEN

// Delete all blogs from the database and insert the initial blogs before each test
beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

// Group tests related to the blogs API
describe('blogs API returns correct length and type of data', () => {
  // Test that blogs are returned in JSON format
  test('blogs are returned in JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  // Test that the correct number of blogs are returned
  test('the correct number of blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
})

// Test that the unique identifier for blog posts is named id
test('the unique identifier of blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach((obj) => {
    expect(obj.id).toBeDefined()
  })
})

// Test that on adding a blog, count is increased and blogs are stored correctly in the database
test('blog posts added increases blog count and content is stored correctly in database', async () => {
  // Define a test blog post object
  const testBlog = {
    title: 'Test Blog',
    content: {
      text: 'This is the content of the test blog',
      giphyUrls: [],
    },
    likedBy: [],
  }

  // Add the test blog post to the database using the supertest API
  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${testToken}`) // Pass the token as a value of the Authorization header
    .send(testBlog)
    .expect(201) // Expect a successful POST request with a 201 status code
    .expect('Content-Type', /application\/json/) // Expect a response with JSON content type

  // Get the blogs from the database using the helper function
  const blogsAtEnd = await helper.blogsInDb()

  // Expect the length of the blogs array to increase by 1 after adding the test blog post
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  // Create an array of blog titles from the blogs in the database
  const titles = blogsAtEnd.map((blog) => blog.title)

  // Expect the array of blog titles to contain the title of the test blog post
  expect(titles).toContain(testBlog.title)

  // Find the added blog post in the array of blogs in the database
  const addedBlog = blogsAtEnd.find((blog) => blog.title === testBlog.title)

  // Expect the added blog post to match the properties of the test blog post object
  expect(addedBlog).toMatchObject(testBlog)
})

test('adding a blog without a token fails with status code 401', async () => {
  const testBlog = {
    title: 'Test Blog',
    content: {
      text: 'Content without token',
      giphyUrls: [],
    },
  }

  await api.post('/api/blogs').send(testBlog).expect(401)
})

test('likes property defaults to 0 if not included when adding a blog', async () => {
  const testBlog = {
    title: 'Test Blog',
    content: {
      text: 'Content without token',
      giphyUrls: [],
    },
  }
  // Add the test blog post to the database using the supertest API
  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${testToken}`) // Pass the token as a value of the Authorization header
    .send(testBlog)
    .expect(201) // Expect a successful POST request with a 201 status code
    .expect('Content-Type', /application\/json/) // Expect a response with JSON content type

  // Check if the test blog added has a likes property with value 0
  const addedBlog = await Blog.findOne({ title: 'Test Blog' })
  expect(addedBlog.likedBy.length).toEqual(0)
})

// Test if title or content is missing that the server responds with a 400 status code
test('if title or content.text is missing when adding a blog, server responds with 400 status', async () => {
  const testBlog = {
    likedBy: [],
  }
  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${testToken}`) // Pass the token as a value of the Authorization header
    .send(testBlog)
    .expect(400) // Expect a status code 400 Bad Request where no title or url are defined
    .expect('Content-Type', /application\/json/) // Expect a response with JSON content type
})

// Group tests related to deleting a blog
describe('deletion of a blog', () => {
  // DELETE /:id
  test('succeeds with status code 204 if id is valid and user is the creator', async () => {
    // Add a blog as the logged-in user
    const newBlog = {
      title: 'Test Blog for Deletion',
      content: { text: 'Some content', giphyUrls: [] },
    }

    const addedBlog = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${testToken}`)
      .send(newBlog)

    await api
      .delete(`/api/blogs/${addedBlog.body.id}`)
      .set('Authorization', `Bearer ${testToken}`)
      .expect(204)

    // Confirm the blog is deleted
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length) // Assuming initialBlogs were the starting state
  })
})

// Group tests related to updating a blog
describe('updating a blog', () => {
  // PUT /:id
  test('succeeds with status code 200', async () => {
    const testBlog = {
      title: 'Updating this Blog',
      content: {
        text: 'Updated content for the blog',
        giphyUrls: [],
      },
      likedBy: [],
    }

    const blogs = await helper.blogsInDb()
    const blogToUpdate = blogs[0]

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(testBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    // Get the updated blog from the database
    const updatedBlog = await Blog.findOne({ title: 'Updating this Blog' })

    // Expect the updated blog to have the same title as the test blog
    expect(updatedBlog.title).toEqual(testBlog.title)
  })
})

// Close the database connection after all tests are complete
afterAll(async () => {
  await mongoose.connection.close()
})
