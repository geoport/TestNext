import { FormField } from 'models/FormField';
import BaseForm from 'models/Form';

export default class AuthenticationForm extends BaseForm {
    fullname = new FormField({
        id: 'fullname',
        label: 'Ad Soyad',
        type: 'text',
        required: true,
    });

    email = new FormField({
        id: 'email',
        label: 'E-mail',
        type: 'text',
        required: true,
    });

    phone = new FormField({
        id: 'phone',
        label: 'Telefon(5xxxxxxxxx)',
        required: true,
    });

    password = new FormField({
        id: 'password',
        label: 'Parola',
        type: 'password',
        required: true,
    });

    confirmPassword = new FormField({
        id: 'confirmPassword',
        label: 'Parola Tekrar',
        type: 'password',
        required: true,
    });
}
