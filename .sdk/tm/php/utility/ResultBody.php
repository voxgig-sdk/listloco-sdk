<?php
declare(strict_types=1);

// Listloco SDK utility: result_body

class ListlocoResultBody
{
    public static function call(ListlocoContext $ctx): ?ListlocoResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
