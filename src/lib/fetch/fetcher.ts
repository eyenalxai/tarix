"use client"

import { parseZodSchema } from "@/lib/zod/parse"
import ky, {
	HTTPError,
	type Input as KyInput,
	type Options as KyOptions
} from "ky"
import type { ZodType, ZodTypeDef } from "zod"

type NonDefaultType<T> = unknown extends T ? never : T

interface ExtendedOptions<T> extends KyOptions {
	schema?: ZodType<T, ZodTypeDef, unknown>
}

export async function api<T>(
	url: KyInput,
	options: ExtendedOptions<T> & { schema: ZodType<T, ZodTypeDef, unknown> }
): Promise<NonDefaultType<T>>
export async function api(
	url: KyInput,
	options: ExtendedOptions<unknown>
): Promise<Response>

export async function api<T>(
	url: KyInput,
	options: ExtendedOptions<T>
): Promise<T | Response> {
	try {
		const response = await ky(url, {
			...options,
			credentials: "include"
		})

		if (options.schema) {
			const data = await response.json()
			const result = parseZodSchema(options.schema, data)

			if (result.isErr()) throw new Error(result.error)

			return result.value
		}

		return response
	} catch (e) {
		if (e instanceof HTTPError) throw new Error(await e.response.text())
		throw e
	}
}
