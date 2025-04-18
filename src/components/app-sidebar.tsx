import { Sidebar, SidebarContent } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

export function AppSidebar() {
	return (
		<Sidebar variant="inset">
			<SidebarContent className={cn("pt-12")}>Hello</SidebarContent>
		</Sidebar>
	)
}
