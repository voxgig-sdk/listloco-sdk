# Listloco SDK utility: make_context
require_relative '../core/context'
module ListlocoUtilities
  MakeContext = ->(ctxmap, basectx) {
    ListlocoContext.new(ctxmap, basectx)
  }
end
