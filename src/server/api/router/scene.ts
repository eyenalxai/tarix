import { actionsSchema, selectedActionSchema } from "@/lib/zod/scene"
import { sceneInsertSchema } from "@/lib/zod/scene"
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc"
import {
	insertScene,
	setActions,
	setSelectedAction
} from "@/server/database/query/scene"
import { TRPCError } from "@trpc/server"
import { z } from "zod"

export const sceneRouter = createTRPCRouter({
	insert: protectedProcedure
		.input(sceneInsertSchema)
		.mutation(async ({ ctx, input }) => {
			await insertScene(ctx.db, input).match(
				(data) => data,
				(error) => {
					throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error })
				}
			)
		}),
	setActions: protectedProcedure
		.input(
			z.object({
				storyId: z.string(),
				actions: actionsSchema
			})
		)
		.mutation(async ({ ctx, input }) => {
			await setActions(ctx.db, input).match(
				() => "OK",
				(error) => {
					throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error })
				}
			)
		}),
	setSelectedAction: protectedProcedure
		.input(
			z.object({
				storyId: z.string(),
				selectedAction: selectedActionSchema
			})
		)
		.mutation(async ({ ctx, input }) => {
			await setSelectedAction(ctx.db, input).match(
				() => "OK",
				(error) => {
					throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error })
				}
			)
		})
})
