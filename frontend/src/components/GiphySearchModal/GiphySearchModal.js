import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Modal,
  Grid,
  Card,
  CardMedia,
  Tooltip,
  TextField,
  Button,
  Box,
  useMediaQuery,
} from '@mui/material'

const GiphySearchModal = ({ onGifSelect, theme, insideContent }) => {
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [gifs, setGifs] = useState([])

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  const fetchGifs = async (search = '') => {
    // eslint-disable-next-line no-undef
    const KEY = process.env.REACT_APP_GIPHY_API_KEY
    const endpoint = search
      ? 'https://api.giphy.com/v1/gifs/search'
      : 'https://api.giphy.com/v1/gifs/trending'
    const params = search
      ? { q: searchTerm, api_key: KEY, limit: 15 }
      : { api_key: KEY, limit: 15 }

    try {
      const response = await axios.get(endpoint, { params })
      setGifs(response.data.data)
    } catch (error) {
      console.error('Error fetching GIFs:', error)
    }
  }

  useEffect(() => {
    if (open) {
      fetchGifs()
    }
  }, [open])

  const handleSelect = (gif) => {
    if (onGifSelect) {
      onGifSelect(gif.images.original.url)
    }
    setOpen(false)
  }

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        className={insideContent ? 'insideContent-elements' : ''}
        onClick={() => setOpen(true)}
      >
        GIF
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="giphy-search-modal-title"
        aria-describedby="giphy-search-modal-description"
      >
        <Box
          style={{
            width: isSmallScreen ? '90%' : '600px',
            maxHeight: '80%',
            margin: '10vh auto',
            overflowY: 'auto',
            padding: '20px',
            outline: 'none',
            background: theme.palette.background.default,
          }}
        >
          <TextField
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            label="Search for GIFs"
            variant="outlined"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                fetchGifs(searchTerm)
                e.preventDefault()
              }
            }}
            fullWidth
          />
          <Button
            onClick={() => fetchGifs(searchTerm)}
            variant="contained"
            color="primary"
            sx={{
              marginBottom: 2,
            }}
          >
            Search
          </Button>

          <Grid container spacing={3}>
            {gifs.map((gif) => (
              <Grid item xs={6} lg={4} key={gif.id}>
                <Tooltip title={gif.title}>
                  <Card
                    onClick={() => handleSelect(gif)}
                    style={{ cursor: 'pointer' }}
                  >
                    <CardMedia
                      component="img"
                      alt={gif.title}
                      height="200"
                      image={gif.images.preview_gif.url}
                    />
                  </Card>
                </Tooltip>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Modal>
    </div>
  )
}

export default GiphySearchModal
