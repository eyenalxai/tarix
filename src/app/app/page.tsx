import { Button } from "@/components/ui/button"
import Link from "next/link"
import { v4 } from "uuid"

export default function App() {
	return (
		<div>
			<Button asChild>
				<Link href={`/app/story/${v4()}`}>asd</Link>
			</Button>
		</div>
	)
}
