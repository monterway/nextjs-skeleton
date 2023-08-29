import {UserType} from "../../../../general/types/UserType";
import {TranslatorType} from "./modules/Translator/Translator";

declare global {
  namespace Express {
    export interface Request {
      user: UserType | null;
      locale: string;
      translator: TranslatorType;
    }
  }
}
