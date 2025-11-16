import Link from 'next/link';

export default function AdminPage() {
    return (
        <div>
            <h1 className="mb-4 text-2xl font-headline">Welcome, Admin!</h1>
            <p className="mb-6 text-muted-foreground">Select a tool from the sidebar to get started.</p>
            <div className="grid gap-4 md:grid-cols-2">
                 <Link href="/admin/paste-movies" className="block rounded-lg border bg-card p-6 text-card-foreground shadow-sm hover:bg-muted/50">
                    <h2 className="font-headline text-lg font-semibold">Paste Movie Data</h2>
                    <p className="text-sm text-muted-foreground">Update the `movies.json` file by pasting new content.</p>
                </Link>
                <Link href="/admin/augment-movie" className="block rounded-lg border bg-card p-6 text-card-foreground shadow-sm hover:bg-muted/50">
                     <h2 className="font-headline text-lg font-semibold">Augment Movie Details</h2>
                    <p className="text-sm text-muted-foreground">Use GenAI to create review summaries for movies.</p>
                </Link>
            </div>
        </div>
    )
}
