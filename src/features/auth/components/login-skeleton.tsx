import { Skeleton } from "@/components/ui/skeleton";

export function LoginSkeleton() {
	return (
		<main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
			<div className="w-full max-w-sm">
				<Skeleton className="mb-4 h-4 w-28" />
				<div className="rounded-2xl border bg-card p-8 shadow-sm">
					<div className="mb-8 flex flex-col items-center text-center">
						<Skeleton className="h-7 w-36" />
						<Skeleton className="mt-2 h-4 w-52" />
					</div>
					<Skeleton className="h-11 w-full rounded-lg" />
					<Skeleton className="mx-auto mt-6 h-3 w-56" />
				</div>
			</div>
		</main>
	);
}
