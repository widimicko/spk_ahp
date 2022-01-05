/* eslint-disable no-unused-vars */
import AHP from './ahp.js'
import express from 'express'

import getAllData from './data.js'
import sampleData from '../sampleData.js'

const ahpContext = new AHP()
const app = express()
const port = 3000


app.set('view engine', 'ejs')

app.get('/data', async (req, res) => {

  const data = await getAllData()
  // * Send result to client
  res.send(data)
})

app.get('/', async (req, res) => {

  // const data = await getAllData()

  const data  = sampleData

  let rankCriteria = []
  Object.entries(data.rankCriteria[0]).forEach(([key, value]) => {
    rankCriteria.push(value)
  })

  data.rankCriteria = rankCriteria

  const title = 'Beranda'
  const result = null

  // * Send result to client
  res.render('index', {title, data, result})
})

app.get('/result', async (req, res) => {

  // const data = await getAllData()

  const data = sampleData


  // * set alternatives data
  ahpContext.addItems(data.alternative)

  // * set criteria data
  ahpContext.addCriteria(data.criteria)
  
  // * set criteria scale
  let rankCriteria = []
  Object.entries(data.rankCriteria[0]).forEach(([key, value]) => {
    rankCriteria.push(value)
  })
  ahpContext.rankCriteria(rankCriteria)

  // * set alternative criteria by scale
  if (data.rankCriteriaItem) {
    let key = null
    let value = []
    Object.entries(data.rankCriteriaItem).forEach(([a, b]) => {
      key = a
      b.forEach(c => {
        Object.entries(c).forEach(([d, e]) => {
          value.push(e)
          ahpContext.rankCriteriaItem(key, value)
        })
      })
    });
  }

  // * set alternative criteria by score
  if (data.criteriaItemRank) {
    Object.entries(data.criteriaItemRank).forEach(([key, value]) => {
      ahpContext.setCriteriaItemRankByGivenScores(key, value)
    });
  }

  // * run AHP Method
  const result = ahpContext.run()

  // * add sorted DESC result
  const sortableRankedScoreMap = []
  for (const key in result.rankedScoreMap) {
    sortableRankedScoreMap.push([key, result.rankedScoreMap[key]])
  }
  const sorted = sortableRankedScoreMap.sort((a, b) => b[1] - a[1])
  result.sortedRankedScoreMap = sorted

  // * run Debugging
  const analyticContext = ahpContext.debug()
  result.analytic = analyticContext

  const title = 'Hasil'
  // * Send result to client
  res.render('result', {title, result, data})
})

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
