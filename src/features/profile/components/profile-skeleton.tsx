import { Skeleton } from "@/components/ui/skeleton";

export function ProfileSkeleton() {
	return (
		<main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
			<div className="w-full max-w-md space-y-6">
				<div className="rounded-2xl border bg-card p-8 shadow-sm">
					<div className="flex flex-col items-center text-center">
						<Skeleton className="size-20 rounded-full" />
						<Skeleton className="mt-4 h-6 w-32" />
						<Skeleton className="mt-2 h-4 w-48" />
						<Skeleton className="mt-2 h-3 w-36" />
						<Skeleton className="mt-3 h-6 w-16 rounded-full" />
					</div>
					<div className="mt-8 grid gap-3">
						<Skeleton className="h-11 w-full rounded-lg" />
						<Skeleton className="h-11 w-full rounded-lg" />
					</div>
				</div>
				<div className="rounded-2xl border border-dashed bg-muted/30 p-5">
					<div className="flex items-start gap-3">
						<Skeleton className="size-8 shrink-0 rounded-full" />
						<div className="flex-1 space-y-2">
							<Skeleton className="h-4 w-40" />
							<Skeleton className="h-3 w-full" />
							<Skeleton className="h-3 w-3/4" />
						</div>
					</div>
					<div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
						<Skeleton className="h-9 w-full" />
						<Skeleton className="h-9 w-full" />
					</div>
				</div>
			</div>
		</main>
	);
}

export function AuthenticatedPending() {
	return <ProfileSkeleton />;
}
