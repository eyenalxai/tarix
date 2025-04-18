"use client"

import { api } from "@/components/trpc-provider"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { v4 } from "uuid"

export const Stories = () => {
	const { data, isPending, error } = api.story.getStories.useQuery()

	if (isPending) return <div>Loading...</div>
	if (error) return <div>Error: {error.message}</div>

	return (
		<div>
			{data?.map((story) => (
				<div key={story.uuid}>{story.uuid}</div>
			))}
			<Button asChild>
				<Link href={`/app/story/${v4()}`}>New</Link>
			</Button>
		</div>
	)
}
