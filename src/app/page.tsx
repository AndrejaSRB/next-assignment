import { Suspense } from 'react';
import PageContainer from './components/common/PageContainer/PageContainer';
import Portfolio from './components/Portfolio/Portfolio';
import PortfolioSkeleton from './components/Portfolio/Holdings/PortfolioSkeleton';

export default function Home() {
  return (
    <PageContainer>
      <div className="min-h-screen w-full grow lg:flex">
        <div className="flex flex-1 items-center justify-center">
          <h1 className="p-4 text-xl font-semibold">Portfolio dApp</h1>
        </div>

        <div className="w-full border-l border-white border-opacity-10 px-4 py-8 lg:max-w-[466px] lg:px-5">
          <Suspense fallback={<PortfolioSkeleton />}>
            <Portfolio />
          </Suspense>
        </div>
      </div>
    </PageContainer>
  );
}
