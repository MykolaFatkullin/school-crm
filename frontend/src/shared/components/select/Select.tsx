import * as RadixSelect from '@radix-ui/react-select';
import { Check, ChevronDown } from 'lucide-react';
import styles from './Select.module.scss';
import type { SelectOption } from './SelectOption';
import classNames from 'classnames';
import { useId } from 'react';

type Props = {
  label: string;
  placeholder: string;
  options: SelectOption[];
  error?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
};

export const Select = ({
  label,
  placeholder,
  options,
  error,
  disabled,
  value,
  onChange,
}: Props) => {
  const labelId = useId();

  return (
    <div className={styles.Select}>
      <label id={labelId} className={styles.label}>
        {label}
      </label>
      <RadixSelect.Root
        disabled={disabled}
        value={value}
        onValueChange={onChange}
      >
        <RadixSelect.Trigger
          aria-labelledby={labelId}
          className={classNames(styles.selectTrigger, {
            [styles.selectTriggerError]: error,
          })}
        >
          <RadixSelect.Value
            placeholder={placeholder}
            className={styles.selectValue}
          />
          <RadixSelect.Icon className={styles.selectIconWrapper}>
            <ChevronDown size={18} />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>

        <RadixSelect.Portal>
          <RadixSelect.Content
            position="popper"
            className={styles.selectContent}
          >
            <RadixSelect.Viewport className={styles.selectViewport}>
              <RadixSelect.Group className={styles.selectGroup}>
                {options.map(option => (
                  <RadixSelect.Item
                    key={option.value}
                    value={option.value}
                    className={styles.selectItem}
                  >
                    <RadixSelect.ItemIndicator
                      className={styles.selectItemIndicator}
                    >
                      <Check size={16} />
                    </RadixSelect.ItemIndicator>
                    <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
                  </RadixSelect.Item>
                ))}
              </RadixSelect.Group>
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>

      <span
        className={classNames(styles.messageText, {
          [styles.messageError]: error,
          [styles.textHidden]: !error,
        })}
      >
        {error ? error : '\u00A0'}
      </span>
    </div>
  );
};
