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

export type FormFieldType = 'text' | 'select' | 'select-radio' | 'number' | 'number-text';

export interface FormFieldOption {
  id: string;
  title?: string;
}

export interface FormFieldProps {
  id: string;
  setInFormData: Dispatch<SetStateAction<FormDataType>>;
  formData: FormDataType;
  formId?: string;
  type?: FormFieldType;
  numberTypeConfig?: {
    min?: number;
    max?: number;
    step?: string;
  };
  hasLabel?: boolean;
  size?: 'sm' | 'lg';
  selectOptions?: FormFieldOption[];
  colProps?: ColProps;
  formGroupProps?: FormGroupProps;
  labelProps?: FormLabelProps;
  textInputProps?: FormControlProps;
  selectInputProps?: FormSelectProps;
  label?: string;
  placeholder?: string;
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
      max: 5,
      step: 'any'
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
    formGroupProps = {},
    label = null,
    placeholder = null
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
              <option key={selectOption.id} value={selectOption.id}>
                {selectOption.title
                  ? selectOption.title
                  : translator.translate(`${translationPath}_option_${selectOption}`)}
              </option>
            ))}
          </Form.Select>
        );
      case 'select-radio':
        return (
          <div>
            {selectOptions.map((selectOption) => (
              <Form.Check
                key={selectOption.id}
                type="radio"
                label={
                  selectOption.title
                    ? selectOption.title
                    : translator.translate(`${translationPath}_option_${selectOption}`)
                }
                onChange={() => {
                  setInFormData((data) => ({
                    ...data,
                    [id]: selectOption.id
                  }));
                }}
                checked={formData[id] === selectOption.id}
                id={selectOption.id}
              />
            ))}
          </div>
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
      case 'number-text':
        return (
          <Form.Control
            type="number"
            placeholder={translator.translate(`${translationPath}_placeholder`)}
            size={size}
            value={formData[id]}
            step={numberTypeConfig.step}
            onChange={(event) => {
              if (!isNaN(parseFloat(event.target.value))) {
                if (typeof numberTypeConfig?.min === 'number' && typeof numberTypeConfig?.max === 'number') {
                  if (
                    parseFloat(event.target.value) >= numberTypeConfig.min &&
                    parseFloat(event.target.value) <= numberTypeConfig.max
                  ) {
                    setInFormData((data) => ({
                      ...data,
                      [id]: parseFloat(event.target.value)
                    }));
                  }
                } else if (typeof numberTypeConfig?.min === 'number') {
                  if (parseFloat(event.target.value) >= numberTypeConfig.min) {
                    setInFormData((data) => ({
                      ...data,
                      [id]: parseFloat(event.target.value)
                    }));
                  }
                } else if (typeof numberTypeConfig?.max === 'number') {
                  if (parseFloat(event.target.value) <= numberTypeConfig.max) {
                    setInFormData((data) => ({
                      ...data,
                      [id]: parseFloat(event.target.value)
                    }));
                  }
                }
              }
            }}
            {...textInputProps}
          />
        );
      default:
        return (
          <Form.Control
            type={type}
            placeholder={placeholder ? placeholder : translator.translate(`${translationPath}_placeholder`)}
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
        {hasLabel ? (
          <Form.Label {...labelProps}>{label ? label : translator.translate(`${translationPath}_label`)}</Form.Label>
        ) : null}
        {inputElement(type)}
      </Form.Group>
    </Col>
  );
};

export default FormField;
