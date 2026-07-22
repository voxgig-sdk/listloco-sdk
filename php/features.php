<?php
declare(strict_types=1);

// Listloco SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class ListlocoFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new ListlocoBaseFeature();
            case "test":
                return new ListlocoTestFeature();
            default:
                return new ListlocoBaseFeature();
        }
    }
}
