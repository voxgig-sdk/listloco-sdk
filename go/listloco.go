package voxgiglistlocosdk

import (
	"github.com/voxgig-sdk/listloco-sdk/go/core"
	"github.com/voxgig-sdk/listloco-sdk/go/entity"
	"github.com/voxgig-sdk/listloco-sdk/go/feature"
	_ "github.com/voxgig-sdk/listloco-sdk/go/utility"
)

// Type aliases preserve external API.
type ListlocoSDK = core.ListlocoSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type ListlocoEntity = core.ListlocoEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type ListlocoError = core.ListlocoError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewLocalizeEntityFunc = func(client *core.ListlocoSDK, entopts map[string]any) core.ListlocoEntity {
		return entity.NewLocalizeEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewListlocoSDK = core.NewListlocoSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewListlocoSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *ListlocoSDK  { return NewListlocoSDK(nil) }
func Test() *ListlocoSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
