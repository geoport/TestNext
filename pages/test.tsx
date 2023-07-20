export default function TestPage() {
    async function handleAPI() {
        for (let i = 0; i < 10; i++) {
            const response = await fetch('/api/test', {
                method: 'POST',
                body: JSON.stringify({ index: i }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (data.message === null) {
                break;
            }
        }
    }

    return (
        <>
            <h1>Test Page</h1>
            <button onClick={handleAPI}>Test API</button>
        </>
    );
}
