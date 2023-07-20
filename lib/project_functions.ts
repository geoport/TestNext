export async function saveProject(data: any): Promise<any> {
    const response = await fetch('/api/save_project', {
        method: 'POST',
        body: JSON.stringify({ data }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return response.json();
}

export async function listSavedProjects(
    user: any,
    appName: string,
    setSavedProjects: Function,
    setSelectedProject: Function,
): Promise<void> {
    if (!user) return;
    const userId = user.id;
    const data = { userId, appName };

    const response = await fetch('/api/list_saved_projects', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const jsonData = await response.json();

    setSavedProjects(JSON.parse(jsonData.message));
    setSelectedProject(JSON.parse(jsonData.message)[0]);
}

export async function loadProject(
    uid: string,
    appName: string,
    projectName: string,
): Promise<any> {
    const data = { uid, appName, projectName };
    const response = await fetch('/api/load_project', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return response.json();
}

export function validateProjectName(projectName: string): string | undefined {
    let errorMessage;
    if (projectName.length < 3) {
        errorMessage = 'Proje adı en az 3 karakter olmalıdır.';
    } else if (projectName.length > 20) {
        errorMessage = 'Proje adı en fazla 20 karakter olmalıdır.';
    } else if (!projectName.match(/^[a-zA-Z0-9ğüşöçİĞÜŞÖÇ ]+$/)) {
        errorMessage = 'Proje adı sadece harf ve rakam içermelidir.';
    } else if (projectName.match(/^\d+$/)) {
        errorMessage = 'Proje adı en az bir harf içermelidir.';
    }

    return errorMessage;
}
