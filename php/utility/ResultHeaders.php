<?php
declare(strict_types=1);

// Listloco SDK utility: result_headers

class ListlocoResultHeaders
{
    public static function call(ListlocoContext $ctx): ?ListlocoResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
