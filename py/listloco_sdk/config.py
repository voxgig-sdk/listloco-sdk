# Listloco SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Listloco",
            "slug": "listloco",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://listloco.hayasaka.app",
            "auth": {
                "prefix": "Bearer",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "localize": {},
            },
        },
        "entity": {
      "localize": {
        "fields": [
          {
            "name": "dictionary",
            "title": "Dictionary",
            "type": "`$OBJECT`",
            "short": "Custom translation dictionary mapping source terms to target translations",
          },
          {
            "name": "gates",
            "title": "Gates",
            "type": "`$OBJECT`",
            "req": True,
            "short": "Deterministic quality gate results",
          },
          {
            "name": "glossary",
            "title": "Glossary",
            "type": "`$OBJECT`",
            "short": "Customer glossary for enforcing brand terms and model numbers",
          },
          {
            "name": "listing",
            "title": "Listing",
            "type": "`$OBJECT`",
            "req": True,
            "short": "Product listing information to be localized",
          },
          {
            "name": "localized",
            "title": "Localized",
            "type": "`$OBJECT`",
            "req": True,
            "short": "Localized listing content",
          },
          {
            "name": "marketplace",
            "title": "Marketplace",
            "type": "`$STRING`",
            "req": True,
            "short": "Target marketplace for compliance rules.",
          },
          {
            "name": "pass",
            "title": "Pass",
            "type": "`$BOOLEAN`",
            "req": True,
            "short": "Overall pass/fail status - true if all gates passed, false if any gate failed",
          },
          {
            "name": "sourceLang",
            "title": "Source Lang",
            "type": "`$STRING`",
            "req": True,
            "short": "Source language code (ISO 639-1).",
          },
          {
            "name": "targetLang",
            "title": "Target Lang",
            "type": "`$STRING`",
            "req": True,
            "short": "Target language code (ISO 639-1).",
          },
          {
            "name": "violations",
            "title": "Violations",
            "type": "`$ARRAY`",
            "req": True,
            "short": "List of compliance violations if any gate failed",
          },
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
                    "lit": "localize",
                  },
                ],
                "parts": [
                  "localize",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
