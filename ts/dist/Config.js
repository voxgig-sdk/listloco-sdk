"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const TestFeature_1 = require("./feature/test/TestFeature");
const FEATURE_CLASS = {
    test: TestFeature_1.TestFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'Listloco',
        slug: "listloco",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        test: {
            "options": {
                "active": false
            },
            "transport": "base"
        },
    };
    options = {
        base: "https://listloco.hayasaka.app",
        auth: {
            prefix: 'Bearer',
        },
        headers: {
            "content-type": "application/json"
        },
        entity: {
            localize: {},
        }
    };
    entity = {
        "localize": {
            "fields": [
                {
                    "name": "dictionary",
                    "short": "Custom translation dictionary mapping source terms to target translations",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "gates",
                    "req": true,
                    "short": "Deterministic quality gate results",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "glossary",
                    "short": "Customer glossary for enforcing brand terms and model numbers",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "listing",
                    "req": true,
                    "short": "Product listing information to be localized",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "localized",
                    "req": true,
                    "short": "Localized listing content",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "marketplace",
                    "req": true,
                    "short": "Target marketplace for compliance rules.",
                    "type": "`$STRING`"
                },
                {
                    "name": "pass",
                    "req": true,
                    "short": "Overall pass/fail status - true if all gates passed, false if any gate failed",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "sourceLang",
                    "req": true,
                    "short": "Source language code (ISO 639-1).",
                    "type": "`$STRING`"
                },
                {
                    "name": "targetLang",
                    "req": true,
                    "short": "Target language code (ISO 639-1).",
                    "type": "`$STRING`"
                },
                {
                    "name": "violations",
                    "req": true,
                    "short": "List of compliance violations if any gate failed",
                    "type": "`$ARRAY`"
                }
            ],
            "name": "localize",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "POST",
                            "orig": "/localize",
                            "segments": [
                                {
                                    "lit": "localize"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "localize"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map