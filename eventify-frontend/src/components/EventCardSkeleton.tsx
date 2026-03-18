export default function EventCardSkeleton() {

    return (

        <div className="bg-white rounded-xl shadow overflow-hidden animate-pulse">

            <div className="h-48 bg-slate-200"></div>

            <div className="p-4 space-y-2">

                <div className="h-4 bg-slate-200 rounded w-3/4"></div>

                <div className="h-4 bg-slate-200 rounded w-full"></div>

            </div>

        </div>

    );

}