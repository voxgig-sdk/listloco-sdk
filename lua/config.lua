-- Listloco SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Listloco",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
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
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "gates",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "glossary",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "listing",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "localized",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "marketplace",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "pass",
            ["req"] = true,
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "sourceLang",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "targetLang",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "violations",
            ["req"] = true,
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
                ["parts"] = {
                  "localize",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
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
