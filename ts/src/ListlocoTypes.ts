// Typed models for the Listloco SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Localize {
  dictionary?: Record<string, any>
  gates: Record<string, any>
  glossary?: Record<string, any>
  listing: Record<string, any>
  localized: Record<string, any>
  marketplace: string
  pass: boolean
  sourceLang: string
  targetLang: string
  violations: any[]
}

export interface LocalizeCreateData {
  dictionary?: Record<string, any>
  gates: Record<string, any>
  glossary?: Record<string, any>
  listing: Record<string, any>
  localized: Record<string, any>
  marketplace: string
  pass: boolean
  sourceLang: string
  targetLang: string
  violations: any[]
}

