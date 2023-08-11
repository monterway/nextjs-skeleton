import Schema, {SchemaDefinition, ValidationOptions} from "validate";
import {ValidationErrorType} from "../../../../../../types/ValidationErrorType";

export interface ValidationSchemaProps {
  definition?: SchemaDefinition;
  options?: ValidationOptions;
}

export interface ValidationSchemaType {
  validate: (
    value: {[key: string]: any},
    options?: ValidationOptions
  ) => ValidationErrorType[];
}

const Validator = (props: ValidationSchemaProps): ValidationSchemaType => {
  const {definition, options} = props;

  const schema = new Schema(definition, options).message({
    required: (path) => `${path} is required.`,
  });

  return {
    validate: (value, options) => {
      return schema.validate(value, options).map((error) => ({
        field: error.path,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        error: error.message,
      }));
    },
  };
};

export default Validator;
