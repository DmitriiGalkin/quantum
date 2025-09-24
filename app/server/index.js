const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()

const PORT = process.env.PORT || 3000
const indexPath = path.resolve(__dirname, '..', 'build', 'index.html')

app.get('/project/:id', (req, res, next) => {
  fs.readFile(indexPath, 'utf8', (error, html) => {
    if (error) return res.status(404).end()

    fetch('http://localhost:4000/meta' + req.path)
      .then((response) => response.json())
      .then((response) => {
        html = html
          .replace('<title>Quantum</title>', `<title>${response.title}</title>`)
          .replace('__DESCRIPTION__', response.description)
          .replace('__OG_SITE_NAME__', response.ogSiteName)
          .replace('__OG_TYPE__', response.ogType)
          .replace('__OG_TITLE__', response.ogTitle)
          .replace('__OG_DESCRIPTION__', response.ogDescription)
          .replace('__OG_IMAGE__', response.ogImage)
        return res.send(html)
      })
      .catch((error) => {
        return res.send(html)
      })
  })
})

app.get('/idea', (req, res, next) => {
  fs.readFile(indexPath, 'utf8', (error, html) => {
    if (error) return res.status(404).end()

    return res.send(html
      .replace('<title>Quantum</title>', `<title>Quantum | Для родителей</title>`)
      .replace('__DESCRIPTION__', 'Помогаем родителям подобрать для ребенка интересный проект: секцию, кружок, мастер класс или предложить идею нового уникального проекта')
      .replace('__OG_SITE_NAME__', 'Quantum | Для родителей')
      .replace('__OG_TYPE__', 'article')
      .replace('__OG_TITLE__', 'Реализовать идею проекта ребенка')
      .replace('__OG_DESCRIPTION__', 'Помогаем родителям подобрать для ребенка интересный проект: секцию, кружок, мастер класс или предложить идею нового уникального проекта')
      .replace('__OG_IMAGE__', 'https://selfproject.ru/forParent.png'))
  })
})

app.get('/project', (req, res, next) => {
  fs.readFile(indexPath, 'utf8', (error, html) => {
    if (error) return res.status(404).end()

    return res.send(html
      .replace('<title>Quantum</title>', `<title>Quantum | Для педагогов</title>`)
      .replace('__DESCRIPTION__', 'Помогаем педагогам развивать детские проекты: набирать детей в группы, подбирать места для проведения встреч, вести учет посещаемости и оплаты занятий')
      .replace('__OG_SITE_NAME__', 'Quantum | Для педагогов')
      .replace('__OG_TYPE__', 'article')
      .replace('__OG_TITLE__', 'Организовать детский проект')
      .replace('__OG_DESCRIPTION__', 'Помогаем педагогам развивать детские проекты: набирать детей в группы, подбирать места для проведения встреч, вести учет посещаемости и оплаты занятий')
      .replace('__OG_IMAGE__', 'https://selfproject.ru/forTeacher.png'))
  })
})

app.get('/', (req, res, next) => {
  fs.readFile(indexPath, 'utf8', (error, html) => {
    if (error) return res.status(404).end()

    return res.send(html
      .replace('<title>Quantum</title>', `<title>Quantum Evolution</title>`)
      .replace('__DESCRIPTION__', 'Помогаем педагогам и детям находить друг друга, создавать интересные проекты, подбирать места для проведения встреч')
      .replace('__OG_SITE_NAME__', 'Quantum')
      .replace('__OG_TYPE__', 'article')
      .replace('__OG_TITLE__', 'Интересные проекты и идеи для детей рядом')
      .replace('__OG_DESCRIPTION__', 'Помогаем педагогам и детям находить друг друга, создавать интересные проекты, подбирать места для проведения встреч')
      .replace('__OG_IMAGE__', 'https://selfproject.ru/forIndex.png'))
  })
})

app.use(express.static(path.resolve(__dirname, '..', 'build'), { maxAge: '30d' }))

app.listen(PORT, (error) => {
  if (error) return console.log('Error during app startup', error)

  console.log('listening on ' + PORT + '...')
})
