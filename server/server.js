const app = require('./app')
const { PORT } = require('./utils/config')

app.listen(PORT, () => {
  console.log(`
application started on port ${PORT} 🚀
  `)
})

process.on('uncaughtException', function (err) {
  console.log(err)
  process.exit()
})