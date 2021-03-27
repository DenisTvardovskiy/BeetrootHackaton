const mongoose = require('mongoose')
const express = require('express')
const expressHandlebars = require('express-handlebars')
const path = require('path')

const authRouter = require("./routes/authRouter")
const homeRouter = require("./routes/homeRouter")
const profileRouter = require("./routes/profileRouter")
const postsRouter = require("./routes/postsRouter")

const PORT = process.env.PORT || 3000

const app = express()

const hbs = expressHandlebars.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))

app.use(homeRouter)
app.use(profileRouter)
app.use(postsRouter)
app.use(authRouter)


app.use((req, res, next) => {
  res.status(404)

  res.render('404')
})


async function start() {
  try {
    await mongoose.connect(process.env.MONGO_CONN, {
      useNewUrlParser: true,
      useFindAndModify: false,
    })


    app.listen(PORT, () => {
      console.log(`App listening at http://localhost:${PORT}`)
    })

  } catch (e) {
    console.log(e)
  }
} 


start()