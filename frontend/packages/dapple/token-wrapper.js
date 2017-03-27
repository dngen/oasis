if (typeof Dapple === 'undefined') {
  Dapple = {};
}

if (typeof web3 === 'undefined' && typeof Web3 === 'undefined') {
  var Web3 = require('web3');
}

Dapple['token-wrapper'] = (function builder () {
  var environments = {
      'develop': {},
      'ropsten': {
        'gnt': {
          'type': 'GolemNetworkToken',
          'value': '0x7fb3c4ff78bd0305a6ec436eda79303f981c5938'
        },
        'GNT_wrapper': {
          'value': '0xa5d92f318247c3b43241436dbb55ec4be600dc42',
          'type': 'TokenWrapper[74e33d3d8845c25656659612e0989064a5ac9732b29bdd6f942dc662407827bd]'
        }
      },
      'live': {
        'gnt': {
          'type': 'GolemNetworkToken',
          'value': '0xa74476443119A942dE498590Fe1f2454d7D4aC0d'
        },
        'GNT_wrapper': {
          'value': '0x01afc37f4f85babc47c0e2d0eababc7fb49793c8',
          'type': 'TokenWrapper[b10b907625d773ba71be6676c46c412e3736d4bb27ec4f9f0f45a52d7fa3685c]'
        }
      }
    };

  function ContractWrapper (headers, _web3) {
    if (!_web3) {
      throw new Error('Must supply a Web3 connection!');
    }

    this.headers = headers;
    this._class = _web3.eth.contract(headers.interface);
  }

  ContractWrapper.prototype.deploy = function () {
    throw new Error('Module was built without any deploy data.');
  };

  ContractWrapper.prototype.new = function () {
    throw new Error('Module was built without any deploy data.');
  };

  var passthroughs = ['at'];
  for (var i = 0; i < passthroughs.length; i += 1) {
    ContractWrapper.prototype[passthroughs[i]] = (function (passthrough) {
      return function () {
        return this._class[passthrough].apply(this._class, arguments);
      };
    })(passthroughs[i]);
  }

  function constructor (_web3, env) {
    if (!env) {
      env = {
      'objects': {},
      'type': 'internal'
    };
    }
    if(!("objects" in env) && typeof env === "object") {
      env = {objects: env};
    }
    while (typeof env !== 'object') {
      if (!(env in environments)) {
        throw new Error('Cannot resolve environment name: ' + env);
      }
      env = environments[env];
    }

    if (typeof _web3 === 'undefined') {
      if (!env.rpcURL) {
        throw new Error('Need either a Web3 instance or an RPC URL!');
      }
      _web3 = new Web3(new Web3.providers.HttpProvider(env.rpcURL));
    }

    this.headers = {
      'Callback': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'addr',
                'type': 'address'
              },
              {
                'name': 'eventName',
                'type': 'string'
              },
              {
                'name': 'functioncall',
                'type': 'string'
              }
            ],
            'name': 'on',
            'outputs': [],
            'payable': false,
            'type': 'function'
          }
        ]
      },
      'DappleEnv': {
        'interface': [
          {
            'inputs': [],
            'payable': false,
            'type': 'constructor'
          }
        ]
      },
      'DappleLogger': {
        'interface': []
      },
      'DeployGNTWrapper': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'name',
                'type': 'bytes32'
              },
              {
                'name': 'addr',
                'type': 'address'
              }
            ],
            'name': 'export',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'txoff',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'txon',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'inputs': [],
            'payable': false,
            'type': 'constructor'
          },
          {
            'payable': false,
            'type': 'fallback'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'name',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'number',
                'type': 'uint256'
              }
            ],
            'name': 'exportNumber',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'name',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'addr',
                'type': 'address'
              }
            ],
            'name': 'exportObject',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'flag',
                'type': 'bool'
              }
            ],
            'name': 'setCalls',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'origin',
                'type': 'address'
              }
            ],
            'name': 'setOrigin',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'chaintype',
                'type': 'bytes32'
              }
            ],
            'name': 'assertChain',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'env',
                'type': 'bytes32'
              }
            ],
            'name': 'pushEnv',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'env',
                'type': 'bytes32'
              }
            ],
            'name': 'popEnv',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'addr',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': 'eventName',
                'type': 'string'
              },
              {
                'indexed': false,
                'name': 'functioncall',
                'type': 'string'
              }
            ],
            'name': 'on',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'input',
                'type': 'bytes'
              },
              {
                'indexed': false,
                'name': 'result',
                'type': 'uint256'
              }
            ],
            'name': 'shUint',
            'type': 'event'
          }
        ]
      },
      'DeployMockTokenAndWrapper': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'name',
                'type': 'bytes32'
              },
              {
                'name': 'addr',
                'type': 'address'
              }
            ],
            'name': 'export',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'txoff',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'txon',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'inputs': [],
            'payable': false,
            'type': 'constructor'
          },
          {
            'payable': false,
            'type': 'fallback'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'name',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'number',
                'type': 'uint256'
              }
            ],
            'name': 'exportNumber',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'name',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'addr',
                'type': 'address'
              }
            ],
            'name': 'exportObject',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'flag',
                'type': 'bool'
              }
            ],
            'name': 'setCalls',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'origin',
                'type': 'address'
              }
            ],
            'name': 'setOrigin',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'chaintype',
                'type': 'bytes32'
              }
            ],
            'name': 'assertChain',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'env',
                'type': 'bytes32'
              }
            ],
            'name': 'pushEnv',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'env',
                'type': 'bytes32'
              }
            ],
            'name': 'popEnv',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'addr',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': 'eventName',
                'type': 'string'
              },
              {
                'indexed': false,
                'name': 'functioncall',
                'type': 'string'
              }
            ],
            'name': 'on',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'input',
                'type': 'bytes'
              },
              {
                'indexed': false,
                'name': 'result',
                'type': 'uint256'
              }
            ],
            'name': 'shUint',
            'type': 'event'
          }
        ]
      },
      'DepositBroker': {
        'interface': [
          {
            'constant': false,
            'inputs': [],
            'name': 'clear',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'inputs': [
              {
                'name': 'token',
                'type': 'address'
              }
            ],
            'payable': false,
            'type': 'constructor'
          }
        ]
      },
      'DepositBrokerInterface': {
        'interface': [
          {
            'constant': false,
            'inputs': [],
            'name': 'clear',
            'outputs': [],
            'payable': false,
            'type': 'function'
          }
        ]
      },
      'GNTAllocation': {
        'interface': [
          {
            'constant': false,
            'inputs': [],
            'name': 'unlock',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'inputs': [
              {
                'name': '_golemFactory',
                'type': 'address'
              }
            ],
            'payable': false,
            'type': 'constructor'
          }
        ]
      },
      'GolemNetworkToken': {
        'interface': [
          {
            'constant': true,
            'inputs': [],
            'name': 'name',
            'outputs': [
              {
                'name': '',
                'type': 'string'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'golemFactory',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'totalSupply',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': '_master',
                'type': 'address'
              }
            ],
            'name': 'setMigrationMaster',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'decimals',
            'outputs': [
              {
                'name': '',
                'type': 'uint8'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': '_value',
                'type': 'uint256'
              }
            ],
            'name': 'migrate',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'finalize',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'refund',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'migrationMaster',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'tokenCreationCap',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': '_owner',
                'type': 'address'
              }
            ],
            'name': 'balanceOf',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': '_agent',
                'type': 'address'
              }
            ],
            'name': 'setMigrationAgent',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'migrationAgent',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'fundingEndBlock',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'totalMigrated',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'symbol',
            'outputs': [
              {
                'name': '',
                'type': 'string'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': '_to',
                'type': 'address'
              },
              {
                'name': '_value',
                'type': 'uint256'
              }
            ],
            'name': 'transfer',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'tokenCreationMin',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'funding',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'tokenCreationRate',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'fundingStartBlock',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'create',
            'outputs': [],
            'payable': true,
            'type': 'function'
          },
          {
            'inputs': [
              {
                'name': '_golemFactory',
                'type': 'address'
              },
              {
                'name': '_migrationMaster',
                'type': 'address'
              },
              {
                'name': '_fundingStartBlock',
                'type': 'uint256'
              },
              {
                'name': '_fundingEndBlock',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'constructor'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': '_from',
                'type': 'address'
              },
              {
                'indexed': true,
                'name': '_to',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': '_value',
                'type': 'uint256'
              }
            ],
            'name': 'Transfer',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': '_from',
                'type': 'address'
              },
              {
                'indexed': true,
                'name': '_to',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': '_value',
                'type': 'uint256'
              }
            ],
            'name': 'Migrate',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': '_from',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': '_value',
                'type': 'uint256'
              }
            ],
            'name': 'Refund',
            'type': 'event'
          }
        ]
      },
      'MigrationAgent': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': '_from',
                'type': 'address'
              },
              {
                'name': '_value',
                'type': 'uint256'
              }
            ],
            'name': 'migrateFrom',
            'outputs': [],
            'payable': false,
            'type': 'function'
          }
        ]
      },
      'ReducedToken': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': '_value',
                'type': 'uint256'
              }
            ],
            'name': 'migrate',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': '_owner',
                'type': 'address'
              }
            ],
            'name': 'balanceOf',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': '_to',
                'type': 'address'
              },
              {
                'name': '_value',
                'type': 'uint256'
              }
            ],
            'name': 'transfer',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          }
        ]
      },
      'SMS': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'number',
                'type': 'string'
              },
              {
                'name': 'message',
                'type': 'string'
              }
            ],
            'name': 'send',
            'outputs': [],
            'payable': false,
            'type': 'function'
          }
        ]
      },
      'Script': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'name',
                'type': 'bytes32'
              },
              {
                'name': 'addr',
                'type': 'address'
              }
            ],
            'name': 'export',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'txoff',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'txon',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'inputs': [],
            'payable': false,
            'type': 'constructor'
          },
          {
            'payable': false,
            'type': 'fallback'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'name',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'number',
                'type': 'uint256'
              }
            ],
            'name': 'exportNumber',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'name',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'addr',
                'type': 'address'
              }
            ],
            'name': 'exportObject',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'flag',
                'type': 'bool'
              }
            ],
            'name': 'setCalls',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'origin',
                'type': 'address'
              }
            ],
            'name': 'setOrigin',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'chaintype',
                'type': 'bytes32'
              }
            ],
            'name': 'assertChain',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'env',
                'type': 'bytes32'
              }
            ],
            'name': 'pushEnv',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'env',
                'type': 'bytes32'
              }
            ],
            'name': 'popEnv',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'addr',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': 'eventName',
                'type': 'string'
              },
              {
                'indexed': false,
                'name': 'functioncall',
                'type': 'string'
              }
            ],
            'name': 'on',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'input',
                'type': 'bytes'
              },
              {
                'indexed': false,
                'name': 'result',
                'type': 'uint256'
              }
            ],
            'name': 'shUint',
            'type': 'event'
          }
        ]
      },
      'SetupTokenBalances': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'name',
                'type': 'bytes32'
              },
              {
                'name': 'addr',
                'type': 'address'
              }
            ],
            'name': 'export',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'txoff',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'txon',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'inputs': [],
            'payable': false,
            'type': 'constructor'
          },
          {
            'payable': false,
            'type': 'fallback'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'name',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'number',
                'type': 'uint256'
              }
            ],
            'name': 'exportNumber',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'name',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'addr',
                'type': 'address'
              }
            ],
            'name': 'exportObject',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'flag',
                'type': 'bool'
              }
            ],
            'name': 'setCalls',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'origin',
                'type': 'address'
              }
            ],
            'name': 'setOrigin',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'chaintype',
                'type': 'bytes32'
              }
            ],
            'name': 'assertChain',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'env',
                'type': 'bytes32'
              }
            ],
            'name': 'pushEnv',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'env',
                'type': 'bytes32'
              }
            ],
            'name': 'popEnv',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'addr',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': 'eventName',
                'type': 'string'
              },
              {
                'indexed': false,
                'name': 'functioncall',
                'type': 'string'
              }
            ],
            'name': 'on',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'input',
                'type': 'bytes'
              },
              {
                'indexed': false,
                'name': 'result',
                'type': 'uint256'
              }
            ],
            'name': 'shUint',
            'type': 'event'
          }
        ]
      },
      'System': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'input',
                'type': 'string'
              }
            ],
            'name': 'to_uint',
            'outputs': [
              {
                'name': 'output',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          }
        ]
      },
      'TokenWrapper': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'spender',
                'type': 'address'
              },
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'approve',
            'outputs': [
              {
                'name': 'ok',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'totalSupply',
            'outputs': [
              {
                'name': 'supply',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'from',
                'type': 'address'
              },
              {
                'name': 'to',
                'type': 'address'
              },
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'transferFrom',
            'outputs': [
              {
                'name': 'ok',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'amount',
                'type': 'uint256'
              }
            ],
            'name': 'withdraw',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'amount',
                'type': 'uint256'
              }
            ],
            'name': 'notifyDeposit',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'createBroker',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'who',
                'type': 'address'
              }
            ],
            'name': 'balanceOf',
            'outputs': [
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'to',
                'type': 'address'
              },
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'transfer',
            'outputs': [
              {
                'name': 'ok',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'owner',
                'type': 'address'
              }
            ],
            'name': 'getBroker',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'owner',
                'type': 'address'
              },
              {
                'name': 'spender',
                'type': 'address'
              }
            ],
            'name': 'allowance',
            'outputs': [
              {
                'name': '_allowance',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'inputs': [
              {
                'name': 'unwrapped',
                'type': 'address'
              }
            ],
            'payable': false,
            'type': 'constructor'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'broker',
                'type': 'address'
              }
            ],
            'name': 'LogBroker',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'from',
                'type': 'address'
              },
              {
                'indexed': true,
                'name': 'to',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'Transfer',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'owner',
                'type': 'address'
              },
              {
                'indexed': true,
                'name': 'spender',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'Approval',
            'type': 'event'
          }
        ]
      },
      'TokenWrapperEvents': {
        'interface': [
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'broker',
                'type': 'address'
              }
            ],
            'name': 'LogBroker',
            'type': 'event'
          }
        ]
      },
      'TokenWrapperInterface': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'spender',
                'type': 'address'
              },
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'approve',
            'outputs': [
              {
                'name': 'ok',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'totalSupply',
            'outputs': [
              {
                'name': 'supply',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'from',
                'type': 'address'
              },
              {
                'name': 'to',
                'type': 'address'
              },
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'transferFrom',
            'outputs': [
              {
                'name': 'ok',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'amount',
                'type': 'uint256'
              }
            ],
            'name': 'withdraw',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'amount',
                'type': 'uint256'
              }
            ],
            'name': 'notifyDeposit',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'createBroker',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'who',
                'type': 'address'
              }
            ],
            'name': 'balanceOf',
            'outputs': [
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'to',
                'type': 'address'
              },
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'transfer',
            'outputs': [
              {
                'name': 'ok',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'owner',
                'type': 'address'
              }
            ],
            'name': 'getBroker',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'owner',
                'type': 'address'
              },
              {
                'name': 'spender',
                'type': 'address'
              }
            ],
            'name': 'allowance',
            'outputs': [
              {
                'name': '_allowance',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'from',
                'type': 'address'
              },
              {
                'indexed': true,
                'name': 'to',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'Transfer',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'owner',
                'type': 'address'
              },
              {
                'indexed': true,
                'name': 'spender',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'Approval',
            'type': 'event'
          }
        ]
      }
    };

    this.classes = {};
    for (var key in this.headers) {
      this.classes[key] = new ContractWrapper(this.headers[key], _web3);
    }

    this.objects = {};
    for (var i in env.objects) {
      var obj = env.objects[i];
      if(!(obj['type'].split('[')[0] in this.classes)) continue;
      this.objects[i] = this.classes[obj['type'].split('[')[0]].at(obj.value);
    }
  }

  return {
    class: constructor,
    environments: environments
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Dapple['token-wrapper'];
}
