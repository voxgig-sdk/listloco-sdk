# Listloco SDK configuration

module ListlocoConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "Listloco",
        "slug" => "listloco",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
        },
      },
      "options" => {
        "base" => "https://listloco.hayasaka.app",
        "auth" => {
          "prefix" => "Bearer",
        },
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "localize" => {},
        },
      },
      "entity" => {
        "localize" => {
          "fields" => [
            {
              "name" => "dictionary",
              "short" => "Custom translation dictionary mapping source terms to target translations",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "gates",
              "req" => true,
              "short" => "Deterministic quality gate results",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "glossary",
              "short" => "Customer glossary for enforcing brand terms and model numbers",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "listing",
              "req" => true,
              "short" => "Product listing information to be localized",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "localized",
              "req" => true,
              "short" => "Localized listing content",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "marketplace",
              "req" => true,
              "short" => "Target marketplace for compliance rules.",
              "type" => "`$STRING`",
            },
            {
              "name" => "pass",
              "req" => true,
              "short" => "Overall pass/fail status - true if all gates passed, false if any gate failed",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "sourceLang",
              "req" => true,
              "short" => "Source language code (ISO 639-1).",
              "type" => "`$STRING`",
            },
            {
              "name" => "targetLang",
              "req" => true,
              "short" => "Target language code (ISO 639-1).",
              "type" => "`$STRING`",
            },
            {
              "name" => "violations",
              "req" => true,
              "short" => "List of compliance violations if any gate failed",
              "type" => "`$ARRAY`",
            },
          ],
          "name" => "localize",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/localize",
                  "parts" => [
                    "localize",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    ListlocoFeatures.make_feature(name)
  end
end
