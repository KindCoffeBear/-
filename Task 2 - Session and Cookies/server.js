const express = require('express')
const path = require('path')
const hbs = require('hbs')
const bcrypt = require('bcrypt')
const { nanoid } = require('nanoid')
const sessions = require('express-session')
const { db } = require('./DB')
const { checkAuth, userRedirect } = require('./sources/middlewares/checkAuth')

const PORT = 3000

const saltRounds = 10

const server = express()

server.set('view engine', 'hbs')
server.set('views', path.join(__dirname, 'sources', 'views'))
server.set('cookieName', 'sid')
hbs.registerPartials(path.join(__dirname, 'sources', 'views', 'partials'))

server.use(express.urlencoded({ extended: true }))
server.use(express.static(path.join(__dirname, 'public')))
server.use(express.json())
server.use(sessions({
  name: server.get('cookieName'),
  secret: 'asdadad',
  resave: false, // Не сохранять сессию, если мы ее не изменим
  saveUninitialized: false, // не сохранять пустую сессию
  // store: new FileStore({ // выбираем в качестве хранилища файловую систему
  //   secret: secretKey,
  // }),
  cookie: { // настройки, необходимые для корректного работы cookie
    // secure: true,
    httpOnly: true, // не разрещаем модифицировать данную cookie через javascript
    maxAge: 86400 * 1e3, // устанавливаем время жизни cookie
  },
}))
server.use((req, res, next) => {
  const currentEmail = req.session?.user?.email

  if (currentEmail) {
    const currentUser = db.users.find((user) => user.email === currentEmail)
    res.locals.name = currentUser.name
  }

  next()
})

server.get('/', userRedirect, (req, res) => {
  res.render('main')
})

server.get('/pictures', checkAuth, (req, res) => {
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

  const currentUser = req.session?.user

  dataFromForm.id = currentUser.id

  if (dataFromForm.link !== '' && /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._/+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/.test(dataFromForm.link)) {
    db.pictures.push(dataFromForm)
  }
  res.redirect('/')
})

server.get('/auth/signup', (req, res) => {
  res.render('signUp')
})

server.post('/auth/signup', async (req, res) => {
  const {
    name, email, password,
  } = req.body

  if (!db.users.find((user) => user.email === email)) {
    const hashPass = await bcrypt.hash(password, saltRounds)
    const id = nanoid()

    db.users.push({
      name,
      email,
      password: hashPass,
      id,
    })

    req.session.user = {
      email,
      id,
    }

    return res.redirect('/')
  }
  return res.redirect('/auth/signup')
})

server.get('/auth/signin', (req, res) => {
  res.render('signIn')
})

server.post('/auth/signin', async (req, res) => {
  const { email, password } = req.body

  const currentUser = db.users.find((user) => user.email === email)

  if (currentUser) {
    if (await bcrypt.compare(password, currentUser.password)) {
      req.session.user = {
        email,
        id: currentUser.id,
      }
      return res.redirect('/')
    }
  }

  return res.redirect('/auth/signin')
})

server.get('/auth/signout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.redirect('/')

    res.clearCookie(req.app.get('cookieName'))
    return res.redirect('/')
  })
})

server.delete('/pictures', (req, res) => {
  if (req.body.id === req.session.user.id) {
    db.pictures = db.pictures.filter((el) => el.id !== req.body.id)
    res.sendStatus(204)
  } else {
    res.sendStatus(401)
  }
})

server.listen(PORT, () => console.log('Ready'))
