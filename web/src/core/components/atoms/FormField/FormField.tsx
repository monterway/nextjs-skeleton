import {
  Button,
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

export type FormFieldType = 'text' | 'select' | 'number';

export interface FormFieldProps {
  id: string;
  setInFormData: Dispatch<SetStateAction<FormDataType>>;
  formData: FormDataType;
  formId?: string;
  type?: FormFieldType;
  numberTypeConfig?: {
    min?: number;
    max?: number;
  };
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
    numberTypeConfig = {
      min: 0,
      max: 5
    },
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

  const canNumberTypeGoDown = (): boolean => {
    if (typeof numberTypeConfig?.min === 'number') {
      if (formData[id] <= numberTypeConfig.min) {
        return false;
      }
    }

    return true;
  };

  const canNumberTypeGoUp = (): boolean => {
    if (typeof numberTypeConfig?.max === 'number') {
      if (formData[id] >= numberTypeConfig.max) {
        return false;
      }
    }

    return true;
  };

  const onNumberTypeDownClick = (): void => {
    if (!canNumberTypeGoDown()) {
      return;
    }
    setInFormData((data) => {
      const currentValue = data[id] as number;
      return {
        ...data,
        [id]: currentValue - 1
      };
    });
  };

  const onNumberTypeUpClick = (): void => {
    if (!canNumberTypeGoUp()) {
      return;
    }
    setInFormData((data) => {
      const currentValue = data[id] as number;
      return {
        ...data,
        [id]: currentValue + 1
      };
    });
  };

  const inputElement = (type: FormFieldType): JSX.Element => {
    switch (type) {
      case 'select':
        return (
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
        );
      case 'number':
        return (
          <div className="form-field__number-container">
            <Button
              variant="outline-primary"
              size="sm"
              onClick={onNumberTypeDownClick}
              disabled={!canNumberTypeGoDown()}
            >
              <i className="bi bi-dash-circle"></i>
            </Button>
            <span className="lead">{formData[id]}</span>
            <Button variant="outline-primary" size="sm" onClick={onNumberTypeUpClick} disabled={!canNumberTypeGoUp()}>
              <i className="bi bi-plus-circle"></i>
            </Button>
          </div>
        );
      default:
        return (
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
        );
    }
  };

  return (
    <Col key={id} {...colProps}>
      <Form.Group controlId={id} {...formGroupProps}>
        {hasLabel ? <Form.Label {...labelProps}>{translator.translate(`${translationPath}_label`)}</Form.Label> : null}
        {inputElement(type)}
      </Form.Group>
    </Col>
  );
};

export default FormField;
