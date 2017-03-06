/* eslint-disable brace-style */
/* eslint-disable camelcase */
var db = require('monk')
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

  const Users = db(config.mongoUri).get('users')
  const Channels = db(config.mongoUri).get('channels')
  const Posts = db(config.mongoUri).get('posts')
  const Blacklist = db(config.mongoUri).get('blacklist')

  var unwrapFromList = function (cb) {
    return function (err, data) {
      if (err) return cb(err)
      cb(null, data)
    }
  }

  return {
    teams: { // must have botkit
      get: function (id, cb) {
        Teams.findOne({id: id}, unwrapFromList(cb))
      },
      save: function (data, cb) {
        Teams.findOneAndUpdate({
          id: data.id
        }, data, {
          upsert: true,
          new: true
        }, cb)
      },
      all: function (cb) {
        Teams.find({}, cb)
      }
    },

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
    },

    posts: {
      get: function (id, cb) {
        Posts.findOne({id: id}, unwrapFromList(cb))
      },
      save: function (data, cb) {
        Posts.findOneAndUpdate({
          id: data.id
        }, data, {
          upsert: true,
          new: true
        }, cb)
      },
      all: function (cb) {
        Posts.find({}, cb)
      }
    },

    blacklist: {
      get: function (id, cb) {
        Blacklist.findOne({id: id}, unwrapFromList(cb))
      },
      save: function (data, cb) {
        Blacklist.findOneAndUpdate({
          id: data.id
        }, data, {
          upsert: true,
          new: true
        }, cb)
      },
      all: function (cb) {
        Blacklist.find({}, cb)
      }
    }

  }
}
/* eslint-disable brace-style */
/* eslint-disable camelcase */
