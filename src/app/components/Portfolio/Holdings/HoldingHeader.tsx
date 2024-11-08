import { ChevronDownIcon } from '@heroicons/react/24/outline';

const HoldingHeader = () => (
  <div className="flex items-center justify-between text-white/50">
    <div className="w-1/3 flex-shrink-0 leading-none">
      <span className="text-sm text-white/55">Asset</span>
    </div>

    <div className="group flex w-1/3 flex-shrink-0 cursor-pointer items-center gap-1 leading-none">
      <span className="text-sm text-white/55 transition-colors duration-200 group-hover:text-white">
        Total value
      </span>
      <ChevronDownIcon className="h-3 w-3 transition-colors duration-200 group-hover:text-white" />
    </div>

    <div className="group flex w-1/3 flex-shrink-0 cursor-pointer items-center gap-1 leading-none">
      <span className="text-sm text-white/55 transition-colors duration-200 group-hover:text-white">
        Amount
      </span>
      <ChevronDownIcon className="h-3 w-3 transition-colors duration-200 group-hover:text-white" />
    </div>
  </div>
);

export default HoldingHeader;
