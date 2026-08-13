package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/listloco-sdk/go"
	"github.com/voxgig-sdk/listloco-sdk/go/core"

	vs "github.com/voxgig-sdk/listloco-sdk/go/utility/struct"
)

func TestLocalizeEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Localize(nil)
		if ent == nil {
			t.Fatal("expected non-nil LocalizeEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := localizeBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "localize." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set LISTLOCO_TEST_LOCALIZE_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		localizeRef01Ent := client.Localize(nil)
		localizeRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "localize"}, setup.data), "localize_ref01"))

		localizeRef01DataResult, err := localizeRef01Ent.Create(localizeRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		localizeRef01Data = core.ToMapAny(entityData(localizeRef01DataResult))
		if localizeRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

	})
}

func localizeBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "localize", "LocalizeTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read localize test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse localize test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"localize01", "localize02", "localize03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("LISTLOCO_TEST_LOCALIZE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"LISTLOCO_TEST_LOCALIZE_ENTID": idmap,
		"LISTLOCO_TEST_LIVE":      "FALSE",
		"LISTLOCO_TEST_EXPLAIN":   "FALSE",
		"LISTLOCO_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["LISTLOCO_TEST_LOCALIZE_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["LISTLOCO_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["LISTLOCO_APIKEY"],
			},
			extra,
		})
		client = sdk.NewListlocoSDK(core.ToMapAny(mergedOpts))
	}

	live := env["LISTLOCO_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["LISTLOCO_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
