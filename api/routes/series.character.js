const router = require('express').Router({mergeParams: true})
const Series = require('../models/series')


router.get('/', async (req, res, next) => {
  const status = 200
  const {characters} = await Series.findById(req.params.seriesId).select('characters')
  
  res.json({ status, characters })
})

router.post('/', async (req, res, next) => {
  const status = 201
  const series = await Series.findById(req.params.seriesId)
  
  series.characters.push(req.body)
  await series.save()

  const character = series.characters[series.characters.length -1]
  res.json({ status, character }) 
})

router.get('/:id', async (req, res, next) => {
  const status = 200
  const series = await Series.findById(req.params.seriesId)
  const character = series.characters.id(req.params.id)
  await series.save()

  res.status(status).json({ status, character });
})

router.put('/:id', async (req, res, next) => {
  const status = 200
  const series = await Series.findById(req.params.seriesId)
  const character = series.characters.id(req.params.id)

  Object.assign(character, req.body)

  await series.save()
  
  res.status(status).json({ status, character });
})

router.delete('/:id', async (req, res, next) => {
  const status = 200
  const series = await Series.findById(req.params.seriesId)
  const character = series.characters.id(req.params.id).remove()
  await series.save()

  res.status(status).json({ status, character });
})

module.exports = router