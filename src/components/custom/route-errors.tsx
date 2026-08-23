import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { AppError } from "@/utils/app-error";

type RouteErrorProps = {
	code: number;
	title: string;
	description?: string;
};

function RouteError({ code, title, description }: RouteErrorProps) {
	return (
		<main className="flex min-h-svh flex-col items-center justify-center gap-8 px-4 text-center">
			<div className="flex flex-col items-center gap-2">
				<span
					aria-hidden
					className="bg-linear-to-b from-foreground/70 to-foreground/5 bg-clip-text font-mono text-7xl font-bold tracking-tight text-transparent select-none sm:text-8xl"
				>
					{code}
				</span>
				<h1 className="text-lg font-semibold tracking-tight">{title}</h1>
				{description && (
					<p className="max-w-sm text-balance text-sm text-muted-foreground">
						{description}
					</p>
				)}
			</div>
			<Button variant="outline" size="lg" render={<Link to="/" />}>
				Go back home
			</Button>
		</main>
	);
}

export function ErrorComponent({ error }: { error: unknown }) {
	const isAppError = error instanceof AppError;
	const statusCode = isAppError ? error.statusCode : 500;

	return (
		<RouteError
			code={statusCode}
			title={isAppError ? "Request failed" : "Something went wrong"}
			description={
				isAppError
					? error.message
					: "An unexpected error occurred. Please try again."
			}
		/>
	);
}

export function NotFoundComponent() {
	return (
		<RouteError
			code={404}
			title="Page not found"
			description="The page you are looking for doesn't exist or has been moved."
		/>
	);
}
