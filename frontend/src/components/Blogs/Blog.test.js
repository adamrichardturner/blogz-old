import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { useSelector } from 'react-redux'
import Blog from './Blog'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}))

// Mock the child components for a shallow render
jest.mock('./BlogHeader', () => () => <div>BlogHeader</div>)
jest.mock('./BlogContent', () => () => <div>BlogContent</div>)
jest.mock('./Comment/CommentForm', () => () => <div>CommentForm</div>)
jest.mock('./Comment/CommentList', () => () => <div>CommentsList</div>)

describe('Blog', () => {
  const mockBlog = {
    id: 1,
    title: 'Sample Blog',
    user: {
      name: 'Author',
      id: 2,
    },
    createdAt: '2023-01-01',
    content: {
      text: 'Sample content',
      giphyUrls: ['https://example.com/gif1.gif'],
    },
    likedBy: [],
    comments: [],
  }

  beforeEach(() => {
    useSelector.mockClear()
  })

  it('renders children components', () => {
    useSelector.mockReturnValue(false)
    const { getByText } = render(<Blog blog={mockBlog} />)

    expect(getByText('BlogHeader')).toBeInTheDocument()
    expect(getByText('BlogContent')).toBeInTheDocument()
    expect(getByText('CommentForm')).toBeInTheDocument()
  })

  it('renders CommentsList if comments are visible', () => {
    useSelector.mockReturnValue(true) // Comments are visible

    const { getByText } = render(<Blog blog={mockBlog} />)
    expect(getByText('CommentsList')).toBeInTheDocument()
  })

  it('does not render CommentsList if comments are hidden', () => {
    useSelector.mockReturnValue(false) // Comments are hidden

    const { queryByText } = render(<Blog blog={mockBlog} />)
    expect(queryByText('CommentsList')).not.toBeInTheDocument()
  })
})

afterEach(() => {
  useSelector.mockClear()
})
