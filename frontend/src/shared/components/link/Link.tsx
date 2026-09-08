import { LinkType } from './LinkType';
import React from 'react';
import { Link as ReactLink } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Link.module.scss';

type Props = {
  to: string;
  type: LinkType;
  inlineText?: string;
  children?: React.ReactNode;
  position?: 'left' | 'right';
};

export const Link = ({ to, type, inlineText, children, position }: Props) => {
  const isButtonLike = type === 'primaryButton' || type === 'secondaryButton';

  return (
    <div
      className={classNames(styles.linkContainer, position && styles[position])}
    >
      {inlineText && <span className={styles.inlineText}>{inlineText}</span>}
      <ReactLink
        to={to}
        className={classNames(
          styles.link,
          styles[type],
          isButtonLike && styles.button,
        )}
      >
        {children}
      </ReactLink>
    </div>
  );
};
