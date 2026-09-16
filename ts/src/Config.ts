
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


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
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
          "short": "Custom translation dictionary mapping source terms to target translations",
          "type": "`$OBJECT`"
        },
        {
          "name": "gates",
          "req": true,
          "short": "Deterministic quality gate results",
          "type": "`$OBJECT`"
        },
        {
          "name": "glossary",
          "short": "Customer glossary for enforcing brand terms and model numbers",
          "type": "`$OBJECT`"
        },
        {
          "name": "listing",
          "req": true,
          "short": "Product listing information to be localized",
          "type": "`$OBJECT`"
        },
        {
          "name": "localized",
          "req": true,
          "short": "Localized listing content",
          "type": "`$OBJECT`"
        },
        {
          "name": "marketplace",
          "req": true,
          "short": "Target marketplace for compliance rules.",
          "type": "`$STRING`"
        },
        {
          "name": "pass",
          "req": true,
          "short": "Overall pass/fail status - true if all gates passed, false if any gate failed",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "sourceLang",
          "req": true,
          "short": "Source language code (ISO 639-1).",
          "type": "`$STRING`"
        },
        {
          "name": "targetLang",
          "req": true,
          "short": "Target language code (ISO 639-1).",
          "type": "`$STRING`"
        },
        {
          "name": "violations",
          "req": true,
          "short": "List of compliance violations if any gate failed",
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
              "segments": [
                {
                  "lit": "localize"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "localize"
              ]
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

