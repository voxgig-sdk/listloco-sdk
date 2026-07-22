-- Listloco SDK error

local ListlocoError = {}
ListlocoError.__index = ListlocoError


function ListlocoError.new(code, msg, ctx)
  local self = setmetatable({}, ListlocoError)
  self.is_sdk_error = true
  self.sdk = "Listloco"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function ListlocoError:error()
  return self.msg
end


function ListlocoError:__tostring()
  return self.msg
end


return ListlocoError
