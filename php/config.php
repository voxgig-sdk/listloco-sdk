<?php
declare(strict_types=1);

// Listloco SDK configuration

class ListlocoConfig
{
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
              'active' => true,
              'name' => 'dictionary',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'gate',
              'req' => true,
              'type' => '`$OBJECT`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'glossary',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'listing',
              'req' => true,
              'type' => '`$OBJECT`',
              'index$' => 3,
            ],
            [
              'active' => true,
              'name' => 'localized',
              'req' => true,
              'type' => '`$OBJECT`',
              'index$' => 4,
            ],
            [
              'active' => true,
              'name' => 'marketplace',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 5,
            ],
            [
              'active' => true,
              'name' => 'pass',
              'req' => true,
              'type' => '`$BOOLEAN`',
              'index$' => 6,
            ],
            [
              'active' => true,
              'name' => 'source_lang',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 7,
            ],
            [
              'active' => true,
              'name' => 'target_lang',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 8,
            ],
            [
              'active' => true,
              'name' => 'violation',
              'req' => true,
              'type' => '`$ARRAY`',
              'index$' => 9,
            ],
          ],
          'name' => 'localize',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'active' => true,
                  'args' => [],
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
                  'index$' => 0,
                ],
              ],
              'key$' => 'create',
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
