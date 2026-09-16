-- Listloco SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Listloco",
      slug = "listloco",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://listloco.hayasaka.app",
      auth = {
        prefix = "Bearer",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["localize"] = {},
      },
    },
    entity = {
      ["localize"] = {
        ["fields"] = {
          {
            ["name"] = "dictionary",
            ["short"] = "Custom translation dictionary mapping source terms to target translations",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "gates",
            ["req"] = true,
            ["short"] = "Deterministic quality gate results",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "glossary",
            ["short"] = "Customer glossary for enforcing brand terms and model numbers",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "listing",
            ["req"] = true,
            ["short"] = "Product listing information to be localized",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "localized",
            ["req"] = true,
            ["short"] = "Localized listing content",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "marketplace",
            ["req"] = true,
            ["short"] = "Target marketplace for compliance rules.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "pass",
            ["req"] = true,
            ["short"] = "Overall pass/fail status - true if all gates passed, false if any gate failed",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "sourceLang",
            ["req"] = true,
            ["short"] = "Source language code (ISO 639-1).",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "targetLang",
            ["req"] = true,
            ["short"] = "Target language code (ISO 639-1).",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "violations",
            ["req"] = true,
            ["short"] = "List of compliance violations if any gate failed",
            ["type"] = "`$ARRAY`",
          },
        },
        ["name"] = "localize",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/localize",
                ["segments"] = {
                  {
                    ["lit"] = "localize",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "localize",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
