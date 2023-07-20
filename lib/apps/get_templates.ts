export default async function listReportTemplates(
    user: any,
    appName: string,
    setTemplateList: Function,
): Promise<void> {
    if (!user) return;
    const userId = user.id;
    const data = { userId, appName };

    const response = await fetch('/api/get_templates', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const jsonData = await response.json();
    const output = JSON.parse(jsonData.message);
    setTemplateList(output);
}
