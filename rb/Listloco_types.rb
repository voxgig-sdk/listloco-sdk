# frozen_string_literal: true

# Typed models for the Listloco SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Localize entity data model.
#
# @!attribute [rw] dictionary
#   @return [Hash, nil]
#
# @!attribute [rw] gate
#   @return [Hash]
#
# @!attribute [rw] glossary
#   @return [Hash, nil]
#
# @!attribute [rw] listing
#   @return [Hash]
#
# @!attribute [rw] localized
#   @return [Hash]
#
# @!attribute [rw] marketplace
#   @return [String]
#
# @!attribute [rw] pass
#   @return [Boolean]
#
# @!attribute [rw] source_lang
#   @return [String]
#
# @!attribute [rw] target_lang
#   @return [String]
#
# @!attribute [rw] violation
#   @return [Array]
Localize = Struct.new(
  :dictionary,
  :gate,
  :glossary,
  :listing,
  :localized,
  :marketplace,
  :pass,
  :source_lang,
  :target_lang,
  :violation,
  keyword_init: true
)

# Request payload for Localize#create.
#
# @!attribute [rw] dictionary
#   @return [Hash, nil]
#
# @!attribute [rw] gate
#   @return [Hash]
#
# @!attribute [rw] glossary
#   @return [Hash, nil]
#
# @!attribute [rw] listing
#   @return [Hash]
#
# @!attribute [rw] localized
#   @return [Hash]
#
# @!attribute [rw] marketplace
#   @return [String]
#
# @!attribute [rw] pass
#   @return [Boolean]
#
# @!attribute [rw] source_lang
#   @return [String]
#
# @!attribute [rw] target_lang
#   @return [String]
#
# @!attribute [rw] violation
#   @return [Array]
LocalizeCreateData = Struct.new(
  :dictionary,
  :gate,
  :glossary,
  :listing,
  :localized,
  :marketplace,
  :pass,
  :source_lang,
  :target_lang,
  :violation,
  keyword_init: true
)

