import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/custom/theme-toggle";
import { ConfirmDialogProvider } from "@/providers/confirm-dialog-provider";
import { ThemeProvider } from "@/providers/theme-provider";

export function Providers({ children }: { children: ReactNode }) {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="theme">
			<ConfirmDialogProvider>
				<div className="fixed top-6 right-6 z-50">
					<ThemeToggle />
				</div>
				{children}
			</ConfirmDialogProvider>
		</ThemeProvider>
	);
}
