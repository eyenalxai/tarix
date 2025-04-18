import { auth } from "@/lib/auth/auth"
import { getStories } from "@/lib/database/query/story"
import { parseZodSchema } from "@/lib/zod/parse"
import { storiesSchema } from "@/lib/zod/story"
import { type NextRequest, NextResponse } from "next/server"

export const GET = async (request: NextRequest) => {
	const session = await auth.api.getSession({
		headers: request.headers
	})

	if (!session?.session.userId)
		return new NextResponse("Forbidden", { status: 403 })

	const searchParams = request.nextUrl.searchParams
	const uuid = searchParams.get("uuid")

	if (!uuid) return new NextResponse("uuid is required", { status: 400 })

	return await getStories({ userId: session.session.userId })
		.andThen((stories) => parseZodSchema(storiesSchema, stories))
		.match(
			(stories) => NextResponse.json(stories, { status: 200 }),
			(e) => {
				console.error(e)
				return new NextResponse(e, { status: 400 })
			}
		)
}
