const express = require('express')
const path = require('path')
const { db } = require('./DB')

const PORT = 3000

const server = express()

server.set('view engine', 'hbs')
server.set('views', path.join(__dirname, 'sources', 'views'))

server.use(express.urlencoded({ extended: true }))

server.get('/', (req, res) => {
  const { limit } = req.query
  const { reverse } = req.query
  let picturesForRender = db.pictures.slice(0)

  if (reverse === 'true') {
    picturesForRender.reverse()
  } else { picturesForRender = db.pictures }
  if (limit !== undefined && !Number.isNaN(+limit)) {
    picturesForRender = picturesForRender.slice(0, limit)
  }
  res.render('index', { listOfPictures: picturesForRender })
})

server.post('/photoalbum', (req, res) => {
  const dataFromForm = req.body

  if (dataFromForm.link !== '' && /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._/+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/.test(dataFromForm.link)) {
    db.pictures.push(dataFromForm)
  }
  res.redirect('/')
})

server.listen(PORT, () => console.log('Ready'))
