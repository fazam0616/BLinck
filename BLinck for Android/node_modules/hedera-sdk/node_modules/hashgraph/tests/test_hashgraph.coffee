hashgraph1 = require('hashgraph')(path: '~/.hashgraph_test_1', logPrefix: '1 |')
hashgraph1.init().catch console.error

hashgraph1.on 'ready', ->
  hashgraph1.start()
  peer1ID = hashgraph1.info().peerID
  
  hashgraph2 = require('hashgraph')(path: '~/.hashgraph_test_2', logPrefix: '2 |')
  hashgraph2.init().catch console.error

  hashgraph2.on 'ready', ->
    
    peer2ID = hashgraph2.info().peerID
    
    hashgraph2.join(peer1ID)
    hashgraph2.start()
