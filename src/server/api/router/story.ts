import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc"
import { getStories, getStoryByUuid } from "@/server/database/query/story"
import { TRPCError } from "@trpc/server"
import { z } from "zod"

export const storyRouter = createTRPCRouter({
	getStoryByUuid: protectedProcedure
		.input(
			z.object({
				uuid: z.string(),
				userId: z.string()
			})
		)
		.mutation(async ({ ctx, input }) => {
			await getStoryByUuid(ctx.db, input).match(
				(data) => data,
				(error) => {
					throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error })
				}
			)
		}),
	getStories: protectedProcedure.query(async ({ ctx }) => {
		return await getStories(ctx.db, { userId: ctx.session.user.id }).match(
			(data) => data,
			(error) => {
				throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error })
			}
		)
	})
})
