import { AppSidebar } from "@/components/app-sidebar"
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<main className={cn("p-4")}>
					<div className={cn("fixed top-4 left-4 z-10")}>
						<SidebarTrigger
							className={cn("bg-sidebar", "cursor-pointer", "size-8")}
						/>
					</div>
					{children}
				</main>
			</SidebarInset>
		</SidebarProvider>
	)
}
