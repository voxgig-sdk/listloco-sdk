<?php
declare(strict_types=1);

// Listloco SDK utility: make_fetch_def

require_once __DIR__ . '/../core/Result.php';

class ListlocoMakeFetchDef
{
    public static function call(ListlocoContext $ctx): array
    {
        $spec = $ctx->spec;
        if (!$spec) {
            return [null, $ctx->make_error('fetchdef_no_spec', 'Expected context spec property to be defined.')];
        }

        if (!$ctx->result) {
            $ctx->result = new ListlocoResult([]);
        }
        $spec->step = 'prepare';

        [$url, $err] = ($ctx->utility->make_url)($ctx);
        if ($err) {
            return [null, $err];
        }

        $spec->url = $url;

        $fetchdef = ['url' => $url, 'method' => $spec->method, 'headers' => $spec->headers];
        if ($spec->body !== null) {
            $fetchdef['body'] = is_array($spec->body) ? \Voxgig\Struct\Struct::jsonify($spec->body) : $spec->body;
        }

        return [$fetchdef, null];
    }
}
