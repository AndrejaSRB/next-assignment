import clsxm from '@/utils/clsxm';
import ucfirst from '@/utils/ucfirst';
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
          <div className="h-5.25 w-5.25 rounded-full bg-customDarkGray" />
        )}
        {hasDustTokens && (
          <DustIcon className="absolute bottom-0 right-0 h-2.5 w-2.5" />
        )}
      </div>

      <div className="flex flex-col">
        <span className="leading-14 text-md">{symbol}</span>
        <span className="leading-11 text-xs text-white/55">
          {ucfirst(label)}
        </span>
      </div>
    </div>
  );
};

export default AssetDisplay;
