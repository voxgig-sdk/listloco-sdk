
import { Context } from './Context'


class ListlocoError extends Error {

  isListlocoError = true

  sdk = 'Listloco'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  ListlocoError
}

