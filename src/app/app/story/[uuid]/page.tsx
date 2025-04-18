export default async function Story({
	params
}: {
	params: Promise<{ uuid: string }>
}) {
	const { uuid } = await params

	return <div>My Post: {uuid}</div>
}
