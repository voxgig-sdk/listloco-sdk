<?php
declare(strict_types=1);

// Listloco SDK utility: prepare_body

class ListlocoPrepareBody
{
    public static function call(ListlocoContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
