import GmpPredictionForm from './gmp_prediction_form';
import { validateForm } from 'lib/form_validation';

export default function validation(data: Record<string, any>): {
    errorDiv: string;
    errorMessage: string;
    isValid: boolean;
} {
    const form = new GmpPredictionForm();
    const errorDiv = '';
    let errorMessage = null;
    let isValid = true;

    if (data.outputType == 'SA') {
        form.period.required = true;
    }

    errorMessage = validateForm(data, form);
    if (errorMessage) {
        isValid = false;
    }

    return { errorDiv, errorMessage, isValid };
}
