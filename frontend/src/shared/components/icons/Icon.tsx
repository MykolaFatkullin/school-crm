import { LucideIcon } from 'lucide-react';
import { CSSProperties } from 'react';
import classNames from 'classnames';
import styles from './Icon.module.scss';

type Props = {
  withBackground?: boolean;
  backgroundType?: 'circle' | 'ellipse';
  size: number;
  className?: string;
  icon: LucideIcon;
};

export const Icon = ({
  withBackground,
  backgroundType,
  size,
  className,
  icon: LucideIcon,
}: Props) => {
  const wrapperStyle: CSSProperties = {
    '--icon-size': `${size}px`,
  } as CSSProperties;

  return (
    <span
      style={wrapperStyle}
      className={classNames(
        styles.icon,
        {
          [styles.withBackground]: withBackground,
          [styles.circle]: backgroundType === 'circle' && withBackground,
          [styles.ellipse]: backgroundType === 'ellipse' && withBackground,
        },
        className,
      )}
    >
      <LucideIcon size={size} strokeWidth={3} />
    </span>
  );
};
