# Listloco SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module ListlocoFeatures
  def self.make_feature(name)
    case name
    when "base"
      ListlocoBaseFeature.new
    when "ratelimit"
      ListlocoRatelimitFeature.new
    when "retry"
      ListlocoRetryFeature.new
    when "test"
      ListlocoTestFeature.new
    when "timeout"
      ListlocoTimeoutFeature.new
    else
      ListlocoBaseFeature.new
    end
  end
end
