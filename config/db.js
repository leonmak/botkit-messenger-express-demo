/* eslint-disable brace-style */
/* eslint-disable camelcase */
var db = require('monk')
/**
 * botkit-storage-mongo - MongoDB driver for Botkit
 *
 * @param  {Object} config
 * @return {Object}
 */
module.exports = (config) => {
  if (!config || !config.mongoUri) {
    throw new Error('Need to provide mongo address.')
  }

  const Users = db(config.mongoUri).get('users')
  const Channels = db(config.mongoUri).get('channels')
  const Posts = db(config.mongoUri).get('posts')

  var unwrapFromList = (cb) => {
    return (err, data) => {
      if (err) return cb(err)
      cb(null, data)
    }
  }

  return {
    teams: { // must have botkit
      get: (id, cb) => {
        Teams.findOne({id: id}, unwrapFromList(cb))
      },
      save: (data, cb) => {
        Teams.findOneAndUpdate({
          id: data.id
        }, data, {
          upsert: true,
          new: true
        }, cb)
      },
      all: (cb) => {
        Teams.find({}, cb)
      }
    },

    users: {
      get: (id, cb) => {
        Users.findOne({id: id}, unwrapFromList(cb))
      },
      save: (data, cb) => {
        Users.findOneAndUpdate({
          id: data.id
        }, data, {
          upsert: true,
          new: true
        }, cb)
      },
      find_or_create: (data, cb) => {
        Users.findOne({
          id: data.id
        }, (err, user) => {
          if (err) {
            cb(err)
          }
          else if (!user) {
            Users.findOneAndUpdate({
              id: data.id
            }, data, {
              upsert: true,
              new: true
            }, cb)
          }
                    else {
            cb(null, user)
          }
        })
      },
      all: (cb) => {
        return Users.find({}, cb)
      }
    },

    channels: {
      get: (id, cb) => {
        Channels.findOne({id: id}, unwrapFromList(cb))
      },
      save: (data, cb) => {
        Channels.findOneAndUpdate({
          id: data.id
        }, data, {
          upsert: true,
          new: true
        }, cb)
      },
      all: (cb) => {
        Channels.find({}, cb)
      }
    },

    posts: {
      count: () => {
        return Posts.count()
      },
      get: (id, cb) => {
        Posts.findOne({id: id}, unwrapFromList(cb))
      },
      save: (data, cb) => {
        return Posts.findOneAndUpdate({
          id: data.id
        }, data, {
          upsert: true,
          new: true
        }, cb)
      },
      all: (cb) => {
        Posts.find({}, cb)
      }
    }
  }
}
/* eslint-disable brace-style */
/* eslint-disable camelcase */
