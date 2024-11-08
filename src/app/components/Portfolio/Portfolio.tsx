import PortfolioHeading from './PortfolioHeading';
import Holdings from './Holdings/Holdings';
import env from '@/lib/env';
import type PortfolioData from '@/types/PortfolioData';

export default async function Portfolio() {
  const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/portfolio`);

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
      />

      <div className="mt-8.5">
        <Holdings assets={assets} />
      </div>
    </>
  );
}
