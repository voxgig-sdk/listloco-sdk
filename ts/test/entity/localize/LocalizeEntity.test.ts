

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"dictionary":{"a":true,"h":"Dictionary","n":"dictionary","r":false,"sh":"Custom translation dictionary mapping source terms to target translations","t":"`$OBJECT`","key$":"dictionary","index$":0},"gates":{"a":true,"h":"Gates","n":"gates","r":true,"sh":"Deterministic quality gate results","t":"`$OBJECT`","key$":"gates","index$":1},"glossary":{"a":true,"h":"Glossary","n":"glossary","r":false,"sh":"Customer glossary for enforcing brand terms and model numbers","t":"`$OBJECT`","key$":"glossary","index$":2},"listing":{"a":true,"h":"Listing","n":"listing","r":true,"sh":"Product listing information to be localized","t":"`$OBJECT`","key$":"listing","index$":3},"localized":{"a":true,"h":"Localized","n":"localized","r":true,"sh":"Localized listing content","t":"`$OBJECT`","key$":"localized","index$":4},"marketplace":{"a":true,"h":"Marketplace","n":"marketplace","r":true,"sh":"Target marketplace for compliance rules.","t":"`$STRING`","key$":"marketplace","index$":5},"pass":{"a":true,"h":"Pass","n":"pass","r":true,"sh":"Overall pass/fail status - true if all gates passed, false if any gate failed","t":"`$BOOLEAN`","key$":"pass","index$":6},"sourceLang":{"a":true,"h":"Source Lang","n":"sourceLang","r":true,"sh":"Source language code (ISO 639-1).","t":"`$STRING`","key$":"sourceLang","index$":7},"targetLang":{"a":true,"h":"Target Lang","n":"targetLang","r":true,"sh":"Target language code (ISO 639-1).","t":"`$STRING`","key$":"targetLang","index$":8},"violations":{"a":true,"h":"Violations","n":"violations","r":true,"sh":"List of compliance violations if any gate failed","t":"`$ARRAY`","key$":"violations","index$":9}},"name":"localize","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /localize","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/localize","q":{},"r":{},"s":[{"lit":"localize"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"localize","name__orig":"localize","Name":"Localize","name_":"localize","name-":"localize","NAME":"LOCALIZE","index$":0}, {"active":true,"entity":"localize","key$":"BasicLocalizeFlow","kind":"basic","name":"BasicLocalizeFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"localize_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'Localize', {"POST /localize":{"protocol":"http","operationId":"localizeListing","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["marketplace","sourceLang","targetLang","listing"],"properties":{"marketplace":{"type":"string","enum":["amazon"],"description":"Target marketplace for compliance rules. Currently supports Amazon only.","example":"amazon","key$":"marketplace"},"sourceLang":{"type":"string","enum":["en"],"description":"Source language code (ISO 639-1). Currently supports English only.","example":"en","key$":"sourceLang"},"targetLang":{"type":"string","enum":["de"],"description":"Target language code (ISO 639-1). Currently supports German only.","example":"de","key$":"targetLang"},"listing":{"type":"object","required":["title"],"properties":{"title":{"type":"string","description":"Product title to be localized","example":"Cordless drill AB-1200 with 8.5 kg battery and 2 m cable"},"description":{"type":"string","description":"Product description to be localized","example":"Cordless drill AB-1200 with a 8.5 kg battery and a 2 m cable."},"brand":{"type":"string","description":"Product brand name","example":"Bosch"},"material":{"type":"string","description":"Product material","example":"Metall"},"size":{"type":"string","description":"Product size","example":"M"},"color":{"type":"string","description":"Product color","example":"blue"},"quantity":{"type":"integer","description":"Product quantity","example":1},"bullets":{"type":"array","items":{"type":"string"},"description":"Product bullet points"}},"description":"Product listing information to be localized","key$":"listing"},"glossary":{"type":"object","properties":{"preserve":{"type":"array","items":{"type":"string"},"description":"Terms that must be preserved exactly during translation (e.g., brand names, model numbers)","example":["Bosch"]}},"description":"Customer glossary for enforcing brand terms and model numbers","key$":"glossary"},"dictionary":{"type":"object","additionalProperties":{"type":"string"},"description":"Custom translation dictionary mapping source terms to target translations","example":{"cordless":"kabellos","drill":"Bohrmaschine","with":"mit","and":"und","a":"ein","battery":"Akku","cable":"Kabel","blue":"blau"},"key$":"dictionary"}},"x-ref":"#/components/schemas/LocalizeRequest","index$":1},"examples":{"cordlessDrill":{"summary":"Cordless drill example","value":{"marketplace":"amazon","sourceLang":"en","targetLang":"de","listing":{"title":"Cordless drill AB-1200 with 8.5 kg battery and 2 m cable","description":"Cordless drill AB-1200 with a 8.5 kg battery and a 2 m cable.","brand":"Bosch","material":"Metall","size":"M","color":"blue","quantity":1},"glossary":{"preserve":["Bosch"]},"dictionary":{"cordless":"kabellos","drill":"Bohrmaschine","with":"mit","and":"und","a":"ein","battery":"Akku","cable":"Kabel","blue":"blau"}}}}}}},"responses":{"200":{"description":"Successful localization with quality gate results","content":{"application/json":{"schema":{"type":"object","required":["localized","gates","violations","pass"],"properties":{"localized":{"type":"object","properties":{"title":{"type":"string","description":"Localized product title","example":"kabellos Bohrmaschine AB-1200 mit 8.5 kg Akku und 2 m Kabel"},"description":{"type":"string","description":"Localized product description"},"bullets":{"type":"array","items":{"type":"string"},"description":"Localized bullet points","example":["AB-1200 bürstenlos Bohrmaschine, 8.5 kg Akku","2 m Kabel inklusive"]},"brand":{"type":"string","description":"Localized brand (if applicable)"},"material":{"type":"string","description":"Localized material"},"size":{"type":"string","description":"Localized size"},"color":{"type":"string","description":"Localized color"}},"description":"Localized listing content","key$":"localized"},"gates":{"type":"object","required":["titleLength","bannedWords","requiredAttributes","preservation","glossary","backTranslation"],"properties":{"titleLength":{"type":"object","required":["pass"],"properties":{"pass":{"type":"boolean","description":"Whether the title length is within Amazon DE character limits"}},"description":"Title character limit check"},"bannedWords":{"type":"object","required":["pass"],"properties":{"pass":{"type":"boolean","description":"Whether the listing contains any banned words (e.g., 'bestseller', 'garantiert')"}},"description":"Banned/prohibited words check"},"requiredAttributes":{"type":"object","required":["pass"],"properties":{"pass":{"type":"boolean","description":"Whether all required category attributes are present (e.g., GPSR info)"}},"description":"Required marketplace attributes check"},"preservation":{"type":"object","required":["pass"],"properties":{"pass":{"type":"boolean","description":"Whether model numbers, numeric values, and units are preserved exactly"}},"description":"Model number, numeral, and unit preservation check"},"glossary":{"type":"object","required":["pass"],"properties":{"pass":{"type":"boolean","description":"Whether glossary terms are preserved correctly"}},"description":"Glossary consistency check"},"backTranslation":{"type":"object","required":["pass"],"properties":{"pass":{"type":"boolean","description":"Whether back-translation divergence is within acceptable limits"}},"description":"Back-translation divergence check"}},"description":"Deterministic quality gate results","key$":"gates"},"violations":{"type":"array","items":{"type":"string"},"description":"List of compliance violations if any gate failed","example":[],"key$":"violations"},"pass":{"type":"boolean","description":"Overall pass/fail status - true if all gates passed, false if any gate failed","example":true,"key$":"pass"}},"x-ref":"#/components/schemas/LocalizeResponse","index$":0},"examples":{"successfulLocalization":{"summary":"Successful localization passing all gates","value":{"localized":{"title":"kabellos Bohrmaschine AB-1200 mit 8.5 kg Akku und 2 m Kabel","bullets":["AB-1200 bürstenlos Bohrmaschine, 8.5 kg Akku","2 m Kabel inklusive"]},"gates":{"titleLength":{"pass":true},"bannedWords":{"pass":true},"requiredAttributes":{"pass":true},"preservation":{"pass":true},"glossary":{"pass":true},"backTranslation":{"pass":true}},"violations":[],"pass":true}},"failedGate":{"summary":"Failed quality gate with violations","value":{"localized":{"title":"Bestseller kabellos Bohrmaschine garantiert mit Akku","bullets":[]},"gates":{"titleLength":{"pass":true},"bannedWords":{"pass":false},"requiredAttributes":{"pass":true},"preservation":{"pass":false},"glossary":{"pass":true},"backTranslation":{"pass":true}},"violations":["Banned word detected: 'Bestseller'","Banned word detected: 'garantiert'","Model number 'AB-1200' not preserved","Numeric value '8.5 kg' not preserved"],"pass":false}}}}}},"400":{"description":"Bad request - invalid input parameters","content":{"application/json":{"schema":{"type":"object","required":["error"],"properties":{"error":{"type":"string","description":"Error type or category"},"message":{"type":"string","description":"Detailed error message"}},"x-ref":"#/components/schemas/ErrorResponse"},"example":{"error":"Invalid request","message":"Missing required field: marketplace"}}}},"401":{"description":"Unauthorized - invalid or missing API key","content":{"application/json":{"schema":{"type":"object","required":["error"],"properties":{"error":{"type":"string","description":"Error type or category"},"message":{"type":"string","description":"Detailed error message"}},"x-ref":"#/components/schemas/ErrorResponse"},"example":{"error":"Unauthorized","message":"Invalid API key"}}}},"429":{"description":"Rate limit exceeded","content":{"application/json":{"schema":{"type":"object","required":["error"],"properties":{"error":{"type":"string","description":"Error type or category"},"message":{"type":"string","description":"Detailed error message"}},"x-ref":"#/components/schemas/ErrorResponse"},"example":{"error":"Rate limit exceeded","message":"Free tier limited to 5 requests per minute per IP"}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","required":["error"],"properties":{"error":{"type":"string","description":"Error type or category"},"message":{"type":"string","description":"Detailed error message"}},"x-ref":"#/components/schemas/ErrorResponse"},"example":{"error":"Internal server error","message":"An unexpected error occurred"}}}}},"parameters":[],"security":[{"BearerAuth":[]},{"RapidAPIAuth":[]}],"securitySource":"operation","securitySchemes":{"BearerAuth":{"type":"http","scheme":"bearer","description":"Bearer token authentication for direct/self-hosted deployments. Use Authorization: Bearer <YOUR_API_KEY> header."},"RapidAPIAuth":{"type":"apiKey","in":"header","name":"X-RapidAPI-Key","description":"RapidAPI key authentication. Requires both X-RapidAPI-Key and X-RapidAPI-Host headers."}}}})
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
  
