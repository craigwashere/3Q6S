import React from "react";
import { ErrorMessage, Field, FieldProps } from "formik";
import { Form } from "semantic-ui-react";
import { Rating } from "./types";

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps extends FieldProps {
  name: string;
  label: string;
  type: string;
  onChange: any;
}

export const DatePickerField: React.FC<DatePickerProps> = ({ 
  field, label, name, onChange
}: DatePickerProps) => {
  return (
    <Form.Field>
    <label>{label}</label>
    <ReactDatePicker
      selected={(field.value && new Date(field.value)) || null}
      onChange={onChange}
    />
    </Form.Field>
  );
};


// structure of a single option
export type RatingOption = {
  value: Rating;
  label: string;
};

// props for select field component
type SelectFieldProps = {
  name: string;
  label: string;
  options: RatingOption[];
  // defaultValue: Rating
};

export const SelectField: React.FC<SelectFieldProps> = ({
  name, label, options
}: SelectFieldProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field as="select" name={name} className="ui-dropdown" >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </Form.Field>
);

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
  value: string;
}

export const TextField: React.FC<TextProps> = ({
  field, label, placeholder
}) => (
  <Form.Field>
    {label && <label>{label}</label>}
    <Field placeholder={placeholder} {...field} />
    <div style={{ color:'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);

