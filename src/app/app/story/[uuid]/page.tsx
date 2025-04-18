import { Story } from "@/components/story"

export default async function StoryPage({
	params
}: {
	params: Promise<{ uuid: string }>
}) {
	const { uuid } = await params

	return <Story uuid={uuid} />
}
