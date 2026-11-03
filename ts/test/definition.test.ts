import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "localize",
    "accessor": "Localize",
    "op": "create",
    "method": "POST",
    "path": "/localize",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "localized": {
        "title": "kabellos Bohrmaschine AB-1200 mit 8.5 kg Akku und 2 m Kabel",
        "bullets": [
          "AB-1200 bürstenlos Bohrmaschine, 8.5 kg Akku",
          "2 m Kabel inklusive"
        ]
      },
      "gates": {
        "titleLength": {
          "pass": true
        },
        "bannedWords": {
          "pass": true
        },
        "requiredAttributes": {
          "pass": true
        },
        "preservation": {
          "pass": true
        },
        "glossary": {
          "pass": true
        },
        "backTranslation": {
          "pass": true
        }
      },
      "violations": [],
      "pass": true
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
