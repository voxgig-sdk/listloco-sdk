# Listloco SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

ListlocoUtility.registrar = ->(u) {
  u.clean = ListlocoUtilities::Clean
  u.done = ListlocoUtilities::Done
  u.make_error = ListlocoUtilities::MakeError
  u.feature_add = ListlocoUtilities::FeatureAdd
  u.feature_hook = ListlocoUtilities::FeatureHook
  u.feature_init = ListlocoUtilities::FeatureInit
  u.fetcher = ListlocoUtilities::Fetcher
  u.make_fetch_def = ListlocoUtilities::MakeFetchDef
  u.make_context = ListlocoUtilities::MakeContext
  u.make_options = ListlocoUtilities::MakeOptions
  u.make_request = ListlocoUtilities::MakeRequest
  u.make_response = ListlocoUtilities::MakeResponse
  u.make_result = ListlocoUtilities::MakeResult
  u.make_point = ListlocoUtilities::MakePoint
  u.make_spec = ListlocoUtilities::MakeSpec
  u.make_url = ListlocoUtilities::MakeUrl
  u.param = ListlocoUtilities::Param
  u.prepare_auth = ListlocoUtilities::PrepareAuth
  u.prepare_body = ListlocoUtilities::PrepareBody
  u.prepare_headers = ListlocoUtilities::PrepareHeaders
  u.prepare_method = ListlocoUtilities::PrepareMethod
  u.prepare_params = ListlocoUtilities::PrepareParams
  u.prepare_path = ListlocoUtilities::PreparePath
  u.prepare_query = ListlocoUtilities::PrepareQuery
  u.result_basic = ListlocoUtilities::ResultBasic
  u.result_body = ListlocoUtilities::ResultBody
  u.result_headers = ListlocoUtilities::ResultHeaders
  u.transform_request = ListlocoUtilities::TransformRequest
  u.transform_response = ListlocoUtilities::TransformResponse
}
