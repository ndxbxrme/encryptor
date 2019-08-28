'use strict'

crypto = require 'crypto'

algorithm = 'aes-256-ctr'
key = Buffer.alloc 32
iv = Buffer.alloc(16, 0)

setPassword = (password) ->
  key = Buffer.concat [Buffer.from(password)], key.length
encrypt = (text) ->
  new Promise (resolve, reject) ->
    cipher = crypto.createCipheriv algorithm, key, iv
    encrypted = ''
    cipher.on 'readable', ->
      chunk = null
      while null isnt (chunk = cipher.read())
        encrypted += chunk.toString 'hex'
    cipher.on 'end', ->
      resolve encrypted
    cipher.write text
    cipher.end()
decrypt = (text) ->
  new Promise (resolve, reject) ->
    decipher = crypto.createDecipheriv algorithm, key, iv
    encrypted = ''
    decipher.on 'readable', ->
      chunk = null
      while null isnt (chunk = decipher.read())
        encrypted += chunk.toString 'utf8'
    decipher.on 'end', ->
      resolve encrypted
    decipher.write text, 'hex'
    decipher.end()

module.exports =
  setPassword: setPassword
  encrypt: encrypt
  decrypt: decrypt