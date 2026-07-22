package core

type ListlocoError struct {
	IsListlocoError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewListlocoError(code string, msg string, ctx *Context) *ListlocoError {
	return &ListlocoError{
		IsListlocoError: true,
		Sdk:              "Listloco",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *ListlocoError) Error() string {
	return e.Msg
}
