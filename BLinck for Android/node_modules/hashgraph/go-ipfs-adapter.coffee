# TODO: replace with the js ipfs implementation... or native bindings

spawn = require('child_process').spawn

ipfs = (path) ->
  
  run = (args, input) ->
    new Promise (resolve, reject) ->
      process.env.IPFS_PATH = path if path?
      childProcess = spawn('ipfs', args)
      
      out = ''
      childProcess.stderr.on 'data', (data) ->
        reject data.toString()
      childProcess.stdout.on 'data', (data) ->
        out += data.toString()
      childProcess.on 'exit', (code) ->      
        if code == 0
          resolve(out) 
        if code == 1
          reject(out)
      childProcess.stdin.write(input) if input
      childProcess.stdin.end()

  publish: (value) ->
    run(['name', 'publish', value])
  
  resolve: (name) ->
    new Promise (resolve, reject) ->
      run(['name', 'resolve', name])
        .then (out) ->
          resolve(out.replace('/ipfs/','').replace('\n',''))
        .catch reject
  
  # Returns a promise that resolves to the hash of the added object
  putObject: (data) ->
    new Promise (resolve, reject) ->
      run(['object', 'put'], data)
        .then (out) ->
          resolve(out.replace('added ','').replace('\n',''))
        .catch reject
  
  # Returns a promise that resolves to the data of the requested hash
  getObject: (hash) ->
    run(['object', 'get', hash])
          
  pin: (hash) ->
    run(['pin', 'add', hash])
  
  getPeerInfo: ->
    new Promise (resolve, reject) ->
      run(['id'])
        .then (out) ->
          resolve(JSON.parse(out))
        .catch -> resolve(false)
        
  init: ->
    run(['init'])
    

    
module.exports = ipfs
