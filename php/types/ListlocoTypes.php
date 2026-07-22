<?php
declare(strict_types=1);

// Typed models for the Listloco SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Localize entity data model. */
class Localize
{
    public ?array $dictionary = null;
    public array $gate;
    public ?array $glossary = null;
    public array $listing;
    public array $localized;
    public string $marketplace;
    public bool $pass;
    public string $source_lang;
    public string $target_lang;
    public array $violation;
}

/** Request payload for Localize#create. */
class LocalizeCreateData
{
    public ?array $dictionary = null;
    public array $gate;
    public ?array $glossary = null;
    public array $listing;
    public array $localized;
    public string $marketplace;
    public bool $pass;
    public string $source_lang;
    public string $target_lang;
    public array $violation;
}

