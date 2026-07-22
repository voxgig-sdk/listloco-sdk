# Listloco SDK exists test

require "minitest/autorun"
require_relative "../Listloco_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = ListlocoSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
