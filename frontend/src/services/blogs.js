import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then((response) => response.data)
}

const toggleLike = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(`${baseUrl}/${id}/like`, {}, config)
  return response.data
}

const deleteBlog = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)

  return request.then((response) => response.data)
}

const commentBlog = async (id, commentContent) => {
  const config = {
    headers: { Authorization: token },
  }

  // Adjusted for the updated backend structure for comments
  const response = await axios.post(
    `${baseUrl}/${id}/comments`,
    commentContent,
    config
  )
  return response.data
}

export default {
  getAll,
  create,
  update,
  setToken,
  toggleLike,
  deleteBlog,
  commentBlog,
}
