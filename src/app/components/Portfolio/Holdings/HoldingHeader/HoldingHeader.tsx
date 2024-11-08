import { ChevronDownIcon } from '@heroicons/react/24/outline';

type HoldingHeaderProps = {
  sortField: 'value' | 'amount';
  sortDirection: 'asc' | 'desc';
  onSort: (field: 'value' | 'amount') => void;
};

const HoldingHeader = ({
  sortField,
  sortDirection,
  onSort,
}: HoldingHeaderProps) => (
  <div className="flex select-none items-center justify-between text-white/50">
    <div className="w-1/3 flex-shrink-0 leading-none">
      <span className="text-sm text-white/55">Asset</span>
    </div>

    <div
      onClick={() => onSort('value')}
      className="group flex w-1/3 flex-shrink-0 cursor-pointer items-center gap-1 leading-none"
    >
      <span
        className={`text-sm transition-colors duration-200 group-hover:text-white ${
          sortField === 'value' ? 'text-white' : 'text-white/55'
        }`}
      >
        Total value
      </span>
      <ChevronDownIcon
        data-testid="chevron-down-icon"
        className={`h-3 w-3 transition-colors duration-200 group-hover:text-white ${
          sortField === 'value' ? 'text-white' : ''
        } ${sortField === 'value' && sortDirection === 'asc' ? 'rotate-180' : ''}`}
      />
    </div>

    <div
      onClick={() => onSort('amount')}
      className="group flex w-1/3 flex-shrink-0 cursor-pointer items-center gap-1 leading-none"
    >
      <span
        className={`text-sm transition-colors duration-200 group-hover:text-white ${
          sortField === 'amount' ? 'text-white' : 'text-white/55'
        }`}
      >
        Amount
      </span>
      <ChevronDownIcon
        className={`h-3 w-3 transition-colors duration-200 group-hover:text-white ${
          sortField === 'amount' ? 'text-white' : ''
        } ${sortField === 'amount' && sortDirection === 'asc' ? 'rotate-180' : ''}`}
      />
    </div>
  </div>
);

export default HoldingHeader;
