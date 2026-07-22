<?php
declare(strict_types=1);

// Listloco SDK exists test

require_once __DIR__ . '/../listloco_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = ListlocoSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
