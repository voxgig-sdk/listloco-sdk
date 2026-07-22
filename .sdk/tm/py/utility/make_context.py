# Listloco SDK utility: make_context

from core.context import ListlocoContext


def make_context_util(ctxmap, basectx):
    return ListlocoContext(ctxmap, basectx)
