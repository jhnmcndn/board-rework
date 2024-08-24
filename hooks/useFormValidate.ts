import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import type { DefaultValues, FieldPath, FieldValues, Path, Resolver } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import type { ZodType } from 'zod';

interface IUseValidate<TForm extends FieldValues> {
  defaultValues: DefaultValues<TForm>;
  schema?: ZodType<TForm>;
  // schema?: Schema;
  // delayError?: number;
}

const useValidate = <TForm extends FieldValues>({ schema, defaultValues }: IUseValidate<TForm>) => {
  const {
    getValues,
    setValue,
    resetField,
    setError,
    reset,
    handleSubmit,
    register,
    watch,

    formState: { errors: errorsList, isValid, isSubmitting, isSubmitted, dirtyFields },
  } = useForm<TForm>({
    defaultValues,
    resolver: schema ? (zodResolver(schema) as Resolver<TForm>) : undefined,
    // delayError,
  });

  const onChangeValue = useCallback(
    (field: FieldPath<TForm>) => (value: TForm[keyof TForm]) => {
      setValue(field, value, { shouldValidate: true });
    },
    [setValue],
  );

  const errors = useCallback(
    (field: Path<TForm>) => {
      return errorsList?.[field]?.message?.toString();
    },
    [errorsList],
  );

  const handleSetError = (field: FieldPath<TForm>, message: string) => {
    // setError(field, { message });
    setError(field, { message } as unknown as Parameters<typeof setError>[1]);
  };

  return {
    isValid,
    values: getValues,
    errors,
    setValue,
    onChangeValue,
    handleSubmit,

    loading: isSubmitting,
    isSubmitted,
    setError: handleSetError,
    watch,
    reset,
    resetField,
    registerField: register,
    dirtyFields,
  };
};

export default useValidate;
