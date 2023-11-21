export const Loading = () => {
    return (
        <>
            <div className="h-96 flex justify-center items-center w-full gap-3">
                <div className="rounded-full bg-red-200 p-3 w-1 loader"></div>
                <div className="rounded-full bg-red-200 p-3 w-1 loader2"></div>
                <div className="rounded-full bg-red-200 p-3 w-1 loader3"></div>
            </div>
        </>
    )
}