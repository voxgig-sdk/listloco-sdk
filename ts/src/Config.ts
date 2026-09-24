
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Listloco',
        slug: "listloco",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
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
          "title": "Dictionary",
          "type": "`$OBJECT`",
          "short": "Custom translation dictionary mapping source terms to target translations"
        },
        {
          "name": "gates",
          "title": "Gates",
          "type": "`$OBJECT`",
          "req": true,
          "short": "Deterministic quality gate results"
        },
        {
          "name": "glossary",
          "title": "Glossary",
          "type": "`$OBJECT`",
          "short": "Customer glossary for enforcing brand terms and model numbers"
        },
        {
          "name": "listing",
          "title": "Listing",
          "type": "`$OBJECT`",
          "req": true,
          "short": "Product listing information to be localized"
        },
        {
          "name": "localized",
          "title": "Localized",
          "type": "`$OBJECT`",
          "req": true,
          "short": "Localized listing content"
        },
        {
          "name": "marketplace",
          "title": "Marketplace",
          "type": "`$STRING`",
          "req": true,
          "short": "Target marketplace for compliance rules."
        },
        {
          "name": "pass",
          "title": "Pass",
          "type": "`$BOOLEAN`",
          "req": true,
          "short": "Overall pass/fail status - true if all gates passed, false if any gate failed"
        },
        {
          "name": "sourceLang",
          "title": "Source Lang",
          "type": "`$STRING`",
          "req": true,
          "short": "Source language code (ISO 639-1)."
        },
        {
          "name": "targetLang",
          "title": "Target Lang",
          "type": "`$STRING`",
          "req": true,
          "short": "Target language code (ISO 639-1)."
        },
        {
          "name": "violations",
          "title": "Violations",
          "type": "`$ARRAY`",
          "req": true,
          "short": "List of compliance violations if any gate failed"
        }
      ],
      "name": "localize",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/localize",
              "segments": [
                {
                  "lit": "localize"
                }
              ],
              "parts": [
                "localize"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
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
  config,
  FEATURE_PLUGINS,
}

