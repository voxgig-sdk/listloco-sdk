package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewLocalizeEntityFunc func(client *ListlocoSDK, entopts map[string]any) ListlocoEntity

