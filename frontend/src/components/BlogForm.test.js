import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('BlogForm', () => {
  test('calls the event handler with the right details when a new blog is created', async () => {
    const createBlogMock = jest.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlogMock} />)

    // Fill in the form inputs
    const titleInput = screen.getByPlaceholderText('Title')
    const authorInput = screen.getByPlaceholderText('Author')
    const urlInput = screen.getByPlaceholderText('URL')
    await user.type(titleInput, 'Springday')
    await user.type(authorInput, 'James Pond')
    await user.type(urlInput, 'www.bond.com')

    // Submit the form
    const createButton = screen.getByText('create')

    await user.click(createButton)
    screen.debug()
    // Check if the event handler was called with the correct details
    expect(createBlogMock).toHaveBeenCalledTimes(1)
    expect(createBlogMock).toHaveBeenCalledWith({
      title: 'Springday',
      author: 'James Pond',
      url: 'www.bond.com',
    })
  })
})
