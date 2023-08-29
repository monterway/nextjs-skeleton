import { ResponseType } from '../../../../../general/types/ResponseType';
import { httpsCallable } from '@firebase/functions';
import FirebaseFunctions from '../../services/Firebase/FirebaseFunctions';
import { HttpError } from './HttpError';
import { FunctionsError } from './FunctionsError';
import { RequestType } from '../../../../../general/types/RequestType';

export interface FunctionsProps {
  locale?: string;
}

export interface FunctionsType {
  call: (path: string, data?: any) => Promise<ResponseType>;
}

const Functions = (props?: FunctionsProps): FunctionsType => {
  const locale = props && props.locale ? props.locale : 'en';

  return {
    call: async (path, data = {}) => {
      try {
        const request: RequestType = {
          locale,
          data
        };
        const callable = httpsCallable(FirebaseFunctions, `app/${path}`);
        const result = await callable(request);
        const response = result.data as ResponseType;
        if (response.status === 'OK') {
          return response;
        } else {
          throw new HttpError(response);
        }
      } catch (error: any) {
        if (error instanceof HttpError) {
          throw error;
        } else {
          throw new FunctionsError();
        }
      }
    }
  };
};

export default Functions;
