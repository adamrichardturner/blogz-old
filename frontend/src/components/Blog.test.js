import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  const testBlog = {
    title: 'Chips are for frying',
    author: 'James Bond',
    url: 'www.doglistener.co.uk',
    likes: 15,
    user: {
      id: '64397c0f28cff7eeed4a2758',
      name: 'Adam R Turner',
      username: 'aturner',
    },
  }
  const testUser = {
    id: '64397c0f28cff7eeed4a2758',
    name: 'Adam R Turner',
    username: 'aturner',
  }

  let container

  const mockHandler = jest.fn()

  beforeEach(() => {
    container = render(
      <Blog blog={testBlog} user={testUser} updateLikes={mockHandler} />
    ).container
  })

  test('renders title and author but not likes and url by default', () => {
    const blogComponent = container.querySelector('.blog')
    expect(blogComponent).toHaveTextContent('Chips are for frying')
    expect(blogComponent).toHaveTextContent('James Bond')
    const blogExtraDetails = container.querySelector('.blog-extra-details')

    expect(blogExtraDetails).toHaveStyle('display: none;')
  })

  test('url and likes are shown when the view button is pressed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const blogExtraDetails = container.querySelector('.blog-extra-details')
    expect(blogExtraDetails).toHaveStyle('display: block')
  })

  test('clicking the like button twice calls the event handler twice', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
