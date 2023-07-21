import {TranslatorType} from "../../hooks/useTranslator";

export interface SeoHandlerType {
  getTitleTag: () => JSX.Element;
  getDescriptionTag: () => JSX.Element;
}

export interface SeoHandlerProps {
  pathname: string;
  translator?: TranslatorType;
}

const SeoHandler = (props: SeoHandlerProps): SeoHandlerType => {
  const {
    pathname,
    translator,
  } = props;

  if (!translator) {
    return {
      getTitleTag: () => <title>{ pathname }</title>,
      getDescriptionTag: () => <meta name="description" content={pathname}/>,
    };
  }

  return {
    getTitleTag: () => <title>{ translator.translate(`${pathname}_title`) }</title>,
    getDescriptionTag: () => <meta name="description" content={translator.translate(`${pathname}_description`)}/>,
  };
};

export default SeoHandler;
