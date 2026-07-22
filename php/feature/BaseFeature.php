<?php
declare(strict_types=1);

// Listloco SDK base feature

class ListlocoBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(ListlocoContext $ctx, array $options): void {}
    public function PostConstruct(ListlocoContext $ctx): void {}
    public function PostConstructEntity(ListlocoContext $ctx): void {}
    public function SetData(ListlocoContext $ctx): void {}
    public function GetData(ListlocoContext $ctx): void {}
    public function GetMatch(ListlocoContext $ctx): void {}
    public function SetMatch(ListlocoContext $ctx): void {}
    public function PrePoint(ListlocoContext $ctx): void {}
    public function PreSpec(ListlocoContext $ctx): void {}
    public function PreRequest(ListlocoContext $ctx): void {}
    public function PreResponse(ListlocoContext $ctx): void {}
    public function PreResult(ListlocoContext $ctx): void {}
    public function PreDone(ListlocoContext $ctx): void {}
    public function PreUnexpected(ListlocoContext $ctx): void {}
}
