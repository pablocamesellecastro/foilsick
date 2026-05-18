"use client";
import { SidebarGroup, SidebarMenu, SidebarMenuItem, useSidebar } from "@components/ui/sidebar";
import LanguageSelector from "./LanguageSelector";
import SwitchFullScreen from "./SwitchFullScreen";
import ThemeSelector from "./ThemeSelector";


export default function SidebarBottom({ ...props }: {} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
	const { isMobile } = useSidebar();

	return (<>
		{/* <SidebarGroup {...props}>
			<SidebarGroupContent> */}
				<SidebarMenu className="mb-3">
					<SidebarMenuItem>
            <LanguageSelector isMobile={isMobile} />
					</SidebarMenuItem>
					<SidebarMenuItem>
            <ThemeSelector isMobile={isMobile} />
					</SidebarMenuItem>
					<SidebarMenuItem>
            <SwitchFullScreen />
					</SidebarMenuItem>
				</SidebarMenu>
			{/* </SidebarGroupContent>
		</SidebarGroup> */}
	</>);
}