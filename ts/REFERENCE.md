# Listloco TypeScript SDK Reference

Complete API reference for the Listloco TypeScript SDK.


## ListlocoSDK

### Constructor

```ts
new ListlocoSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ListlocoSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = ListlocoSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `ListlocoSDK` instance in test mode.


### Instance Methods

#### `Localize(data?: object)`

Create a new `Localize` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LocalizeEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `ListlocoSDK.test()`.

**Returns:** `ListlocoSDK` instance in test mode.


---

## LocalizeEntity

```ts
const localize = client.Localize()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `dictionary` | `Record<string, any>` | No | Custom translation dictionary mapping source terms to target translations |
| `gates` | `Record<string, any>` | Yes | Deterministic quality gate results |
| `glossary` | `Record<string, any>` | No | Customer glossary for enforcing brand terms and model numbers |
| `listing` | `Record<string, any>` | Yes | Product listing information to be localized |
| `localized` | `Record<string, any>` | Yes | Localized listing content |
| `marketplace` | `string` | Yes | Target marketplace for compliance rules. |
| `pass` | `boolean` | Yes | Overall pass/fail status - true if all gates passed, false if any gate failed |
| `sourceLang` | `string` | Yes | Source language code (ISO 639-1). |
| `targetLang` | `string` | Yes | Target language code (ISO 639-1). |
| `violations` | `any[]` | Yes | List of compliance violations if any gate failed |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Localize().create({
  gates: {},
  listing: {},
  localized: {},
  marketplace: 'example_marketplace',
  pass: true,
  sourceLang: 'example_sourceLang',
  targetLang: 'example_targetLang',
  violations: [],
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LocalizeEntity` instance with the same client and
options.

#### `client()`

Return the parent `ListlocoSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new ListlocoSDK({
  feature: {
    test: { active: true },
  }
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

