import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

interface CustomRpcError {
  message: string | string[];
  status?: number | string; // Make status optional and allow string
}

// TODO: Fix bug. RpcCustomException catch and not catch some error, for example, when a listener is down.
@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const rpcError = exception.getError() as CustomRpcError; // Type assertion

    const message = Array.isArray(rpcError.message)
      ? rpcError.message
      : [rpcError.message];

    if (message.toString().includes('Empty response')) {
      return response.status(500).json({
        status: 500,
        message: message
          .toString()
          .substring(0, message.toString().indexOf('(') - 1),
      });
    }

    let status = 400; // Default status

    if (
      typeof rpcError === 'object' &&
      'status' in rpcError &&
      'message' in rpcError
    ) {
      if (rpcError.status !== undefined) {
        status = isNaN(+rpcError.status) ? 400 : +rpcError.status;
      }

      return response.status(status).json(rpcError);
    }
    response.status(400).json({
      status: 400,
      message: rpcError,
    });
  }
}
