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
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
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
            "short": "Custom translation dictionary mapping source terms to target translations",
            "type": "`$OBJECT`",
          },
          {
            "name": "gates",
            "req": True,
            "short": "Deterministic quality gate results",
            "type": "`$OBJECT`",
          },
          {
            "name": "glossary",
            "short": "Customer glossary for enforcing brand terms and model numbers",
            "type": "`$OBJECT`",
          },
          {
            "name": "listing",
            "req": True,
            "short": "Product listing information to be localized",
            "type": "`$OBJECT`",
          },
          {
            "name": "localized",
            "req": True,
            "short": "Localized listing content",
            "type": "`$OBJECT`",
          },
          {
            "name": "marketplace",
            "req": True,
            "short": "Target marketplace for compliance rules.",
            "type": "`$STRING`",
          },
          {
            "name": "pass",
            "req": True,
            "short": "Overall pass/fail status - true if all gates passed, false if any gate failed",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "sourceLang",
            "req": True,
            "short": "Source language code (ISO 639-1).",
            "type": "`$STRING`",
          },
          {
            "name": "targetLang",
            "req": True,
            "short": "Target language code (ISO 639-1).",
            "type": "`$STRING`",
          },
          {
            "name": "violations",
            "req": True,
            "short": "List of compliance violations if any gate failed",
            "type": "`$ARRAY`",
          },
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
                    "lit": "localize",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "localize",
                ],
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
