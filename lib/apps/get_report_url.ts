export default async function getReportUrl(
    context: any,
    templateName: string,
    userId: string,
    appName: string,
): Promise<string> {
    const url = '/api/apps/get_report_url';

    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            data: {
                serializedContext: context,
                templateName: templateName,
                userId: userId,
                appName: appName,
            },
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.status !== 200) {
        return '';
    }

    const outputJson = await response.json();

    return outputJson['message'];
}
