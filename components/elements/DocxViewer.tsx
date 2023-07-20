import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import { BorderButton } from './Buttton';

export default function DocxViewer(props: { reportUrl: string }) {
    if (props.reportUrl === '') {
        return <div>Hata Oluştu</div>;
    }
    const reportUrl = props.reportUrl.replaceAll('"', '');
    const docs = [
        {
            uri: reportUrl,
        },
    ];

    return (
        <>
            <a
                href={reportUrl}
                download={'Rapor.docx'}
                target="_blank"
                rel="noopener noreferrer"
            >
                <BorderButton onClick={() => {}}>Raporu İndir</BorderButton>
            </a>
            <DocViewer
                documents={docs}
                pluginRenderers={DocViewerRenderers}
                className="mt-3"
                config={{
                    header: {
                        disableHeader: true,
                    },
                }}
            />
        </>
    );
}
