# ProjectName SDK exists test

import pytest
from listloco_sdk import ListlocoSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = ListlocoSDK.test(None, None)
        assert testsdk is not None
