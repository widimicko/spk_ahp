/* eslint-disable no-unused-vars */
import AHP from './ahp.js'
import express from 'express'

import getAllData from './data.js'

const sampleData = {
  // Array
  "alternative": [
    "Riski",
    "Shania",
    "Anggun",
    "Oktadear",
    "Bayu"
  ],
  // Array
  "criteria": [
    "Keaktifan Organisasi",
    "Karya Tulis",
    "IPK"
  ],
  // ! Array -> Object (dump value (0, 1, 2, ...)) -> Array
  "rankCriteria": [
    {
      "0": [
        "Keaktifan Organisasi",
        "Karya Tulis",
        0.5
      ],
      "1": [
        "Keaktifan Organisasi",
        "IPK",
        3
      ],
      "2": [
        "Karya Tulis",
        "IPK",
        0.66666666666666666666666666666667
      ]
    }
  ],
  // ! Object (criteria as a key) -> Array (value)
  "criteriaItemRank": {
    "Keaktifan Organisasi": [
      90,
      75,
      90,
      70,
      90
    ],
    "Karya Tulis": [
      80,
      90,
      70,
      80,
      75
    ],
    "IPK": [
      3.5,
      3.8,
      3.3,
      3.4,
      3.5
    ]
  },
  // ! Object (criteria as a key) -> array -> Object (dump value (0, 1, 2, ...)) -> array (scale)
  // "rankCriteriaItem": {
  //   "style": [
  //     {
  //       "0": [
  //         "civic",
  //         "saturn",
  //         0.25
  //       ],
  //       "1": [
  //         "civic",
  //         "escort",
  //         4
  //       ],
  //       "2": [
  //         "civic",
  //         "miata",
  //         0.16666666666666666
  //       ],
  //       "3": [
  //         "saturn",
  //         "escort",
  //         4
  //       ],
  //       "4": [
  //         "saturn",
  //         "miata",
  //         0.25
  //       ],
  //       "5": [
  //         "escort",
  //         "miata",
  //         0.2
  //       ]
  //     }
  //   ],
  //   "reliability": [
  //     {
  //       "0": [
  //         "civic",
  //         "saturn",
  //         2
  //       ],
  //       "1": [
  //         "civic",
  //         "escort",
  //         5
  //       ],
  //       "2": [
  //         "civic",
  //         "miata",
  //         1
  //       ],
  //       "3": [
  //         "saturn",
  //         "escort",
  //         3
  //       ],
  //       "4": [
  //         "saturn",
  //         "miata",
  //         2
  //       ],
  //       "5": [
  //         "escort",
  //         "miata",
  //         0.25
  //       ]
  //     }
  //   ]
  // }
}

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
