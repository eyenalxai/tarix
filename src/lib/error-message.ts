export const NOT_FOUND_ERROR = "NOT_FOUND"

export const getErrorMessage = (error: unknown, override: string) =>
	error instanceof Error && error.message !== "" ? error.message : override
