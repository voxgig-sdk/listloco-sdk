<?php
declare(strict_types=1);

// Listloco SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class ListlocoMakeContext
{
    public static function call(array $ctxmap, ?ListlocoContext $basectx): ListlocoContext
    {
        return new ListlocoContext($ctxmap, $basectx);
    }
}
