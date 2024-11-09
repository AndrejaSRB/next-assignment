import clsxm from '@/utils/clsxm';
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/solid';

type TrendIndicatorProps = {
  value: number;
};

const TrendIndicator = ({ value }: TrendIndicatorProps) => {
  const isPositive = value > 0;

  return (
    <div
      className={clsxm(
        'p-1.25 flex items-center justify-center gap-0.5 rounded-lg bg-white/10',
        isPositive ? 'text-trands-positive' : 'text-trands-negative',
      )}
    >
      {isPositive ? (
        <ArrowTrendingUpIcon
          data-testid="trending-up-icon"
          className={clsxm(
            'flex items-center justify-center rounded-lg bg-gray-800 p-2',
            isPositive ? 'text-trands-positive' : 'text-trands-negative',
          )}
        />
      ) : (
        <ArrowTrendingDownIcon
          data-testid="trending-down-icon"
          className={clsxm(
            'h-3.25 w-3.25',
            isPositive ? 'text-trands-positive' : 'text-trands-negative',
          )}
        />
      )}
      <span className="leading-14 text-md font-medium">{`${value.toFixed(1)}%`}</span>
    </div>
  );
};

export default TrendIndicator;
