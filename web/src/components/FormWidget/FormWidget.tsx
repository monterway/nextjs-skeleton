import React from 'react';

export interface FormWidgetProps {
  startStepId: string;
  steps: {
    id: string;
    content: JSX.Element | JSX.Element[];
    className?: string;
  }[];
  onSubmit: (currentStepId: string) => void;
  onNextStep: (goNext: () => void, currentStepId: string, nextStepId: string | null) => void;
  onPreviousStep: (goPrevious: () => void, currentStepId: string, previousStepId: string | null) => void;
  className?: string;
  previousButtonTitle?: string;
  nextButtonTitle?: string;
  submitButtonTitle?: string;
}

const FormWidget = (props: FormWidgetProps): JSX.Element | null => {
  const {
    startStepId,
    steps,
    onSubmit,
    onNextStep,
    onPreviousStep,
    className = '',
    previousButtonTitle = 'Previous',
    nextButtonTitle = 'Next',
    submitButtonTitle = 'Submit'
  } = props;
  const [currentStepId, setCurrentStepId] = React.useState<string>(startStepId);
  const [previousStepId, setPreviousStepId] = React.useState<string | null>(null);
  const [nextStepId, setNextStepId] = React.useState<string | null>(null);

  const getPreviousAndNextStepIds = (
    currentStepId: string
  ): {
    previousStepId: string | null;
    nextStepId: string | null;
  } => {
    const stepIds = steps.map((step) => step.id);
    const indexOfCurrentStepId = stepIds.indexOf(currentStepId);
    const previousStepId =
      indexOfCurrentStepId === -1 ? null : indexOfCurrentStepId === 0 ? null : stepIds[indexOfCurrentStepId - 1];
    const nextStepId =
      indexOfCurrentStepId === -1
        ? null
        : indexOfCurrentStepId === stepIds.length - 1
        ? null
        : stepIds[indexOfCurrentStepId + 1];
    return {
      previousStepId,
      nextStepId
    };
  };

  React.useEffect(() => {
    const previousAndNextStepIds = getPreviousAndNextStepIds(currentStepId);
    setPreviousStepId(previousAndNextStepIds.previousStepId);
    setNextStepId(previousAndNextStepIds.nextStepId);
  }, [currentStepId]);

  const onNext = (currentStepId: string, nextStepId: string | null) => {
    if (nextStepId) {
      onNextStep(
        () => {
          setCurrentStepId(nextStepId);
        },
        currentStepId,
        nextStepId
      );
    } else {
      onSubmit(currentStepId);
    }
  };
  const onPrevious = (currentStepId: string, previousStepId: string | null) => {
    if (previousStepId) {
      onPreviousStep(
        () => {
          setCurrentStepId(previousStepId);
        },
        currentStepId,
        previousStepId
      );
    }
  };

  return (
    <div className={className}>
      {steps.map((step) => {
        const previousAndNextStepIds = getPreviousAndNextStepIds(step.id);
        return (
          <div
            key={step.id}
            className={`${step.id !== currentStepId ? 'd-none' : ''} ${step.className ? step.className : ''}`}
          >
            {step.content}
            <div className="d-flex justify-content-between">
              <button
                className={`btn btn-primary ${!previousAndNextStepIds.previousStepId ? 'invisible' : ''}`}
                onClick={() => {
                  onPrevious(step.id, previousAndNextStepIds.previousStepId);
                }}
              >
                {previousButtonTitle}
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  onNext(step.id, previousAndNextStepIds.nextStepId);
                }}
              >
                {previousAndNextStepIds.nextStepId ? nextButtonTitle : submitButtonTitle}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FormWidget;
