import { createContext, useContext, useRef, useState } from "react";
import { ConfirmDialog } from "../components/custom/confirm-dialog";

type ConfirmOptions = {
	title: string;
	description?: string;
	confirmLabel?: string;
	className?: string;
	onConfirm: () => Promise<void> | void;
};

type ConfirmContextValue = {
	confirm: (options: ConfirmOptions) => void;
};

const ConfirmContext = createContext<ConfirmContextValue | null>(null);

type DialogState = {
	open: boolean;
	isLoading: boolean;
	title: string;
	description?: string;
	confirmLabel?: string;
	className?: string;
};

const DEFAULT_STATE: DialogState = {
	open: false,
	isLoading: false,
	title: "",
	description: undefined,
};

export function ConfirmDialogProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [dialogState, setDialogState] = useState<DialogState>(DEFAULT_STATE);
	const onConfirmRef = useRef<(() => Promise<void> | void) | null>(null);

	const confirm = ({ onConfirm, ...options }: ConfirmOptions) => {
		onConfirmRef.current = onConfirm;
		setDialogState({ ...options, open: true, isLoading: false });
	};

	const handleConfirm = async () => {
		if (!onConfirmRef.current) return;
		setDialogState((prev) => ({ ...prev, isLoading: true }));
		try {
			await onConfirmRef.current();
		} finally {
			onConfirmRef.current = null;
			setDialogState(DEFAULT_STATE);
		}
	};

	const handleOpenChange = (isOpen: boolean) => {
		if (!isOpen) {
			onConfirmRef.current = null;
			setDialogState(DEFAULT_STATE);
		}
	};

	return (
		<ConfirmContext.Provider value={{ confirm }}>
			{children}
			<ConfirmDialog
				open={dialogState.open}
				onOpenChange={handleOpenChange}
				title={dialogState.title}
				description={dialogState.description}
				confirmLabel={dialogState.confirmLabel}
				className={dialogState.className}
				isLoading={dialogState.isLoading}
				onConfirm={handleConfirm}
			/>
		</ConfirmContext.Provider>
	);
}

export function useConfirm() {
	const ctx = useContext(ConfirmContext);
	if (!ctx) {
		throw new Error("useConfirm must be used within <ConfirmDialogProvider>");
	}
	return ctx.confirm;
}
