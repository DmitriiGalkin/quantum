const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()

console.log(process.env.PORT,'process.env.PORT')
const PORT = process.env.PORT || 3000
const indexPath = path.resolve(__dirname, '..', 'build', 'index.html')

app.use(express.static(path.resolve(__dirname, '..', 'build'), { maxAge: '30d' }))
app.get('/*', (req, res, next) => {
  console.log('/*')

  fs.readFile(indexPath, 'utf8', (error, htmlData) => {
    if (error) {
      console.error('Error during file reading', error)
      return res.status(404).end()
    }
    const metaUrl = 'http://localhost:4000/meta' + req.baseUrl + req.path
    console.log(metaUrl, 'meta')

    fetch(metaUrl)
      .then((response) => response.json())
      .then((response) => {
        console.log(response, 'response')
        htmlData = htmlData
          .replace('<title>Quantum</title>', `<title>${response.title}</title>`)
          .replace('__DESCRIPTION__', response.description)
          .replace('__OG_SITE_NAME__', response.ogSiteName)
          .replace('__OG_TYPE__', response.ogType)
          .replace('__OG_TITLE__', response.ogTitle)
          .replace('__OG_DESCRIPTION__', response.ogDescription)
          .replace('__OG_IMAGE__', response.ogImage)
        return res.send(htmlData)
      })
      .catch((error) => {
        return res.send(htmlData)
      })
  })
})
// listening...
app.listen(PORT, (error) => {
  if (error) {
    return console.log('Error during app startup', error)
  }
  console.log('listening on ' + PORT + '...')
})
