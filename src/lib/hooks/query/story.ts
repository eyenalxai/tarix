"use client"

import { fetchStory } from "@/lib/fetch/story"
import { useQuery } from "@tanstack/react-query"

export const useStory = (uuid: string) => {
	return useQuery({
		queryKey: ["story", uuid],
		queryFn: () => fetchStory(uuid)
	})
}
