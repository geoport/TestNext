export default async function handler(req: any, res: any) {
    const { userId, appName } = req.body;
    const templateList = ['Varsayılan Şablon'];
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    const response = await fetch(
        'https://report.soilprime.com:8081/report-templates',
        {
            method: 'POST',
            body: JSON.stringify({
                user_id: userId,
                app_name: appName,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        },
    );
    if (response.status == 200) {
        const outputJson = await response.json();
        if (outputJson.templates.length > 0) {
            outputJson.templates.forEach((template: any) => {
                templateList.push(template);
            });
        }
    }

    return res.status(200).json({ message: JSON.stringify(templateList) });
}
