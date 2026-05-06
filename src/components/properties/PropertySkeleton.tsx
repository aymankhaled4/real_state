export default function PropertySkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-surface border border-border rounded-3xl animate-pulse">
          <div className="relative">
            <div className="rounded-t-3xl h-80 w-full bg-slate-200 dark:bg-slate-700"></div>

            <div className="w-10 h-10 bg-slate-300 dark:bg-slate-600 rounded-full absolute top-4 right-4"></div>
          </div>

          <div className="p-8">
            <div className="flex items-center justify-between">
              <div className="h-5 w-2/3 bg-slate-200 dark:bg-slate-700 rounded"></div>
              <div className="h-5 w-1/4 bg-slate-200 dark:bg-slate-700 rounded"></div>
            </div>

            <div className="h-4 w-1/3 bg-slate-200 dark:bg-slate-700 rounded mt-3"></div>
          </div>

          <div className="flex items-center gap-6 px-8 pb-8">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
              <div className="h-3 w-10 bg-slate-200 dark:bg-slate-700 rounded"></div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
              <div className="h-3 w-10 bg-slate-200 dark:bg-slate-700 rounded"></div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
              <div className="h-3 w-12 bg-slate-200 dark:bg-slate-700 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
