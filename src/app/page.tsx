import { auth } from "@/lib/auth/auth"
import { env } from "@/lib/env.mjs"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export default async function Index() {
	console.log(env.DATABASE_URL)
	const session = await auth.api.getSession({
		headers: await headers()
	})

	if (!session?.session.userId) redirect("/auth")

	redirect("/app")
}
