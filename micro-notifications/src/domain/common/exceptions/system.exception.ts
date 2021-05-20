import { ackExceptions as infraAckExceptions} from "src/infrastructure/know-exceptions/services.exception"
import * as businessExceptions from "src/domain/common/exceptions/business.exception";
import { BusinessOperations } from "src/domain/common/exceptions/business.exception";

export class SystemException {

    isAckException(exception: Error) : Boolean {
        let isAckException = infraAckExceptions.some(ex => exception.message.indexOf(ex) > -1);

        if(!isAckException){
            if(exception instanceof businessExceptions.EntityAlreadyExistsError && exception.operation === BusinessOperations.CREATE){
                isAckException = true
            }
        }

        return isAckException;

    }

}