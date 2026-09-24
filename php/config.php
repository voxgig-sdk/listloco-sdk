<?php
declare(strict_types=1);

// Listloco SDK configuration

class ListlocoConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Listloco",
                "slug" => "listloco",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://listloco.hayasaka.app",
                "auth" => [
                    "prefix" => "Bearer",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "localize" => [],
                ],
            ],
            "entity" => [
        'localize' => [
          'fields' => [
            [
              'name' => 'dictionary',
              'title' => 'Dictionary',
              'type' => '`$OBJECT`',
              'short' => 'Custom translation dictionary mapping source terms to target translations',
            ],
            [
              'name' => 'gates',
              'title' => 'Gates',
              'type' => '`$OBJECT`',
              'req' => true,
              'short' => 'Deterministic quality gate results',
            ],
            [
              'name' => 'glossary',
              'title' => 'Glossary',
              'type' => '`$OBJECT`',
              'short' => 'Customer glossary for enforcing brand terms and model numbers',
            ],
            [
              'name' => 'listing',
              'title' => 'Listing',
              'type' => '`$OBJECT`',
              'req' => true,
              'short' => 'Product listing information to be localized',
            ],
            [
              'name' => 'localized',
              'title' => 'Localized',
              'type' => '`$OBJECT`',
              'req' => true,
              'short' => 'Localized listing content',
            ],
            [
              'name' => 'marketplace',
              'title' => 'Marketplace',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'Target marketplace for compliance rules.',
            ],
            [
              'name' => 'pass',
              'title' => 'Pass',
              'type' => '`$BOOLEAN`',
              'req' => true,
              'short' => 'Overall pass/fail status - true if all gates passed, false if any gate failed',
            ],
            [
              'name' => 'sourceLang',
              'title' => 'Source Lang',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'Source language code (ISO 639-1).',
            ],
            [
              'name' => 'targetLang',
              'title' => 'Target Lang',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'Target language code (ISO 639-1).',
            ],
            [
              'name' => 'violations',
              'title' => 'Violations',
              'type' => '`$ARRAY`',
              'req' => true,
              'short' => 'List of compliance violations if any gate failed',
            ],
          ],
          'name' => 'localize',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/localize',
                  'segments' => [
                    [
                      'lit' => 'localize',
                    ],
                  ],
                  'parts' => [
                    'localize',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return ListlocoFeatures::make_feature($name);
    }
}
