import { StoryLoader } from "@/components/story/story-loader"

export default async function Story(props: {
	params: Promise<{ uuid: string }>
}) {
	const { uuid } = await props.params

	return <StoryLoader uuid={uuid} />
}
