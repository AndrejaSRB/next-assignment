const PREVENT_FETCH_IN_PRODUCTION = true;

export default async function Portfolio() {
  // Check if we're in a build-time environment
  if (PREVENT_FETCH_IN_PRODUCTION) {
    return (
      <div>
        <p>Build-time rendering placeholder</p>
      </div>
    );
  }

  //   return (
  //     <>
  //       <PortfolioHeading
  //         totalValue={total_usd_value}
  //         percentageChange={portfolio_change['24hr'].percentage_change}
  //       />
  //
  //       <div className="mt-8.5">
  //         <Holdings assets={assets} />
  //       </div>
  //     </>
  //   );
}
