/* eslint-disable brace-style */
/* eslint-disable camelcase */
const monk = require('monk')
/**
 * botkit-storage-mongo - MongoDB driver for Botkit
 *
 * @param  {Object} config
 * @return {Object}
 */
module.exports = function (config) {
  if (!config || !config.mongoUri) {
    throw new Error('Need to provide mongo address.')
  }
  const db = monk(config.mongoUri)
  const Users = db.get('users')
  const Channels = db.get('channels')
  const Posts = db.get('posts')
  const Blacklist = db.get('blacklist')

  const unwrapFromList = function (cb) {
    return function (err, data) {
      if (err) return cb(err)
      cb(null, data)
    }
  }

  return {
    users: {
      get: function (id, cb) {
        Users.findOne({id: id}, unwrapFromList(cb))
      },
      save: function (data, cb) {
        Users.findOneAndUpdate({
          id: data.id
        }, data, {
          upsert: true,
          new: true
        }, cb)
      },
      find_or_create: function (data, cb) {
        Users.findOne({
          id: data.id
        }, function (err, user) {
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
      all: function (cb) {
        Users.find({}, cb)
      }
    },
    channels: {
      get: function (id, cb) {
        Channels.findOne({id: id}, unwrapFromList(cb))
      },
      save: function (data, cb) {
        Channels.findOneAndUpdate({
          id: data.id
        }, data, {
          upsert: true,
          new: true
        }, cb)
      },
      all: function (cb) {
        Channels.find({}, cb)
      }
    }
  }
}
/* eslint-disable brace-style */
/* eslint-disable camelcase */
