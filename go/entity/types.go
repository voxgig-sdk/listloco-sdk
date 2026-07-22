// Typed models for the Listloco SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Localize is the typed data model for the localize entity.
type Localize struct {
	Dictionary *map[string]any `json:"dictionary,omitempty"`
	Gate map[string]any `json:"gate"`
	Glossary *map[string]any `json:"glossary,omitempty"`
	Listing map[string]any `json:"listing"`
	Localized map[string]any `json:"localized"`
	Marketplace string `json:"marketplace"`
	Pass bool `json:"pass"`
	SourceLang string `json:"source_lang"`
	TargetLang string `json:"target_lang"`
	Violation []any `json:"violation"`
}

// LocalizeCreateData is the typed request payload for Localize.CreateTyped.
type LocalizeCreateData struct {
	Dictionary *map[string]any `json:"dictionary,omitempty"`
	Gate map[string]any `json:"gate"`
	Glossary *map[string]any `json:"glossary,omitempty"`
	Listing map[string]any `json:"listing"`
	Localized map[string]any `json:"localized"`
	Marketplace string `json:"marketplace"`
	Pass bool `json:"pass"`
	SourceLang string `json:"source_lang"`
	TargetLang string `json:"target_lang"`
	Violation []any `json:"violation"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
