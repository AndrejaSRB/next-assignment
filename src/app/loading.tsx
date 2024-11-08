import PortfolioSkeleton from './components/Portfolio/Holdings/PortfolioSkeleton';

export default function Loading() {
  return (
    <div className="min-h-screen w-full grow lg:flex">
      <div className="flex-1 xl:flex">
        <div>
          <h1>Loading...</h1>
        </div>
      </div>
      <div className="w-full border-l border-white border-opacity-10 px-4 py-8 lg:max-w-[466px] lg:px-5">
        <PortfolioSkeleton />
      </div>
    </div>
  );
}
