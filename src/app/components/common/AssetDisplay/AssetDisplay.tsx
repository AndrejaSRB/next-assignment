import clsxm from '@/utils/clsxm';
import Image from 'next/image';
import DustIcon from 'public/dust-image.svg';

type AssetDisplayProps = {
  symbol: string;
  label: string;
  iconUrl: string;
  className?: string;
  hasDustTokens?: boolean;
};

const AssetDisplay = ({
  symbol,
  label,
  iconUrl,
  className,
  hasDustTokens = false,
}: AssetDisplayProps) => {
  return (
    <div
      className={clsxm('flex items-center gap-2', className)}
      data-testid="asset-display"
    >
      <div className="relative">
        {iconUrl ? (
          <Image
            src={iconUrl}
            alt={`${symbol} icon`}
            width={21}
            height={21}
            className="rounded-full"
          />
        ) : (
          <div className="h-[21px] w-[21px] rounded-full bg-customDarkGray" />
        )}
        {hasDustTokens && (
          <DustIcon className="absolute bottom-0 right-0 h-[10px] w-[10px]" />
        )}
      </div>

      <div className="flex flex-col">
        <span className="text-md leading-[18px]">{symbol}</span>
        <span className="text-xs leading-[11px] text-white/55">{label}</span>
      </div>
    </div>
  );
};

export default AssetDisplay;
