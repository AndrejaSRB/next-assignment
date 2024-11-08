import Card from '../../common/Card/Card';

const PortfolioSkeleton = () => (
  <div className="animate-pulse space-y-8">
    <div className="h-16 rounded-lg bg-customDarkerGray" />
    <Card>
      <div className="mb-3 h-8 rounded-lg bg-customDarkerGray" />

      <div className="flex flex-col gap-1">
        <div className="h-11 rounded-lg bg-customDarkerGray" />
        <div className="h-11 rounded-lg bg-customDarkerGray" />
        <div className="h-11 rounded-lg bg-customDarkerGray" />
        <div className="h-11 rounded-lg bg-customDarkerGray" />
        <div className="h-11 rounded-lg bg-customDarkerGray" />
        <div className="h-11 rounded-lg bg-customDarkerGray" />
      </div>
    </Card>
  </div>
);

export default PortfolioSkeleton;
