import { NOT_FOUND_ERROR } from "@/lib/error-message"
import { storySchema } from "@/lib/zod/story"
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
						if (!data)
							throw new TRPCError({
								code: NOT_FOUND_ERROR,
								message: "Story not found"
							})

						return data
					},
					(error) => {
						throw new TRPCError({
							code: "INTERNAL_SERVER_ERROR",
							message: error
						})
					}
				)
		),
	getStories: protectedProcedure.query(async ({ ctx }) => {
		return await getStories(ctx.db, { userId: ctx.session.user.id }).match(
			(data) => data,
			(error) => {
				throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error })
			}
		)
	}),
	insertStory: protectedProcedure.input(storySchema).mutation(
		async ({ ctx, input }) =>
			await insertStory(ctx.db, input).match(
				(data) => data,
				(error) => {
					throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error })
				}
			)
	)
})
