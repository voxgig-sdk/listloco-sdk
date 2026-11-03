# Listloco SDK utility: prepare_body
require_relative 'media'
module ListlocoUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return ListlocoUtilities.raw_body(ctx.reqdata) if ListlocoUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
