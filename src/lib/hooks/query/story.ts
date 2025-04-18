"use client"

import { fetchStories, fetchStory } from "@/lib/fetch/story"
import { useQuery } from "@tanstack/react-query"

export const useStory = (uuid: string) => {
	return useQuery({
		queryKey: ["story", uuid],
		queryFn: async () =>
			await fetchStory(uuid).match(
				(story) => story,
				(error) => {
					throw new Error(error)
				}
			)
	})
}

export const useStories = () => {
	return useQuery({
		queryKey: ["stories"],
		queryFn: async () =>
			await fetchStories().match(
				(stories) => stories,
				(error) => {
					throw new Error(error)
				}
			)
	})
}
