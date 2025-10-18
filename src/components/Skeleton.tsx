// components/Skeleton.tsx
export default function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`bg-gray-200 rounded-lg animate-pulse ${className}`}
    >
      <div className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 h-full w-full rounded-lg shimmer" />
    </div>
  );
}
