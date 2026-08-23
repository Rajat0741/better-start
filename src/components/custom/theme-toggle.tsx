import { IconCircleHalf2 } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useToggleTheme } from "@/providers/theme-provider";

export function ThemeToggle() {
	const toggleTheme = useToggleTheme();

	return (
		<Button onClick={toggleTheme} variant="ghost" size="icon-lg">
			<IconCircleHalf2 />
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}
