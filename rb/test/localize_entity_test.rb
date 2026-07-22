# Localize entity test

require "minitest/autorun"
require "json"
require_relative "../Listloco_sdk"
require_relative "runner"

class LocalizeEntityTest < Minitest::Test
  def test_create_instance
    testsdk = ListlocoSDK.test(nil, nil)
    ent = testsdk.Localize(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = localize_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "localize." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set LISTLOCO_TEST_LOCALIZE_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    localize_ref01_ent = client.Localize(nil)
    localize_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.localize"), "localize_ref01"))

    localize_ref01_data_result = localize_ref01_ent.create(localize_ref01_data, nil)
    localize_ref01_data = Helpers.to_map(localize_ref01_data_result)
    assert !localize_ref01_data.nil?

  end
end

def localize_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "localize", "LocalizeTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ListlocoSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["localize01", "localize02", "localize03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["LISTLOCO_TEST_LOCALIZE_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "LISTLOCO_TEST_LOCALIZE_ENTID" => idmap,
    "LISTLOCO_TEST_LIVE" => "FALSE",
    "LISTLOCO_TEST_EXPLAIN" => "FALSE",
    "LISTLOCO_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["LISTLOCO_TEST_LOCALIZE_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["LISTLOCO_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["LISTLOCO_APIKEY"],
      },
      extra || {},
    ])
    client = ListlocoSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["LISTLOCO_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["LISTLOCO_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
