

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { ListlocoSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('LocalizeEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LISTLOCO_TEST_LIVE=TRUE.
  afterEach(liveDelay('LISTLOCO_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ListlocoSDK.test()
    const ent = testsdk.Localize()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LISTLOCO_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'localize.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"dictionary","req":false,"short":"Custom translation dictionary mapping source terms to target translations","type":"`$OBJECT`","index$":0},{"active":true,"name":"gates","req":true,"short":"Deterministic quality gate results","type":"`$OBJECT`","index$":1},{"active":true,"name":"glossary","req":false,"short":"Customer glossary for enforcing brand terms and model numbers","type":"`$OBJECT`","index$":2},{"active":true,"name":"listing","req":true,"short":"Product listing information to be localized","type":"`$OBJECT`","index$":3},{"active":true,"name":"localized","req":true,"short":"Localized listing content","type":"`$OBJECT`","index$":4},{"active":true,"name":"marketplace","req":true,"short":"Target marketplace for compliance rules.","type":"`$STRING`","index$":5},{"active":true,"name":"pass","req":true,"short":"Overall pass/fail status - true if all gates passed, false if any gate failed","type":"`$BOOLEAN`","index$":6},{"active":true,"name":"sourceLang","req":true,"short":"Source language code (ISO 639-1).","type":"`$STRING`","index$":7},{"active":true,"name":"targetLang","req":true,"short":"Target language code (ISO 639-1).","type":"`$STRING`","index$":8},{"active":true,"name":"violations","req":true,"short":"List of compliance violations if any gate failed","type":"`$ARRAY`","index$":9}],"name":"localize","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /localize","json":"{\"operationId\":\"localizeListing\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"examples\":{\"cordlessDrill\":{\"summary\":\"Cordless drill example\",\"value\":{\"dictionary\":{\"a\":\"ein\",\"and\":\"und\",\"battery\":\"Akku\",\"blue\":\"blau\",\"cable\":\"Kabel\",\"cordless\":\"kabellos\",\"drill\":\"Bohrmaschine\",\"with\":\"mit\"},\"glossary\":{\"preserve\":[\"Bosch\"]},\"listing\":{\"brand\":\"Bosch\",\"color\":\"blue\",\"description\":\"Cordless drill AB-1200 with a 8.5 kg battery and a 2 m cable.\",\"material\":\"Metall\",\"quantity\":1,\"size\":\"M\",\"title\":\"Cordless drill AB-1200 with 8.5 kg battery and 2 m cable\"},\"marketplace\":\"amazon\",\"sourceLang\":\"en\",\"targetLang\":\"de\"}}},\"schema\":{\"properties\":{\"dictionary\":{\"additionalProperties\":{\"type\":\"string\"},\"description\":\"Custom translation dictionary mapping source terms to target translations\",\"example\":{\"a\":\"ein\",\"and\":\"und\",\"battery\":\"Akku\",\"blue\":\"blau\",\"cable\":\"Kabel\",\"cordless\":\"kabellos\",\"drill\":\"Bohrmaschine\",\"with\":\"mit\"},\"type\":\"object\"},\"glossary\":{\"description\":\"Customer glossary for enforcing brand terms and model numbers\",\"properties\":{\"preserve\":{\"description\":\"Terms that must be preserved exactly during translation (e.g., brand names, model numbers)\",\"example\":[\"Bosch\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"},\"listing\":{\"description\":\"Product listing information to be localized\",\"properties\":{\"brand\":{\"description\":\"Product brand name\",\"example\":\"Bosch\",\"type\":\"string\"},\"bullets\":{\"description\":\"Product bullet points\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"color\":{\"description\":\"Product color\",\"example\":\"blue\",\"type\":\"string\"},\"description\":{\"description\":\"Product description to be localized\",\"example\":\"Cordless drill AB-1200 with a 8.5 kg battery and a 2 m cable.\",\"type\":\"string\"},\"material\":{\"description\":\"Product material\",\"example\":\"Metall\",\"type\":\"string\"},\"quantity\":{\"description\":\"Product quantity\",\"example\":1,\"type\":\"integer\"},\"size\":{\"description\":\"Product size\",\"example\":\"M\",\"type\":\"string\"},\"title\":{\"description\":\"Product title to be localized\",\"example\":\"Cordless drill AB-1200 with 8.5 kg battery and 2 m cable\",\"type\":\"string\"}},\"required\":[\"title\"],\"type\":\"object\"},\"marketplace\":{\"description\":\"Target marketplace for compliance rules. Currently supports Amazon only.\",\"enum\":[\"amazon\"],\"example\":\"amazon\",\"type\":\"string\"},\"sourceLang\":{\"description\":\"Source language code (ISO 639-1). Currently supports English only.\",\"enum\":[\"en\"],\"example\":\"en\",\"type\":\"string\"},\"targetLang\":{\"description\":\"Target language code (ISO 639-1). Currently supports German only.\",\"enum\":[\"de\"],\"example\":\"de\",\"type\":\"string\"}},\"required\":[\"marketplace\",\"sourceLang\",\"targetLang\",\"listing\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"failedGate\":{\"summary\":\"Failed quality gate with violations\",\"value\":{\"gates\":{\"backTranslation\":{\"pass\":true},\"bannedWords\":{\"pass\":false},\"glossary\":{\"pass\":true},\"preservation\":{\"pass\":false},\"requiredAttributes\":{\"pass\":true},\"titleLength\":{\"pass\":true}},\"localized\":{\"bullets\":[],\"title\":\"Bestseller kabellos Bohrmaschine garantiert mit Akku\"},\"pass\":false,\"violations\":[\"Banned word detected: 'Bestseller'\",\"Banned word detected: 'garantiert'\",\"Model number 'AB-1200' not preserved\",\"Numeric value '8.5 kg' not preserved\"]}},\"successfulLocalization\":{\"summary\":\"Successful localization passing all gates\",\"value\":{\"gates\":{\"backTranslation\":{\"pass\":true},\"bannedWords\":{\"pass\":true},\"glossary\":{\"pass\":true},\"preservation\":{\"pass\":true},\"requiredAttributes\":{\"pass\":true},\"titleLength\":{\"pass\":true}},\"localized\":{\"bullets\":[\"AB-1200 bürstenlos Bohrmaschine, 8.5 kg Akku\",\"2 m Kabel inklusive\"],\"title\":\"kabellos Bohrmaschine AB-1200 mit 8.5 kg Akku und 2 m Kabel\"},\"pass\":true,\"violations\":[]}}},\"schema\":{\"properties\":{\"gates\":{\"description\":\"Deterministic quality gate results\",\"properties\":{\"backTranslation\":{\"description\":\"Back-translation divergence check\",\"properties\":{\"pass\":{\"description\":\"Whether back-translation divergence is within acceptable limits\",\"type\":\"boolean\"}},\"required\":[\"pass\"],\"type\":\"object\"},\"bannedWords\":{\"description\":\"Banned/prohibited words check\",\"properties\":{\"pass\":{\"description\":\"Whether the listing contains any banned words (e.g., 'bestseller', 'garantiert')\",\"type\":\"boolean\"}},\"required\":[\"pass\"],\"type\":\"object\"},\"glossary\":{\"description\":\"Glossary consistency check\",\"properties\":{\"pass\":{\"description\":\"Whether glossary terms are preserved correctly\",\"type\":\"boolean\"}},\"required\":[\"pass\"],\"type\":\"object\"},\"preservation\":{\"description\":\"Model number, numeral, and unit preservation check\",\"properties\":{\"pass\":{\"description\":\"Whether model numbers, numeric values, and units are preserved exactly\",\"type\":\"boolean\"}},\"required\":[\"pass\"],\"type\":\"object\"},\"requiredAttributes\":{\"description\":\"Required marketplace attributes check\",\"properties\":{\"pass\":{\"description\":\"Whether all required category attributes are present (e.g., GPSR info)\",\"type\":\"boolean\"}},\"required\":[\"pass\"],\"type\":\"object\"},\"titleLength\":{\"description\":\"Title character limit check\",\"properties\":{\"pass\":{\"description\":\"Whether the title length is within Amazon DE character limits\",\"type\":\"boolean\"}},\"required\":[\"pass\"],\"type\":\"object\"}},\"required\":[\"titleLength\",\"bannedWords\",\"requiredAttributes\",\"preservation\",\"glossary\",\"backTranslation\"],\"type\":\"object\"},\"localized\":{\"description\":\"Localized listing content\",\"properties\":{\"brand\":{\"description\":\"Localized brand (if applicable)\",\"type\":\"string\"},\"bullets\":{\"description\":\"Localized bullet points\",\"example\":[\"AB-1200 bürstenlos Bohrmaschine, 8.5 kg Akku\",\"2 m Kabel inklusive\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"color\":{\"description\":\"Localized color\",\"type\":\"string\"},\"description\":{\"description\":\"Localized product description\",\"type\":\"string\"},\"material\":{\"description\":\"Localized material\",\"type\":\"string\"},\"size\":{\"description\":\"Localized size\",\"type\":\"string\"},\"title\":{\"description\":\"Localized product title\",\"example\":\"kabellos Bohrmaschine AB-1200 mit 8.5 kg Akku und 2 m Kabel\",\"type\":\"string\"}},\"type\":\"object\"},\"pass\":{\"description\":\"Overall pass/fail status - true if all gates passed, false if any gate failed\",\"example\":true,\"type\":\"boolean\"},\"violations\":{\"description\":\"List of compliance violations if any gate failed\",\"example\":[],\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"required\":[\"localized\",\"gates\",\"violations\",\"pass\"],\"type\":\"object\"}}},\"description\":\"Successful localization with quality gate results\"},\"400\":{\"content\":{\"application/json\":{\"example\":{\"error\":\"Invalid request\",\"message\":\"Missing required field: marketplace\"},\"schema\":{\"properties\":{\"error\":{\"description\":\"Error type or category\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error message\",\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Bad request - invalid input parameters\"},\"401\":{\"content\":{\"application/json\":{\"example\":{\"error\":\"Unauthorized\",\"message\":\"Invalid API key\"},\"schema\":{\"properties\":{\"error\":{\"description\":\"Error type or category\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error message\",\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Unauthorized - invalid or missing API key\"},\"429\":{\"content\":{\"application/json\":{\"example\":{\"error\":\"Rate limit exceeded\",\"message\":\"Free tier limited to 5 requests per minute per IP\"},\"schema\":{\"properties\":{\"error\":{\"description\":\"Error type or category\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error message\",\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\"},\"500\":{\"content\":{\"application/json\":{\"example\":{\"error\":\"Internal server error\",\"message\":\"An unexpected error occurred\"},\"schema\":{\"properties\":{\"error\":{\"description\":\"Error type or category\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error message\",\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"security\":[{\"BearerAuth\":[]},{\"RapidAPIAuth\":[]}],\"securitySchemes\":{\"BearerAuth\":{\"description\":\"Bearer token authentication for direct/self-hosted deployments. Use Authorization: Bearer <YOUR_API_KEY> header.\",\"scheme\":\"bearer\",\"type\":\"http\"},\"RapidAPIAuth\":{\"description\":\"RapidAPI key authentication. Requires both X-RapidAPI-Key and X-RapidAPI-Host headers.\",\"in\":\"header\",\"name\":\"X-RapidAPI-Key\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/localize","segments":[{"lit":"localize"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"localize","name__orig":"localize","Name":"Localize","name_":"localize","name-":"localize","NAME":"LOCALIZE","index$":0}, {"active":true,"entity":"localize","key$":"BasicLocalizeFlow","kind":"basic","name":"BasicLocalizeFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"localize_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'Localize')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const localize_ref01_ent = client.Localize()
    let localize_ref01_data = setup.data.new.localize['localize_ref01']

    localize_ref01_data = (await localize_ref01_ent.create(localize_ref01_data)).data()
    assert(null != localize_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/localize/LocalizeTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = ListlocoSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['localize01','localize02','localize03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LISTLOCO_TEST_LOCALIZE_ENTID': idmap,
    'LISTLOCO_TEST_LIVE': 'FALSE',
    'LISTLOCO_TEST_EXPLAIN': 'FALSE',
    'LISTLOCO_APIKEY': '',
  })

  idmap = env['LISTLOCO_TEST_LOCALIZE_ENTID']

  const live = 'TRUE' === env.LISTLOCO_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LISTLOCO_TEST_LOCALIZE_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new ListlocoSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.LISTLOCO_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.LISTLOCO_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
