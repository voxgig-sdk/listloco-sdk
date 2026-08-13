-- Typed models for the Listloco SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Localize
---@field dictionary? table
---@field gates table
---@field glossary? table
---@field listing table
---@field localized table
---@field marketplace string
---@field pass boolean
---@field sourceLang string
---@field targetLang string
---@field violations table

---@class LocalizeCreateData
---@field dictionary? table
---@field gates table
---@field glossary? table
---@field listing table
---@field localized table
---@field marketplace string
---@field pass boolean
---@field sourceLang string
---@field targetLang string
---@field violations table

local M = {}

return M
