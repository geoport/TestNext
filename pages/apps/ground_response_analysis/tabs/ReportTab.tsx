import dynamic from 'next/dynamic';

const DocxViewer = dynamic(() => import('components/elements/DocxViewer'));

export default function ReportTab(props: { reportUrl: string }) {
    return (
        <div className="h-screen">
            <DocxViewer reportUrl={props.reportUrl} />
        </div>
    );
}
