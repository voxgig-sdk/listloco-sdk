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
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
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
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'gates',
              'req' => true,
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'glossary',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'listing',
              'req' => true,
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'localized',
              'req' => true,
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'marketplace',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'pass',
              'req' => true,
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'sourceLang',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'targetLang',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'violations',
              'req' => true,
              'type' => '`$ARRAY`',
            ],
          ],
          'name' => 'localize',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/localize',
                  'parts' => [
                    'localize',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
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
