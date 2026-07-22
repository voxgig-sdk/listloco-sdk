# Listloco SDK feature factory

from feature.base_feature import ListlocoBaseFeature
from feature.test_feature import ListlocoTestFeature


def _make_feature(name):
    features = {
        "base": lambda: ListlocoBaseFeature(),
        "test": lambda: ListlocoTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
