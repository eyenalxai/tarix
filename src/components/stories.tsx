"use client"

import { Button } from "@/components/ui/button"
import { useStories } from "@/lib/hooks/query/story"
import Link from "next/link"
import { v4 } from "uuid"

export const Stories = () => {
	const { data, isPending, error } = useStories()

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
