import { fetchData } from 'lib/mongodb';

function transformData(projects: any[]) {
    const projectsArray = [];
    if (projects.length) {
        for (const project of projects) {
            projectsArray.push(project.projectName);
        }
    } else {
        projectsArray.push('Kayıtlı proje bulunamadı.');
    }
    return projectsArray;
}
export default async function handler(req: any, res: any) {
    const { userId, appName } = req.body;
    const allProjects = await fetchData('projects');
    const projects = allProjects.filter(
        (project: any) => project.uid === userId && project.appName === appName,
    );

    return res
        .status(200)
        .json({ message: JSON.stringify(transformData(projects)) });
}
