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
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
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
              "type" => "`$OBJECT`",
            },
            {
              "name" => "gates",
              "req" => true,
              "type" => "`$OBJECT`",
            },
            {
              "name" => "glossary",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "listing",
              "req" => true,
              "type" => "`$OBJECT`",
            },
            {
              "name" => "localized",
              "req" => true,
              "type" => "`$OBJECT`",
            },
            {
              "name" => "marketplace",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "pass",
              "req" => true,
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "sourceLang",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "targetLang",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "violations",
              "req" => true,
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
