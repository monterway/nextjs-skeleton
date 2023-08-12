// eslint-disable-next-line @typescript-eslint/no-var-requires
const Schema = require("validate");
import * as validate from "validate";
import {ValidationErrorType} from "../../../../../../types/ValidationErrorType";
import {TranslatorType} from "../Translator/Translator";

export interface ValidationSchemaProps {
  definition: validate.SchemaDefinition;
  translator: TranslatorType;
  options?: validate.ValidationOptions;
}

export interface ValidationSchemaType {
  validate: (
    value: {[key: string]: any},
    options?: validate.ValidationOptions
  ) => ValidationErrorType[];
}

const Validator = (props: ValidationSchemaProps): ValidationSchemaType => {
  const {definition, translator, options = {}} = props;

  const schema = new Schema(definition, options).message({
    required: (path: string) =>
      translator.translate("messages_required", {
        path: translator.translate(`fields_${path}`),
      }),
  });

  return {
    validate: (value, options = {}) => {
      return schema
        .validate(value, options)
        .map((error: validate.ValidationError) => ({
          field: error.path,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          error: error.message,
        }));
    },
  };
};

export default Validator;
