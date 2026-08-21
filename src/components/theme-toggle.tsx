import { IconCircleHalf2 } from "@tabler/icons-react";
import { useToggleTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
	const toggleTheme = useToggleTheme();

	return (
		<Button onClick={toggleTheme} variant="ghost" size="icon-lg">
			<IconCircleHalf2 />
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}
