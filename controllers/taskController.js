const db = require("../models");

// Defining methods for the tasksController
module.exports = {
  findAll: function (req, res) {

    db.Task
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));

  },

  getUser: function (req, res) {
    // console.log('user', req.user)

    db.Task
      .find(req.query)
      .then(dbModel => res.json(
        {
          username: req.user._id,
          name: req.user.name
        }))
  },

  findById: function (req, res) {
    //console.log(res)
    console.log(req.params.id)
    db.Task
      .findById({ _id: req.params.id })
      .then(dbModel => res.json({
          count: dbModel.count
      }))
      .catch(err => res.status(422).json(err));
  },

  create: function (req, res) {

    db.Task
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => {
        console.log(err)
        res.status(422).json(err)
      });
  },

  update: function (req, res) {
    
    db.Task
      .findOneAndUpdate({ _id: req.params.id },
        { $inc: { completed: 1 },
         $set: { count: req.params.count}

      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  remove: function (req, res) {
    
    db.Task
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
