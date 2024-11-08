import DustIcon from 'public/dust-image.svg';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import { Tooltip } from 'react-tooltip';

type DustTokenProps = {
  amount: number;
};

const DustToken = ({ amount }: DustTokenProps) => {
  const iconsToShow = Math.min(amount, 3);

  return (
    <div>
      <div className="flex items-center gap-1">
        <div className="flex -space-x-1 overflow-hidden">
          {[...Array(iconsToShow)].map((_, index) => (
            <DustIcon key={index} className="h-[13px] w-[13px]" />
          ))}
        </div>

        {amount > 3 && (
          <span className="text-sm font-semibold leading-[13px] text-customBlue">
            +{amount - 3}
          </span>
        )}
      </div>

      <div className="gap-1/2 flex items-center">
        <span className="text-xs leading-[10px] text-white/55">
          Dust tokens
        </span>

        <InformationCircleIcon
          data-testid="dust-token-information-icon"
          data-tooltip-id="dust-tooltip"
          className="h-2 w-2 text-white/65"
        />

        <Tooltip
          id="dust-tooltip"
          content="Dust is simply a trace amount of cryptocurrency that's leftover after a trade or transaction."
          place="top"
          className="text-lg"
        />
      </div>
    </div>
  );
};

export default DustToken;
