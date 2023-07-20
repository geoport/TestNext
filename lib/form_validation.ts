import { FormField } from 'models/FormField';
import BaseForm from 'models/Form';

type InputData = Record<string, any>;

export function validateField(data: InputData, formField: FormField): string {
    const value = data[formField.id];
    const label = formField.label;
    const minValue = formField.minValue;
    const maxValue = formField.maxValue;
    const required = formField.required;
    let errorMessage = '';

    if (!required) return errorMessage;

    if (!value && value !== 0) {
        errorMessage = `${label} alanı boş bırakılamaz.`;
    } else if (minValue != undefined && parseFloat(value) < minValue) {
        errorMessage = `${label} alanı ${minValue} değerinden küçük olamaz.`;
    } else if (maxValue != undefined && parseFloat(value) > maxValue) {
        errorMessage = `${label} alanı ${maxValue} değerinden büyük olamaz.`;
    }

    return errorMessage;
}

export function validateForm(
    data: InputData,
    form: BaseForm,
    ignoredFields: string[] = [],
): string {
    let errorMessage = '';
    for (const key of Object.keys(form)) {
        if (ignoredFields.includes(key)) continue;
        const field = form[key];
        errorMessage = validateField(data, field);
        if (errorMessage) {
            return errorMessage;
        }
    }

    return errorMessage;
}

export function checkAny(data: InputData, form: BaseForm): string {
    let errorMessage = '';
    let isTrue = false;
    for (const field of form.anyOfFields.fields) {
        if (data[field.id]) {
            isTrue = true;
        }
    }
    if (!isTrue) {
        errorMessage = form.anyOfFields.errorMessage;
    }

    return errorMessage;
}

export function validateFormset(
    data: InputData[],
    form: BaseForm,
    ignoredFields: string[] = [],
): string {
    let errorMessage = '';
    for (const formData of data) {
        for (const key of Object.keys(form)) {
            if (ignoredFields.includes(key)) continue;
            const field = form[key];
            errorMessage = validateField(formData, field);
            if (errorMessage) {
                return errorMessage;
            }
        }
    }

    return errorMessage;
}
