import React from 'react';

export function SkeletonCard() {
  return (
    <div className="w-full rounded-xl p-4 bg-white/5 border border-white/10">
      <div className="w-full mb-4 rounded-xl aspect-video animate-shimmer"></div>
      <div className="h-4 w-3/4 rounded-md bg-white/10 animate-shimmer mb-2"></div>
      <div className="h-3 w-1/2 rounded-md bg-white/10 animate-shimmer"></div>
    </div>
  );
}

export function SkeletonGrid({ count = 8 }) {
  return (
    <div className="flex flex-wrap -m-2">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="p-2 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
          <SkeletonCard />
        </div>
      ))}
    </div>
  );
}

