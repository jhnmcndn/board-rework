import Button from '@/components/Fragments/Button';
import { ChangeEvent, FC, FormEvent } from 'react';
import Select from 'react-select';
import styles from './index.module.scss';

type BaseFormField = {
  type: 'input' | 'select';
  label: string;
};

type InputField = BaseFormField & {
  type: 'input';
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  options?: never;
  defaultValue?: never;
  onSelectChange?: never;
  readOnly?: boolean;
};

type SelectField = BaseFormField & {
  type: 'select';
  options: Array<{ value: any; label: any }>;
  defaultValue?: { value: any; label: any };
  onChange?: never;
  onSelectChange: (selected: any) => void;
  placeholder?: never;
};

export type FormField = InputField | SelectField;

type FormComponentProps = {
  fields: FormField[];
  onSubmit: () => Promise<void>;
};

const Form: FC<FormComponentProps> = ({ fields, onSubmit }) => {
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formParent}>
      {fields.map((field, index) => {
        if (field.type === 'input') {
          return (
            <div key={index} className={styles.wrapper}>
              <label>{field.label}</label>
              <input
                placeholder={field.placeholder}
                onChange={field.onChange}
                value={field.value}
                readOnly={field.readOnly}
              />
            </div>
          );
        } else if (field.type === 'select') {
          return (
            <div key={index} className={styles.wrapper}>
              <label>{field.label}</label>
              <Select
                options={field.options}
                // classNamePrefix={styles.selectWrapper}
                className={styles.selectWrapper}
                onChange={field.onSelectChange}
                defaultValue={field.defaultValue}
              />
            </div>
          );
        }
        return null;
      })}
      <Button text='确认绑定' type='submit' className={styles.button} />
    </form>
  );
};

export default Form;
