import { captureException } from '@sentry/node';

export function sendError(error: Error, inputData: any): void {
    captureException(new Error(error.message), {
        extra: { inputData },
    });
}
