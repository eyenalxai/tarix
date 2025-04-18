import { NOT_FOUND_ERROR } from "@/lib/error-message"
import { parseZodSchema } from "@/lib/zod/parse"
import {
	storiesSchema,
	storyInsertSchema,
	storyWithScenesSchema
} from "@/lib/zod/story"
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc"
import {
	getStories,
	getStoryByUuid,
	insertStory
} from "@/server/database/query/story"
import { TRPCError } from "@trpc/server"
import { z } from "zod"

export const storyRouter = createTRPCRouter({
	getStoryByUuid: protectedProcedure
		.input(
			z.object({
				uuid: z.string()
			})
		)
		.query(
			async ({ ctx, input }) =>
				await getStoryByUuid(ctx.db, {
					uuid: input.uuid,
					userId: ctx.session.user.id
				}).match(
					(data) => {
						console.log(data)
						if (!data)
							throw new TRPCError({
								code: NOT_FOUND_ERROR,
								message: "Story not found"
							})

						return parseZodSchema(storyWithScenesSchema, data).match(
							(data) => data,
							(error) => {
								throw new TRPCError({
									code: "INTERNAL_SERVER_ERROR",
									message: error
								})
							}
						)
					},
					(error) => {
						throw new TRPCError({
							code: "INTERNAL_SERVER_ERROR",
							message: error
						})
					}
				)
		),
	getStories: protectedProcedure.query(
		async ({ ctx }) =>
			await getStories(ctx.db, { userId: ctx.session.user.id })
				.andThen((data) => parseZodSchema(storiesSchema, data))
				.match(
					(data) => data,
					(error) => {
						throw new TRPCError({
							code: "INTERNAL_SERVER_ERROR",
							message: error
						})
					}
				)
	),
	insertStory: protectedProcedure.input(storyInsertSchema).mutation(
		async ({ ctx, input }) =>
			await insertStory(ctx.db, {
				...input,
				userId: ctx.session.user.id
			}).match(
				(data) => data,
				(error) => {
					throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error })
				}
			)
	)
})
