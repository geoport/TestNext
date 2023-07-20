import { FormField } from 'models/FormField';
import BaseForm from 'models/Form';

export default class ProjectForm extends BaseForm {
    owner = new FormField({
        id: 'owner',
        label: 'Tapu Sahibi',
        type: 'text',
    });
    staticProjectOwner = new FormField({
        id: 'staticProjectOwner',
        label: 'Statik Proje Müellifi',
        type: 'text',
    });
    contractor = new FormField({
        id: 'contractor',
        label: 'Müteahhit',
        type: 'text',
    });
    architect = new FormField({
        id: 'architect',
        label: 'Mimari Proje Müellifi',
        type: 'text',
    });
    geologyEngineer = new FormField({
        id: 'geologyEngineer',
        label: 'Veri Raporu(Jeoloji) Müellifi',
        type: 'text',
    });
    geophysicEngineer = new FormField({
        id: 'geophysicEngineer',
        label: 'Veri Raporu(Jeofizik) Müellifi',
        type: 'text',
    });
    reporter = new FormField({
        id: 'reporter',
        label: 'Raporu Hazırlayan',
        type: 'text',
        required: true,
    });
    reportFooter = new FormField({
        id: 'reportFooter',
        label: 'Sayfa Altbilgisi Yazısı',
        type: 'text',
    });
    reportDate = new FormField({
        id: 'reportDate',
        label: 'Rapor Tarihi',
        type: 'text',
        required: true,
    });
}
