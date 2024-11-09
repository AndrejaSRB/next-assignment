import Holdings from './Holdings/Holdings';
import env from '@/lib/env';
import type PortfolioData from '@/types/PortfolioData';
import PortfolioHeading from './PortfolioHeading/PortfolioHeading';

export default async function Portfolio() {
  const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/portfolio`, {
    next: {
      revalidate: 3600, // 1 hour
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const data: PortfolioData = await response.json();

  const { total_usd_value, portfolio_change, assets } = data;

  return (
    <>
      <PortfolioHeading
        totalValue={total_usd_value}
        percentageChange={portfolio_change['24hr'].percentage_change}
        usdChange={portfolio_change['24hr'].usd_change}
      />

      <div className="mt-8.5">
        <Holdings assets={assets} />
      </div>
    </>
  );
}
