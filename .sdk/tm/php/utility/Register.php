<?php
declare(strict_types=1);

// Listloco SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

ListlocoUtility::setRegistrar(function (ListlocoUtility $u): void {
    $u->clean = [ListlocoClean::class, 'call'];
    $u->done = [ListlocoDone::class, 'call'];
    $u->make_error = [ListlocoMakeError::class, 'call'];
    $u->feature_add = [ListlocoFeatureAdd::class, 'call'];
    $u->feature_hook = [ListlocoFeatureHook::class, 'call'];
    $u->feature_init = [ListlocoFeatureInit::class, 'call'];
    $u->fetcher = [ListlocoFetcher::class, 'call'];
    $u->make_fetch_def = [ListlocoMakeFetchDef::class, 'call'];
    $u->make_context = [ListlocoMakeContext::class, 'call'];
    $u->make_options = [ListlocoMakeOptions::class, 'call'];
    $u->make_request = [ListlocoMakeRequest::class, 'call'];
    $u->make_response = [ListlocoMakeResponse::class, 'call'];
    $u->make_result = [ListlocoMakeResult::class, 'call'];
    $u->make_point = [ListlocoMakePoint::class, 'call'];
    $u->make_spec = [ListlocoMakeSpec::class, 'call'];
    $u->make_url = [ListlocoMakeUrl::class, 'call'];
    $u->param = [ListlocoParam::class, 'call'];
    $u->prepare_auth = [ListlocoPrepareAuth::class, 'call'];
    $u->prepare_body = [ListlocoPrepareBody::class, 'call'];
    $u->prepare_headers = [ListlocoPrepareHeaders::class, 'call'];
    $u->prepare_method = [ListlocoPrepareMethod::class, 'call'];
    $u->prepare_params = [ListlocoPrepareParams::class, 'call'];
    $u->prepare_path = [ListlocoPreparePath::class, 'call'];
    $u->prepare_query = [ListlocoPrepareQuery::class, 'call'];
    $u->result_basic = [ListlocoResultBasic::class, 'call'];
    $u->result_body = [ListlocoResultBody::class, 'call'];
    $u->result_headers = [ListlocoResultHeaders::class, 'call'];
    $u->transform_request = [ListlocoTransformRequest::class, 'call'];
    $u->transform_response = [ListlocoTransformResponse::class, 'call'];
});
