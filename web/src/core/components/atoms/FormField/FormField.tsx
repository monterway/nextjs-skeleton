import {
  Col,
  ColProps,
  Form,
  FormControlProps,
  FormGroupProps,
  FormLabelProps,
  FormSelectProps
} from 'react-bootstrap';
import React, { Dispatch, SetStateAction } from 'react';
import TranslatorContext from '../../../contexts/TranslatorContext';
import { FormDataType } from '../../../types/FormDataType';

export interface FormFieldProps {
  id: string;
  setInFormData: Dispatch<SetStateAction<FormDataType>>;
  formData: FormDataType;
  formId?: string;
  type?: 'text' | 'select' | 'number';
  hasLabel?: boolean;
  size?: 'sm' | 'lg';
  selectOptions?: string[];
  colProps?: ColProps;
  formGroupProps?: FormGroupProps;
  labelProps?: FormLabelProps;
  textInputProps?: FormControlProps;
  selectInputProps?: FormSelectProps;
}

const FormField = (props: FormFieldProps): JSX.Element | null => {
  const {
    id,
    setInFormData,
    formData,
    formId = '',
    type = 'text',
    hasLabel = true,
    size = undefined,
    selectOptions = [],
    colProps = {
      xs: 12
    },
    labelProps = {},
    textInputProps = {},
    selectInputProps = {},
    formGroupProps = {}
  } = props;
  const translator = React.useContext(TranslatorContext);

  const translationPath = `form_${formId}_field_${id}`;

  return (
    <Col key={id} {...colProps}>
      <Form.Group controlId={id} {...formGroupProps}>
        {hasLabel ? <Form.Label {...labelProps}>{translator.translate(`${translationPath}_label`)}</Form.Label> : null}
        {type === 'select' ? (
          <Form.Select
            size={size}
            onChange={(event) =>
              setInFormData((data) => ({
                ...data,
                [id]: event.target.value
              }))
            }
            {...selectInputProps}
          >
            {selectOptions.map((selectOption) => (
              <option key={selectOption} value={selectOption}>
                {translator.translate(`${translationPath}_option_${selectOption}`)}
              </option>
            ))}
          </Form.Select>
        ) : (
          <Form.Control
            type={type}
            placeholder={translator.translate(`${translationPath}_placeholder`)}
            size={size}
            value={formData[id]}
            onChange={(event) =>
              setInFormData((data) => ({
                ...data,
                [id]: event.target.value
              }))
            }
            {...textInputProps}
          />
        )}
      </Form.Group>
    </Col>
  );
};

export default FormField;
