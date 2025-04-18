import { auth } from "@/lib/auth/auth"
import { getStoryByUuid, storyNotFoundError } from "@/lib/database/query/story"
import { parseZodSchema } from "@/lib/zod/parse"
import { storySchema } from "@/lib/zod/story"
import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"
import { type NextRequest, NextResponse } from "next/server"

export const maxDuration = 30

export async function POST(req: Request) {
	const { messages, initialPrompt } = await req.json()

	console.table(initialPrompt)

	const result = streamText({
		model: openai("gpt-4o"),
		messages
	})

	return result.toDataStreamResponse()
}

export const GET = async (request: NextRequest) => {
	const session = await auth.api.getSession({
		headers: request.headers
	})

	if (!session?.session.userId)
		return new NextResponse("Forbidden", { status: 403 })

	const searchParams = request.nextUrl.searchParams
	const uuid = searchParams.get("uuid")

	if (!uuid) return new NextResponse("uuid is required", { status: 400 })

	return await getStoryByUuid({ uuid, userId: session.session.userId })
		.andThen((story) => parseZodSchema(storySchema, story))
		.match(
			(story) => NextResponse.json(story, { status: 200 }),
			(e) => {
				console.error(e)
				if (e === storyNotFoundError)
					return new NextResponse("Story not found", { status: 404 })
				return new NextResponse(e, { status: 400 })
			}
		)
}
