# Listloco SDK feature factory

from listloco_sdk.feature.base_feature import ListlocoBaseFeature
from listloco_sdk.feature.ratelimit_feature import ListlocoRatelimitFeature
from listloco_sdk.feature.retry_feature import ListlocoRetryFeature
from listloco_sdk.feature.test_feature import ListlocoTestFeature
from listloco_sdk.feature.timeout_feature import ListlocoTimeoutFeature


_FEATURES = {
    "base": lambda: ListlocoBaseFeature(),
    "ratelimit": lambda: ListlocoRatelimitFeature(),
    "retry": lambda: ListlocoRetryFeature(),
    "test": lambda: ListlocoTestFeature(),
    "timeout": lambda: ListlocoTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
