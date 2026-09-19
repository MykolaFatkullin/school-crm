import { useUpdateSchoolMutation } from '../../../../app/api/school/schoolApi';
import { School } from '../../../../entities/school';
import { useApiValidationError } from '../../../../shared/hooks';
import { parseApiError } from '../../../../app/api/error';
import { UseFormReturn } from 'react-hook-form';
import { toast } from '../../../../shared/components/toast';

export const useSchoolForm = (methods: UseFormReturn<School>) => {
  const [updateSchool, { isLoading, error }] = useUpdateSchoolMutation();

  useApiValidationError(error, methods.setError);
  const apiError = parseApiError(error);

  const update = async (school: School) => {
    await updateSchool(school).unwrap();

    toast.success('School updated successfully');
  };

  return {
    update,
    isLoading,
    apiError,
  };
};
