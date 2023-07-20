import { fetchData } from 'lib/mongodb';

export default async function handler(req: any, res: any) {
    const { uid, appName, projectName } = req.body;
    const allProjects = await fetchData('projects');
    const project_ = allProjects.filter(
        (project: any) =>
            project.uid === uid &&
            project.appName === appName &&
            project.projectName === projectName,
    )[0];
    return res.status(200).json({ message: project_ });
}

export const config = {
    api: {
        responseLimit: false,
        bodyParser: {
            sizeLimit: '20mb',
        },
    },
};
