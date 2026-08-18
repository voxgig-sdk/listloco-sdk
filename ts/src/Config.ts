
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'Listloco',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://listloco.hayasaka.app",

    auth: {
      prefix: 'Bearer',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      localize: {
      },

    }
  }


  entity = {
    "localize": {
      "fields": [
        {
          "name": "dictionary",
          "type": "`$OBJECT`"
        },
        {
          "name": "gates",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "glossary",
          "type": "`$OBJECT`"
        },
        {
          "name": "listing",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "localized",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "marketplace",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "pass",
          "req": true,
          "type": "`$BOOLEAN`"
        },
        {
          "name": "sourceLang",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "targetLang",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "violations",
          "req": true,
          "type": "`$ARRAY`"
        }
      ],
      "name": "localize",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/localize",
              "parts": [
                "localize"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

