import { ResponseType } from '../../../../types/ResponseType';
import { httpsCallable } from '@firebase/functions';
import FirebaseFunctions from '../../services/Firebase/FirebaseFunctions';
import { HttpError } from './HttpError';

export interface FunctionsType {
  call: (path: string, data?: any) => Promise<ResponseType>;
}

const Functions = (): FunctionsType => ({
  call: async (path, data = {}) => {
    const callable = httpsCallable(FirebaseFunctions, `app/${path}`);
    const result = await callable(data);
    const response = result.data as ResponseType;
    if (response.status === 'OK') {
      return response;
    } else {
      throw new HttpError(response);
    }
  }
});

export default Functions;
