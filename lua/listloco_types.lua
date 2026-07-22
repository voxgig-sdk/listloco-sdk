-- Typed models for the Listloco SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Localize
---@field dictionary? table
---@field gate table
---@field glossary? table
---@field listing table
---@field localized table
---@field marketplace string
---@field pass boolean
---@field source_lang string
---@field target_lang string
---@field violation table

---@class LocalizeCreateData
---@field dictionary? table
---@field gate table
---@field glossary? table
---@field listing table
---@field localized table
---@field marketplace string
---@field pass boolean
---@field source_lang string
---@field target_lang string
---@field violation table

local M = {}

return M
