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
import FormRange from 'react-bootstrap/FormRange';

export type FormFieldType = 'text' | 'select' | 'select-radio' | 'number' | 'number-text' | 'number-slider';

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
    step?: number;
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
  note?: JSX.Element;
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
      step: 1
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
    placeholder = null,
    note = null
  } = props;
  const translator = React.useContext(TranslatorContext);

  const translationPath = `form_${formId}_field_${id}`;

  const canNumberGoUp = (): boolean => {
    const currentValue = formData[id];
    let parsedCurrentValue = typeof currentValue === 'number' ? currentValue : parseFloat(currentValue);
    const step = numberTypeConfig.step ? numberTypeConfig.step : 1;
    return typeof numberTypeConfig.max !== 'undefined' && parsedCurrentValue + step <= numberTypeConfig.max;
  };

  const canNumberGoDown = (): boolean => {
    const currentValue = formData[id];
    let parsedCurrentValue = typeof currentValue === 'number' ? currentValue : parseFloat(currentValue);
    const step = numberTypeConfig.step ? numberTypeConfig.step : 1;
    return typeof numberTypeConfig.min !== 'undefined' && parsedCurrentValue - step >= numberTypeConfig.min;
  };

  const makeNumberUp = (): void => {
    const currentValue = formData[id];
    let parsedCurrentValue = typeof currentValue === 'number' ? currentValue : parseFloat(currentValue);
    const step = numberTypeConfig.step ? numberTypeConfig.step : 1;
    const newNumber = parsedCurrentValue + step;
    const roundedNewNumber = Math.round((newNumber + Number.EPSILON) * 100) / 100;
    if (canNumberGoUp()) {
      setInFormData((data) => ({
        ...data,
        [id]: roundedNewNumber
      }));
    }
  };

  const makeNumberDown = (): void => {
    const currentValue = formData[id];
    let parsedCurrentValue = typeof currentValue === 'number' ? currentValue : parseFloat(currentValue);
    const step = numberTypeConfig.step ? numberTypeConfig.step : 1;
    const newNumber = parsedCurrentValue - step;
    const roundedNewNumber = Math.round((newNumber + Number.EPSILON) * 100) / 100;
    if (canNumberGoDown()) {
      setInFormData((data) => ({
        ...data,
        [id]: roundedNewNumber
      }));
    }
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
                  : translator.translate(`${translationPath}_option_${selectOption.id}`)}
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
                    : translator.translate(`${translationPath}_option_${selectOption.id}`)
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
            <Button variant="outline-primary" size="sm" onClick={makeNumberDown} disabled={!canNumberGoDown()}>
              <i className="bi bi-dash-circle"></i>
            </Button>
            <span className="lead">{formData[id]}</span>
            <Button variant="outline-primary" size="sm" onClick={makeNumberUp} disabled={!canNumberGoUp()}>
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
            onChange={(event) => {
              const newValue = event.target.value;
              let parsedNewValue = isNaN(parseFloat(newValue)) ? 1 : parseFloat(newValue);
              if (typeof numberTypeConfig.min !== 'undefined' && typeof numberTypeConfig.max !== 'undefined') {
                if (parsedNewValue >= numberTypeConfig.min && parsedNewValue <= numberTypeConfig.max) {
                  setInFormData((data) => ({
                    ...data,
                    [id]: parsedNewValue
                  }));
                }
              } else {
                if (typeof numberTypeConfig.min !== 'undefined') {
                  if (parsedNewValue >= numberTypeConfig.min) {
                    setInFormData((data) => ({
                      ...data,
                      [id]: parsedNewValue
                    }));
                  }
                } else if (typeof numberTypeConfig.max !== 'undefined') {
                  if (parsedNewValue <= numberTypeConfig.max) {
                    setInFormData((data) => ({
                      ...data,
                      [id]: parsedNewValue
                    }));
                  }
                }
              }
            }}
            {...textInputProps}
          />
        );
      case 'number-slider':
        return (
          <div className="form-field__number-container">
            <Button variant="outline-primary" size="sm" onClick={makeNumberDown} disabled={!canNumberGoDown()}>
              <i className="bi bi-dash-circle"></i>
            </Button>
            <div className="d-flex justify-content-between align-items-center gap-3 flex-grow-1">
              <FormRange
                className="w-75"
                value={formData[id]}
                onChange={(event) => {
                  setInFormData((data) => ({
                    ...data,
                    [id]: parseFloat(event.target.value)
                  }));
                }}
                min={numberTypeConfig?.min}
                max={numberTypeConfig?.max}
                step={numberTypeConfig?.step}
              />
              <span className="lead w-25 text-center">{formData[id]}</span>
            </div>
            <Button variant="outline-primary" size="sm" onClick={makeNumberUp} disabled={!canNumberGoUp()}>
              <i className="bi bi-plus-circle"></i>
            </Button>
          </div>
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
        {note ? note : null}
      </Form.Group>
    </Col>
  );
};

export default FormField;
