import LoadingCard from "./loadingCard";

export const LoadingSkeleton = ({ itemCount = 10, className = "" }) => {
  return (
    <>
      {Array.from({ length: itemCount }, (_, index) => (
        <LoadingCard key={index} className={`h-[48px] ${className}`} />
      ))}
    </>
  );
};
