const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// get all the projects
router.get('/', (req, res, next) => {
  Project.find()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res.json(err);
    })

});

// get a specfic project
router.get('/:id', (req, res, next) => {
  Project.findById(req.params.id)
    .then(project => {
      if (!project) {
        res.status(404).json(project);
      } else {
        res.status(200).json(project);
      }
    })
    .catch(err => {
      res.json(err);
    })
});

// create a project
router.post('/', (req, res) => {
  const { title, description } = req.body;
  Project.create({
    title,
    description
  })
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      res.json(err);
    })
})

// update a project
router.put('/:id', (req, res, next) => {
  const { title, description } = req.body;
  Project.findByIdAndUpdate(
    req.params.id,
    { title, description },
    // this ensures that we are getting the updated document as a return 
    { new: true }
  )
    .then(project => {
      console.log(project);
      res.status(200).json(project);
    })
    .catch(err => {

    })
});

router.delete('/:id', (req, res, next) => {
  Project.findByIdAndDelete(req.params.id)
    .then(project => {
      res.status(200).json({ message: 'ok' })
    })
    .catch(err => {
      res.json(err);
    })
});




module.exports = router;