import React from 'react';
import { FormDataType } from '../../types/FormDataType';
import TranslatorContext from '../../../core/contexts/TranslatorContext';
import { Button, Col, Form, Row } from 'react-bootstrap';
import FormField from '../../../core/components/FormField/FormField';
import InfoModalContext from '../../../core/contexts/InfoModalContext';
import { QuestionType } from '../../../../../general/types/QuestionType';
import { QuestionCreateRequestType } from '../../../../../general/types/QuestionCreateRequestType';
import Functions from '../../../core/modules/Functions/Functions';
import { FunctionsError } from '../../modules/Functions/FunctionsError';
import { HttpError } from '../../modules/Functions/HttpError';
import { ValidationErrorType } from '../../../../../general/types/ValidationErrorType';

const ContactForm = (): JSX.Element | null => {
  const translator = React.useContext(TranslatorContext);
  const infoModal = React.useContext(InfoModalContext);
  const initialQuestion: QuestionType = {
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  };
  const [question, setQuestion] = React.useState<FormDataType>(initialQuestion as unknown as FormDataType);
  const [questionValidationErrors, setQuestionValidationErrors] = React.useState<ValidationErrorType[]>([]);
  const [isFormLoading, setIsFormLoading] = React.useState<boolean>(false);

  const submit = () => {
    setIsFormLoading(true);
    infoModal.set({
      icon: 'three-dots',
      title: translator.translate('contact-form_modal_loading_title'),
      description: translator.translate('contact-form_modal_loading_description')
    });
    const requestData: QuestionCreateRequestType = {
      question: question as unknown as QuestionType
    };
    Functions({
      locale: translator.locale
    })
      .call('question/create', requestData)
      .then(() => {
        setIsFormLoading(false);
        infoModal.set({
          icon: 'check-circle',
          title: translator.translate('contact-form_modal_success_title'),
          description: translator.translate('contact-form_modal_success_description')
        });
        setQuestion(initialQuestion as unknown as FormDataType);
        setQuestionValidationErrors([]);
      })
      .catch((error: FunctionsError | HttpError) => {
        setIsFormLoading(false);
        if (error instanceof FunctionsError) {
          infoModal.set({
            icon: 'x-circle',
            title: translator.translate('unknownError'),
            description: translator.translate('somethingUnexpectedHappened')
          });
        } else {
          if (error.response.status === 'BAD_REQUEST') {
            const validationErrors = error.response.data as ValidationErrorType[];
            infoModal.set({
              icon: 'x-circle',
              title: translator.translate('invalidInput'),
              list: validationErrors.map((validationError) => validationError.error)
            });
            setQuestionValidationErrors(validationErrors);
          } else {
            infoModal.set({
              icon: 'x-circle',
              title: translator.translate('unknownError'),
              description: translator.translate('somethingUnexpectedHappened')
            });
          }
        }
      });
  };

  return (
    <Form className="contact-form">
      <Row>
        <Col md={6}>
          <div className="p-1">
            <FormField
              id="firstName"
              formId="question"
              setInFormData={setQuestion}
              formData={question}
              validationErrors={questionValidationErrors.filter(
                (questionValidationError) => questionValidationError.field === 'question.firstName'
              )}
            />
          </div>
        </Col>
        <Col md={6}>
          <div className="p-1">
            <FormField
              id="lastName"
              formId="question"
              setInFormData={setQuestion}
              formData={question}
              validationErrors={questionValidationErrors.filter(
                (questionValidationError) => questionValidationError.field === 'question.lastName'
              )}
            />
          </div>
        </Col>
        <Col xs={12}>
          <div className="p-1">
            <FormField
              id="email"
              formId="question"
              setInFormData={setQuestion}
              formData={question}
              validationErrors={questionValidationErrors.filter(
                (questionValidationError) => questionValidationError.field === 'question.email'
              )}
            />
          </div>
        </Col>
        <Col xs={12}>
          <div className="p-1">
            <FormField
              id="message"
              formId="question"
              type="textarea"
              setInFormData={setQuestion}
              formData={question}
              validationErrors={questionValidationErrors.filter(
                (questionValidationError) => questionValidationError.field === 'question.message'
              )}
            />
          </div>
        </Col>
        <Col xs={12} className="text-center">
          <div className="p-1">
            <Button size="lg" onClick={submit} disabled={isFormLoading}>
              <span>{translator.translate('contact-form_form_submit')}</span>
              <i className="bi bi-arrow-right" />
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default ContactForm;
