-- Listloco SDK exists test

local sdk = require("listloco_sdk")

describe("ListlocoSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
