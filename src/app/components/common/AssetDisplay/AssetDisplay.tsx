import clsxm from '@/utils/clsxm';
import Image from 'next/image';

type AssetDisplayProps = {
  symbol: string;
  label: string;
  iconUrl: string;
  className?: string;
};

const AssetDisplay = ({
  symbol,
  label,
  iconUrl,
  className,
}: AssetDisplayProps) => {
  return (
    <div
      className={clsxm('flex items-center gap-2', className)}
      data-testid="asset-display"
    >
      {iconUrl && (
        <Image
          src={iconUrl}
          alt={`${symbol} icon`}
          width={21}
          height={21}
          className="rounded-full"
        />
      )}

      <div className="flex flex-col">
        <span className="text-md leading-[18px]">{symbol}</span>
        <span className="text-xs leading-[11px] text-white/55">{label}</span>
      </div>
    </div>
  );
};

export default AssetDisplay;
