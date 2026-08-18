package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Listloco",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://listloco.hayasaka.app",
			"auth": map[string]any{
				"prefix": "Bearer",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"localize": map[string]any{},
			},
		},
		"entity": map[string]any{
			"localize": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "dictionary",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "gates",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "glossary",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "listing",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "localized",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "marketplace",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "pass",
						"req": true,
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "sourceLang",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "targetLang",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "violations",
						"req": true,
						"type": "`$ARRAY`",
					},
				},
				"name": "localize",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/localize",
								"parts": []any{
									"localize",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
