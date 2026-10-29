import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

type ConfirmDialogProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title: string;
	description?: string;
	confirmLabel?: string;
	className?: string;
	isLoading?: boolean;
	onConfirm: () => void | Promise<void>;
};

export function ConfirmDialog({
	open,
	onOpenChange,
	title,
	description,
	confirmLabel,
	className,
	isLoading = false,
	onConfirm,
}: ConfirmDialogProps) {
	const handleOpenChange = (state: boolean) => {
		// Prevent closing the dialog while an async confirmation is in flight.
		if (!state && isLoading) return;
		onOpenChange(state);
	};

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogContent className={className}>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					{description && <DialogDescription>{description}</DialogDescription>}
				</DialogHeader>
				<DialogFooter>
					<Button variant="outline" onClick={() => handleOpenChange(false)} disabled={isLoading}>
						Cancel
					</Button>
					<Button variant="destructive" disabled={isLoading} onClick={onConfirm}>
						{isLoading ? "Processing..." : (confirmLabel ?? "Confirm")}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
