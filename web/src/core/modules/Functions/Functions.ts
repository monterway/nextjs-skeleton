import {ResponseType} from '../../../../../types/ResponseType';
import {httpsCallable} from '@firebase/functions';
import FirebaseFunctions from '../../services/Firebase/FirebaseFunctions';
import {HttpError} from './HttpError';
import {FunctionsError} from "./FunctionsError";

export interface FunctionsType {
  call: (path: string, data?: any) => Promise<ResponseType>;
}

const Functions = (): FunctionsType => ({
  call: async (path, data = {}) => {
    try {
      const callable = httpsCallable(FirebaseFunctions, `app/${path}`);
      const result = await callable(data);
      const response = result.data as ResponseType;
      if (response.status === 'OK') {
        return response;
      } else {
        throw new HttpError(response);
      }
    }
    catch (error: any) {
      if (error instanceof HttpError) {
        throw error;
      }
      else {
        throw new FunctionsError();
      }
    }
  }
});

export default Functions;
