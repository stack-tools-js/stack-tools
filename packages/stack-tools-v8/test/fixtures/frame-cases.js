module.exports = [
  {
    string: '    at foo (<anonymous>:419:60)',
    object: {
      type: 'CallSiteFrame',
      callSite: {
        call: {
          type: 'Call',
          constructor: false,
          async: false,
          function: 'foo',
          method: 'foo',
        },
        site: {
          type: 'FileSite',
          locator: {
            type: 'AnonymousLocator',
          },
          position: {
            type: 'Position',
            line: 419,
            column: 60,
          },
        },
      },
      evalCallSite: undefined,
    },
    strict: true,
  },
  {
    string: '    at Object.[foo] (__dirname/generate-parse-fixture.js:419:60)',
    object: {
      type: 'CallSiteFrame',
      callSite: {
        call: {
          type: 'Call',
          constructor: false,
          async: false,
          function: 'Object.[foo]',
          method: 'Object.[foo]',
        },
        site: {
          type: 'FileSite',
          locator: {
            type: 'PathLocator',
            path: '__dirname/generate-parse-fixture.js',
          },
          position: {
            type: 'Position',
            line: 419,
            column: 60,
          },
        },
      },
      evalCallSite: undefined,
    },
    strict: true,
  },
  {
    string: '    at Object.<anonymous> (__dirname/generate-parse-fixture.js:419:60)',
    object: {
      type: 'CallSiteFrame',
      callSite: {
        call: {
          type: 'Call',
          constructor: false,
          async: false,
          function: 'Object.<anonymous>',
          method: 'Object.<anonymous>',
        },
        site: {
          type: 'FileSite',
          locator: {
            type: 'PathLocator',
            path: '__dirname/generate-parse-fixture.js',
          },
          position: {
            type: 'Position',
            line: 419,
            column: 60,
          },
        },
      },
      evalCallSite: undefined,
    },
    strict: true,
  },
  {
    string: '    at Object.<anonymous> (file://__dirname/generate-parse-fixture.js:419:60)',
    object: {
      type: 'CallSiteFrame',
      callSite: {
        call: {
          type: 'Call',
          constructor: false,
          async: false,
          function: 'Object.<anonymous>',
          method: 'Object.<anonymous>',
        },
        site: {
          type: 'FileSite',
          locator: {
            type: 'URILocator',
            scheme: 'file',
            path: '__dirname/generate-parse-fixture.js',
          },
          position: {
            type: 'Position',
            line: 419,
            column: 60,
          },
        },
      },
      evalCallSite: undefined,
    },
    strict: true,
  },
  {
    string: '    at Module._compile (module.js:571:32)',
    object: {
      type: 'CallSiteFrame',
      callSite: {
        call: {
          type: 'Call',
          constructor: false,
          async: false,
          function: 'Module._compile',
          method: 'Module._compile',
        },
        site: {
          type: 'FileSite',
          locator: {
            type: 'PathLocator',
            path: 'module.js',
          },
          position: {
            type: 'Position',
            line: 571,
            column: 32,
          },
        },
      },
      evalCallSite: undefined,
    },
    strict: true,
  },
  {
    string: '    at Object.Module._extensions..js (module.js:580:10)',
    object: {
      type: 'CallSiteFrame',
      callSite: {
        call: {
          type: 'Call',
          constructor: false,
          async: false,
          function: 'Object.Module._extensions..js',
          method: 'Object.Module._extensions..js',
        },
        site: {
          type: 'FileSite',
          locator: {
            type: 'PathLocator',
            path: 'module.js',
          },
          position: {
            type: 'Position',
            line: 580,
            column: 10,
          },
        },
      },
      evalCallSite: undefined,
    },
    strict: true,
  },
  {
    string: '    at Module.load (module.js:488:32)',
    object: {
      type: 'CallSiteFrame',
      callSite: {
        call: {
          type: 'Call',
          constructor: false,
          async: false,
          function: 'Module.load',
          method: 'Module.load',
        },
        site: {
          type: 'FileSite',
          locator: {
            type: 'PathLocator',
            path: 'module.js',
          },
          position: {
            type: 'Position',
            line: 488,
            column: 32,
          },
        },
      },
      evalCallSite: undefined,
    },
    strict: true,
  },
  {
    string: '    at tryModuleLoad (module.js:447:12)',
    object: {
      type: 'CallSiteFrame',
      callSite: {
        call: {
          type: 'Call',
          constructor: false,
          async: false,
          function: 'tryModuleLoad',
          method: 'tryModuleLoad',
        },
        site: {
          type: 'FileSite',
          locator: {
            type: 'PathLocator',
            path: 'module.js',
          },
          position: {
            type: 'Position',
            line: 447,
            column: 12,
          },
        },
      },
      evalCallSite: undefined,
    },
    strict: true,
  },
  {
    string: '    at Function.Module._load (module.js:439:3)',
    object: {
      type: 'CallSiteFrame',
      callSite: {
        call: {
          type: 'Call',
          constructor: false,
          async: false,
          function: 'Function.Module._load',
          method: 'Function.Module._load',
        },
        site: {
          type: 'FileSite',
          locator: {
            type: 'PathLocator',
            path: 'module.js',
          },
          position: {
            type: 'Position',
            line: 439,
            column: 3,
          },
        },
      },
      evalCallSite: undefined,
    },
    strict: true,
  },
  {
    string: '    at Module.runMain (module.js:605:10)',
    object: {
      type: 'CallSiteFrame',
      callSite: {
        call: {
          type: 'Call',
          constructor: false,
          async: false,
          function: 'Module.runMain',
          method: 'Module.runMain',
        },
        site: {
          type: 'FileSite',
          locator: {
            type: 'PathLocator',
            path: 'module.js',
          },
          position: {
            type: 'Position',
            line: 605,
            column: 10,
          },
        },
      },
      evalCallSite: undefined,
    },
    strict: true,
  },
  {
    string: '    at run (bootstrap_node.js:418:7)',
    object: {
      type: 'CallSiteFrame',
      callSite: {
        call: {
          type: 'Call',
          constructor: false,
          async: false,
          function: 'run',
          method: 'run',
        },
        site: {
          type: 'FileSite',
          locator: {
            type: 'PathLocator',
            path: 'bootstrap_node.js',
          },
          position: {
            type: 'Position',
            line: 418,
            column: 7,
          },
        },
      },
      evalCallSite: undefined,
    },
    strict: true,
  },
  {
    string: '    at startup (bootstrap_node.js:139:9)',
    object: {
      type: 'CallSiteFrame',
      callSite: {
        call: {
          type: 'Call',
          constructor: false,
          async: false,
          function: 'startup',
          method: 'startup',
        },
        site: {
          type: 'FileSite',
          locator: {
            type: 'PathLocator',
            path: 'bootstrap_node.js',
          },
          position: {
            type: 'Position',
            line: 139,
            column: 9,
          },
        },
      },
      evalCallSite: undefined,
    },
    strict: true,
  },
  {
    string:
      '    at Object.asdf ][)( \u0000\u0001\u0002\u0003\u001b[44;37m foo (__dirname/generate-parse-fixture.js:419:60)',
    object: {
      type: 'CallSiteFrame',
      callSite: {
        call: {
          type: 'Call',
          constructor: false,
          async: false,
          function: 'Object.asdf ][)( \u0000\u0001\u0002\u0003\u001b[44;37m foo',
          method: 'Object.asdf ][)( \u0000\u0001\u0002\u0003\u001b[44;37m foo',
        },
        site: {
          type: 'FileSite',
          locator: {
            type: 'PathLocator',
            path: '__dirname/generate-parse-fixture.js',
          },
          position: {
            type: 'Position',
            line: 419,
            column: 60,
          },
        },
      },
      evalCallSite: undefined,
    },
    strict: false,
  },
  {
    string:
      '    at Object.asdf (__dirname/generate-parse-fixture.js:419:60) (__dirname/generate-parse-fixture.js:419:60)',
    object: {
      type: 'CallSiteFrame',
      callSite: {
        call: {
          type: 'Call',
          constructor: false,
          async: false,
          function: 'Object.asdf (__dirname/generate-parse-fixture.js:419:60)',
          method: 'Object.asdf (__dirname/generate-parse-fixture.js:419:60)',
        },
        site: {
          type: 'FileSite',
          locator: {
            type: 'PathLocator',
            path: '__dirname/generate-parse-fixture.js',
          },
          position: {
            type: 'Position',
            line: 419,
            column: 60,
          },
        },
      },
      evalCallSite: undefined,
    },
    strict: false,
  },
  {
    string: '    at Object.a (s) d [f] (__dirname/generate-parse-fixture.js:419:60)',
    object: {
      type: 'CallSiteFrame',
      callSite: {
        call: {
          type: 'Call',
          constructor: false,
          async: false,
          function: 'Object.a (s) d [f]',
          method: 'Object.a (s) d [f]',
        },
        site: {
          type: 'FileSite',
          locator: {
            type: 'PathLocator',
            path: '__dirname/generate-parse-fixture.js',
          },
          position: {
            type: 'Position',
            line: 419,
            column: 60,
          },
        },
      },
      evalCallSite: undefined,
    },
    strict: false,
  },
  {
    string: '    at Object.eval (__dirname/generate-parse-fixture.js:419:60)',
    object: {
      type: 'CallSiteFrame',
      callSite: {
        call: {
          type: 'Call',
          constructor: false,
          async: false,
          function: 'Object.eval',
          method: 'Object.eval',
        },
        site: {
          type: 'FileSite',
          locator: {
            type: 'PathLocator',
            path: '__dirname/generate-parse-fixture.js',
          },
          position: {
            type: 'Position',
            line: 419,
            column: 60,
          },
        },
      },
      evalCallSite: undefined,
    },
    strict: true,
  },
  {
    string: '    at Object.eval (__dirname/generate-parse- (fixture.js:419:60)',
    object: {
      type: 'CallSiteFrame',
      callSite: {
        call: {
          type: 'Call',
          constructor: false,
          async: false,
          function: 'Object.eval (__dirname/generate-parse-',
          method: 'Object.eval (__dirname/generate-parse-',
        },
        site: {
          type: 'FileSite',
          locator: {
            type: 'PathLocator',
            path: 'fixture.js',
          },
          position: {
            type: 'Position',
            line: 419,
            column: 60,
          },
        },
      },
      evalCallSite: undefined,
    },
  },
  {
    string:
      '    at eval (eval at <anonymous> (__dirname/generate-parse-fixture.js:419:60), <anonymous>:1:5)',
    object: {
      type: 'CallSiteFrame',
      callSite: {
        call: {
          type: 'Call',
          constructor: false,
          async: false,
          function: 'eval',
          method: 'eval',
        },
        site: {
          type: 'FileSite',
          locator: {
            type: 'AnonymousLocator',
          },
          position: {
            type: 'Position',
            line: 1,
            column: 5,
          },
        },
      },
      evalCallSite: {
        call: {
          type: 'Call',
          constructor: false,
          async: false,
          function: '<anonymous>',
          method: '<anonymous>',
        },
        site: {
          type: 'FileSite',
          locator: {
            type: 'PathLocator',
            path: '__dirname/generate-parse-fixture.js',
          },
          position: {
            type: 'Position',
            line: 419,
            column: 60,
          },
        },
      },
    },
    strict: true,
  },
  {
    string: '    at eval (eval at <anonymous> ():419:60), <anonymous>:1:5)',
    object: {
      type: 'CallSiteFrame',
      callSite: {
        call: {
          type: 'Call',
          constructor: false,
          async: false,
          function: 'eval',
          method: 'eval',
        },
        site: {
          type: 'FileSite',
          locator: {
            type: 'AnonymousLocator',
          },
          position: {
            type: 'Position',
            line: 1,
            column: 5,
          },
        },
      },
      evalCallSite: {
        call: {
          type: 'Call',
          constructor: false,
          async: false,
          function: '<anonymous>',
          method: '<anonymous>',
        },
        site: {
          type: 'FileSite',
          locator: {
            type: 'PathLocator',
            path: ')',
          },
          position: {
            type: 'Position',
            line: 419,
            column: 60,
          },
        },
      },
    },
  },
  {
    string: '    at eval (eval at evalFunction (a file with eval .js:1:23), <anonymous>:1:5)',
    object: {
      type: 'CallSiteFrame',
      callSite: {
        call: {
          type: 'Call',
          constructor: false,
          async: false,
          function: 'eval',
          method: 'eval',
        },
        site: {
          type: 'FileSite',
          locator: {
            type: 'AnonymousLocator',
          },
          position: {
            type: 'Position',
            line: 1,
            column: 5,
          },
        },
      },
      evalCallSite: {
        call: {
          type: 'Call',
          constructor: false,
          async: false,
          function: 'evalFunction',
          method: 'evalFunction',
        },
        site: {
          type: 'FileSite',
          locator: {
            type: 'PathLocator',
            path: 'a file with eval .js',
          },
          position: {
            type: 'Position',
            line: 1,
            column: 23,
          },
        },
      },
    },
    strict: true,
  },
  {
    string: '    at evalFunction (a file with eval .js:1:23)',
    object: {
      type: 'CallSiteFrame',
      callSite: {
        call: {
          type: 'Call',
          constructor: false,
          async: false,
          function: 'evalFunction',
          method: 'evalFunction',
        },
        site: {
          type: 'FileSite',
          locator: {
            type: 'PathLocator',
            path: 'a file with eval .js',
          },
          position: {
            type: 'Position',
            line: 1,
            column: 23,
          },
        },
      },
      evalCallSite: undefined,
    },
    strict: true,
  },
  {
    string: '    at a file with eval .js:1:41',
    object: {
      type: 'CallSiteFrame',
      callSite: {
        call: undefined,
        site: {
          type: 'FileSite',
          locator: {
            type: 'PathLocator',
            path: 'a file with eval .js',
          },
          position: {
            type: 'Position',
            line: 1,
            column: 41,
          },
        },
      },
      evalCallSite: undefined,
    },
    strict: true,
  },
  {
    string: '    at file://a file with eval .js:1:41',
    object: {
      type: 'CallSiteFrame',
      callSite: {
        call: undefined,
        site: {
          type: 'FileSite',
          locator: {
            type: 'URILocator',
            scheme: 'file',
            path: 'a%20file%20with%20eval%20.js',
          },
          position: {
            type: 'Position',
            line: 1,
            column: 41,
          },
        },
      },
      evalCallSite: undefined,
    },
    strict: true,
  },
  {
    string: '    at https://foo.com/a file with eval .js:1:41',
    object: {
      type: 'CallSiteFrame',
      callSite: {
        call: undefined,
        site: {
          type: 'FileSite',
          locator: {
            type: 'URILocator',
            scheme: 'https',
            path: 'foo.com/a%20file%20with%20eval%20.js',
          },
          position: {
            type: 'Position',
            line: 1,
            column: 41,
          },
        },
      },
      evalCallSite: undefined,
    },
    strict: true,
  },
  {
    string: '    at eval (eval at <anonymous> (a file with eval .js:1:1), <anonymous>:1:5)',
    object: {
      type: 'CallSiteFrame',
      callSite: {
        call: {
          type: 'Call',
          async: false,
          constructor: false,
          function: 'eval',
          method: 'eval',
        },
        site: {
          type: 'FileSite',
          locator: {
            type: 'AnonymousLocator',
          },
          position: {
            type: 'Position',
            line: 1,
            column: 5,
          },
        },
      },
      evalCallSite: {
        call: {
          type: 'Call',
          async: false,
          constructor: false,
          function: '<anonymous>',
          method: '<anonymous>',
        },
        site: {
          type: 'FileSite',
          locator: {
            type: 'PathLocator',
            path: 'a file with eval .js',
          },
          position: {
            type: 'Position',
            line: 1,
            column: 1,
          },
        },
      },
    },
    strict: true,
  },
  {
    string: '    at ContextifyScript.Script.runInContext (vm.js:32:29)',
    object: {
      type: 'CallSiteFrame',
      callSite: {
        call: {
          type: 'Call',
          constructor: false,
          async: false,
          function: 'ContextifyScript.Script.runInContext',
          method: 'ContextifyScript.Script.runInContext',
        },
        site: {
          type: 'FileSite',
          locator: {
            type: 'PathLocator',
            path: 'vm.js',
          },
          position: {
            type: 'Position',
            line: 32,
            column: 29,
          },
        },
      },
      evalCallSite: undefined,
    },
    strict: true,
  },
  {
    string: '    at ContextifyScript.Script.runInNewContext (vm.js:38:15)',
    object: {
      type: 'CallSiteFrame',
      callSite: {
        call: {
          type: 'Call',
          constructor: false,
          async: false,
          function: 'ContextifyScript.Script.runInNewContext',
          method: 'ContextifyScript.Script.runInNewContext',
        },
        site: {
          type: 'FileSite',
          locator: {
            type: 'PathLocator',
            path: 'vm.js',
          },
          position: {
            type: 'Position',
            line: 38,
            column: 15,
          },
        },
      },
      evalCallSite: undefined,
    },
    strict: true,
  },
  {
    string: '    at Object.exports.runInNewContext (vm.js:60:17)',
    object: {
      type: 'CallSiteFrame',
      callSite: {
        call: {
          type: 'Call',
          constructor: false,
          async: false,
          function: 'Object.exports.runInNewContext',
          method: 'Object.exports.runInNewContext',
        },
        site: {
          type: 'FileSite',
          locator: {
            type: 'PathLocator',
            path: 'vm.js',
          },
          position: {
            type: 'Position',
            line: 60,
            column: 17,
          },
        },
      },
      evalCallSite: undefined,
    },
    strict: true,
  },
  {
    string:
      '    at Object.function ctor (file.js:1:2)     <anonymous> (__dirname/generate-parse-fixture.js:419:60)',
    object: {
      type: 'CallSiteFrame',
      callSite: {
        call: {
          type: 'Call',
          constructor: false,
          async: false,
          function: 'Object.function ctor (file.js:1:2)     <anonymous>',
          method: 'Object.function ctor (file.js:1:2)     <anonymous>',
        },
        site: {
          type: 'FileSite',
          locator: {
            type: 'PathLocator',
            path: '__dirname/generate-parse-fixture.js',
          },
          position: {
            type: 'Position',
            line: 419,
            column: 60,
          },
        },
      },
      evalCallSite: undefined,
    },
    strict: false,
  },
  {
    string:
      '    at eval (eval at <anonymous> (__dirname/generate-parse-fixture.js:419:60), <anonymous>:3:5)',
    object: {
      type: 'CallSiteFrame',
      callSite: {
        call: {
          type: 'Call',
          constructor: false,
          async: false,
          function: 'eval',
          method: 'eval',
        },
        site: {
          type: 'FileSite',
          locator: {
            type: 'AnonymousLocator',
          },
          position: {
            type: 'Position',
            line: 3,
            column: 5,
          },
        },
      },
      evalCallSite: {
        call: {
          type: 'Call',
          constructor: false,
          async: false,
          function: '<anonymous>',
          method: '<anonymous>',
        },
        site: {
          type: 'FileSite',
          locator: {
            type: 'PathLocator',
            path: '__dirname/generate-parse-fixture.js',
          },
          position: {
            type: 'Position',
            line: 419,
            column: 60,
          },
        },
      },
    },
    strict: true,
  },
  {
    string: '    at Object.[Symbol.iterator] (__dirname/generate-parse-fixture.js:419:60)',
    object: {
      type: 'CallSiteFrame',
      callSite: {
        call: {
          type: 'Call',
          constructor: false,
          async: false,
          function: 'Object.[Symbol.iterator]',
          method: 'Object.[Symbol.iterator]',
        },
        site: {
          type: 'FileSite',
          locator: {
            type: 'PathLocator',
            path: '__dirname/generate-parse-fixture.js',
          },
          position: {
            type: 'Position',
            line: 419,
            column: 60,
          },
        },
      },
      evalCallSite: undefined,
    },
    strict: true,
  },
  {
    string: '    at Classy.[Symbol.iterator] (__dirname/generate-parse-fixture.js:419:60)',
    object: {
      type: 'CallSiteFrame',
      callSite: {
        call: {
          type: 'Call',
          constructor: false,
          async: false,
          function: 'Classy.[Symbol.iterator]',
          method: 'Classy.[Symbol.iterator]',
        },
        site: {
          type: 'FileSite',
          locator: {
            type: 'PathLocator',
            path: '__dirname/generate-parse-fixture.js',
          },
          position: {
            type: 'Position',
            line: 419,
            column: 60,
          },
        },
      },
      evalCallSite: undefined,
    },
    strict: true,
  },
  {
    string: '    at [some (weird) [<symbolism>]] (__dirname/generate-parse-fixture.js:419:60)',
    object: {
      type: 'CallSiteFrame',
      callSite: {
        call: {
          type: 'Call',
          constructor: false,
          async: false,
          function: '[some (weird) [<symbolism>]]',
          method: '[some (weird) [<symbolism>]]',
        },
        site: {
          type: 'FileSite',
          locator: {
            type: 'PathLocator',
            path: '__dirname/generate-parse-fixture.js',
          },
          position: {
            type: 'Position',
            line: 419,
            column: 60,
          },
        },
      },
      evalCallSite: undefined,
    },
    strict: false,
  },
  {
    string:
      '    at Object.[some (weird) [<symbolism>]] [as foo] (__dirname/generate-parse-fixture.js:419:60)',
    object: {
      type: 'CallSiteFrame',
      callSite: {
        call: {
          type: 'Call',
          constructor: false,
          async: false,
          function: 'Object.[some (weird) [<symbolism>]]',
          method: 'foo',
        },
        site: {
          type: 'FileSite',
          locator: {
            type: 'PathLocator',
            path: '__dirname/generate-parse-fixture.js',
          },
          position: {
            type: 'Position',
            line: 419,
            column: 60,
          },
        },
      },
      evalCallSite: undefined,
    },
    strict: false,
  },
  {
    string:
      '    at OtherClass.[some (weird) [<symbolism>]] [as foo] (__dirname/generate-parse-fixture.js:419:60)',
    object: {
      type: 'CallSiteFrame',
      callSite: {
        call: {
          type: 'Call',
          constructor: false,
          async: false,
          function: 'OtherClass.[some (weird) [<symbolism>]]',
          method: 'foo',
        },
        site: {
          type: 'FileSite',
          locator: {
            type: 'PathLocator',
            path: '__dirname/generate-parse-fixture.js',
          },
          position: {
            type: 'Position',
            line: 419,
            column: 60,
          },
        },
      },
      evalCallSite: undefined,
    },
    strict: false,
  },
  {
    string: '    at Object.a (w) [<s>] (__dirname/generate-parse-fixture.js:419:60)',
    object: {
      type: 'CallSiteFrame',
      callSite: {
        call: {
          type: 'Call',
          constructor: false,
          async: false,
          function: 'Object.a (w) [<s>]',
          method: 'Object.a (w) [<s>]',
        },
        site: {
          type: 'FileSite',
          locator: {
            type: 'PathLocator',
            path: '__dirname/generate-parse-fixture.js',
          },
          position: {
            type: 'Position',
            line: 419,
            column: 60,
          },
        },
      },
      evalCallSite: undefined,
    },
    strict: false,
  },
  {
    string: '    at evalmachine.<anonymous>:1:17',
    object: {
      type: 'CallSiteFrame',
      callSite: {
        call: undefined,
        site: {
          type: 'FileSite',
          locator: {
            type: 'PathLocator',
            path: 'evalmachine.<anonymous>',
          },
          position: {
            type: 'Position',
            line: 1,
            column: 17,
          },
        },
      },
      evalCallSite: undefined,
    },
    strict: false,
  },
  {
    string: '    at x (     f[i](l<e>:.js:1:2)    :1:33)',
    stringNormal: '    at x (f[i](l<e>:.js:1:2):1:33)',
    object: {
      type: 'CallSiteFrame',
      callSite: {
        call: {
          type: 'Call',
          constructor: false,
          async: false,
          function: 'x',
          method: 'x',
        },
        site: {
          type: 'FileSite',
          locator: {
            type: 'PathLocator',
            path: 'f[i](l<e>:.js:1:2)',
          },
          position: {
            type: 'Position',
            line: 1,
            column: 33,
          },
        },
      },
      evalCallSite: undefined,
    },
    strict: false,
  },
  {
    string: '    at      f[i](l<e>:.js:1:2)    :2:1',
    stringNormal: '    at f[i](l<e>:.js:1:2):2:1',
    object: {
      type: 'CallSiteFrame',
      callSite: {
        call: undefined,
        site: {
          type: 'FileSite',
          locator: {
            type: 'PathLocator',
            path: 'f[i](l<e>:.js:1:2)',
          },
          position: {
            type: 'Position',
            line: 2,
            column: 1,
          },
        },
      },
      evalCallSite: undefined,
    },
    strict: false,
  },
  {
    string: '    at new Foo (__dirname/generate-parse-fixture.js:419:60)',
    object: {
      type: 'CallSiteFrame',
      callSite: {
        call: {
          type: 'Call',
          constructor: true,
          async: false,
          function: 'Foo',
          method: 'Foo',
        },
        site: {
          type: 'FileSite',
          locator: {
            type: 'PathLocator',
            path: '__dirname/generate-parse-fixture.js',
          },
          position: {
            type: 'Position',
            line: 419,
            column: 60,
          },
        },
      },
      evalCallSite: undefined,
    },
    strict: true,
  },
  {
    string: '    at new (Foo (__dirname/generate-parse-fixture.js:419:60)',
    object: {
      type: 'CallSiteFrame',
      callSite: {
        call: {
          type: 'Call',
          constructor: true,
          async: false,
          function: '(Foo',
          method: '(Foo',
        },
        site: {
          type: 'FileSite',
          locator: {
            type: 'PathLocator',
            path: '__dirname/generate-parse-fixture.js',
          },
          position: {
            type: 'Position',
            line: 419,
            column: 60,
          },
        },
      },
      evalCallSite: undefined,
    },
    strict: false,
  },
  {
    string: '    at new Foo [as (] (__dirname/generate-parse-fixture.js:419:60)',
    object: {
      type: 'CallSiteFrame',
      callSite: {
        call: {
          type: 'Call',
          constructor: true,
          async: false,
          function: 'Foo',
          method: '(',
        },
        site: {
          type: 'FileSite',
          locator: {
            type: 'PathLocator',
            path: '__dirname/generate-parse-fixture.js',
          },
          position: {
            type: 'Position',
            line: 419,
            column: 60,
          },
        },
      },
      evalCallSite: undefined,
    },
    strict: false,
  },
  {
    string: '    at arr.map.n (__dirname/generate-parse-fixture.js:419:60)',
    object: {
      type: 'CallSiteFrame',
      callSite: {
        call: {
          type: 'Call',
          constructor: false,
          async: false,
          function: 'arr.map.n',
          method: 'arr.map.n',
        },
        site: {
          type: 'FileSite',
          locator: {
            type: 'PathLocator',
            path: '__dirname/generate-parse-fixture.js',
          },
          position: {
            type: 'Position',
            line: 419,
            column: 60,
          },
        },
      },
      evalCallSite: undefined,
    },
    strict: true,
  },
  {
    string: '    at Array.map (native)',
    object: {
      type: 'CallSiteFrame',
      callSite: {
        call: {
          type: 'Call',
          constructor: false,
          async: false,
          function: 'Array.map',
          method: 'Array.map',
        },
        site: {
          type: 'NativeSite',
        },
      },
      evalCallSite: undefined,
    },
    strict: true,
  },
  {
    string: '    at generatorFunction.next (<anonymous>)',
    object: {
      type: 'CallSiteFrame',
      callSite: {
        call: {
          type: 'Call',
          constructor: false,
          async: false,
          function: 'generatorFunction.next',
          method: 'generatorFunction.next',
        },
        site: {
          type: 'AnonymousSite',
        },
      },
      evalCallSite: undefined,
    },
    strict: true,
  },
  {
    string: '    at foo( (<anonymous>)',
    object: {
      type: 'CallSiteFrame',
      callSite: {
        call: {
          type: 'Call',
          constructor: false,
          async: false,
          function: 'foo(',
          method: 'foo(',
        },
        site: {
          type: 'AnonymousSite',
        },
      },
      evalCallSite: undefined,
    },
    strict: false,
  },
  {
    string: '    at foo( (<anonymous>:419:60)',
    object: {
      type: 'CallSiteFrame',
      callSite: {
        call: {
          type: 'Call',
          constructor: false,
          async: false,
          function: 'foo(',
          method: 'foo(',
        },
        site: {
          type: 'FileSite',
          locator: {
            type: 'AnonymousLocator',
          },
          position: {
            type: 'Position',
            line: 419,
            column: 60,
          },
        },
      },
      evalCallSite: undefined,
    },
    strict: false,
  },
  {
    string: '    at async Promise.all (index 12)',
    object: {
      type: 'CallSiteFrame',
      callSite: {
        call: {
          type: 'Call',
          constructor: false,
          async: true,
          function: 'Promise.all',
          method: 'Promise.all',
        },
        site: {
          type: 'IndexSite',
          index: 12,
        },
      },
      evalCallSite: undefined,
    },
    strict: false,
  },
];
