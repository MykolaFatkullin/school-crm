import {
  FieldValues,
  UseFormProps,
  UseFormReturn,
  useForm,
} from 'react-hook-form';

const DEFAULT_FORM_OPTIONS: Pick<
  UseFormProps<FieldValues>,
  'mode' | 'reValidateMode'
> = {
  mode: 'onBlur',
  reValidateMode: 'onChange',
};

export const useAppForm = <TFieldValues extends FieldValues>(
  options?: UseFormProps<TFieldValues>,
): UseFormReturn<TFieldValues> => {
  return useForm<TFieldValues>({
    ...DEFAULT_FORM_OPTIONS,
    ...options,
  });
};
