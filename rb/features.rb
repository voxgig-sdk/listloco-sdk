# Listloco SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module ListlocoFeatures
  def self.make_feature(name)
    case name
    when "base"
      ListlocoBaseFeature.new
    when "test"
      ListlocoTestFeature.new
    else
      ListlocoBaseFeature.new
    end
  end
end
