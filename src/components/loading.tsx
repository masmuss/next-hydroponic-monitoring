export default function Loading() {
    return (
        <div className="flex min-h-[100dvh] items-center justify-center bg-background">
            <div className="flex flex-col items-center space-y-4">
                <div className="animate-spin rounded-full border-4 border-primary border-t-transparent h-12 w-12" />
                <p className="text-primary text-lg font-medium">Loading...</p>
            </div>
        </div>
    )
}