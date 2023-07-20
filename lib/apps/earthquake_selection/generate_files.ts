import { zeros, array } from 'numjs';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { OutputData, MetaData } from 'types/earthquake_selection/api_types';

export async function generateSpectralAccelerations(outputData: OutputData) {
    const { DataFrame, toExcel } = await import('danfojs');
    const fileName = `spectras.xlsx`;
    const selectedRecords = outputData.selectedRecords;
    let saAll = zeros(outputData.targetSpectra.length);
    const dfDict: { [key: string]: any } = {
        'Period(s)': outputData.targetSpectraPeriods,
        'Tasarım Spektrumu(g)': outputData.targetSpectra,
    };
    for (const record of Object.values(selectedRecords)) {
        const sa = array(record.spectralAccelerations);
        saAll = saAll.add(sa) as any;
        dfDict[`RSN${record.RSN}`] = sa.tolist();
    }
    const saMean = saAll
        .divide(Object.keys(selectedRecords).length)
        .tolist() as number[];
    dfDict['Ortalama'] = saMean.map((x) => +x.toFixed(5));
    const df = new DataFrame(dfDict);
    toExcel(df, { fileName });
}

export async function generateMetaData(outputData: OutputData) {
    const { DataFrame, toExcel } = await import('danfojs');
    const fileName = `meta_data.xlsx`;
    const dfDict: MetaData = {
        RSN: [],
        'Ölçeklendirme Katsayısı': [],
        'Deprem Adı': [],
        'İstasyon Adı': [],
        'Deprem Yılı': [],
        'Deprem Büyüklüğü': [],
        'VS30(m/s)': [],
        'Fay Tipi': [],
        'Fay Uzaklığı(km)': [],
        'Kayıt Aralığı(s)': [],
    };
    const selectedRecords = outputData.selectedRecords;
    for (const record of Object.values(selectedRecords)) {
        dfDict['RSN'].push(record.RSN);
        dfDict['Ölçeklendirme Katsayısı'].push(record.scaleFactor);
        dfDict['Deprem Adı'].push(record.eventName);
        dfDict['İstasyon Adı'].push(record.stationName);
        dfDict['Deprem Yılı'].push(record.year);
        dfDict['Deprem Büyüklüğü'].push(record.Mw);
        dfDict['VS30(m/s)'].push(record.VS30);
        dfDict['Fay Tipi'].push(record.faultType);
        dfDict['Fay Uzaklığı(km)'].push(record.Rrup);
        dfDict['Kayıt Aralığı(s)'].push(record.timeStep);
    }
    const df = new DataFrame(dfDict);
    toExcel(df, { fileName });
}

export async function generateRecordZip(
    outputData: OutputData,
    spectraType: string,
) {
    const selectedRecords = outputData.selectedRecords;
    const zip = new JSZip();
    for (const recordName in selectedRecords) {
        const record = selectedRecords[recordName];
        if (spectraType === 'V' || spectraType === 'H') {
            const fileName = record.fileName + '.txt';
            const content = generateContent(record.accelerations);
            zip.folder('records')?.file(
                `RSN${record.RSN}/${fileName}`,
                content,
            );
        } else {
            const fileNameEW = record.fileNameEW + '.txt';
            const contentEW = generateContent(record.accelerationsEW);
            zip.folder('records')?.file(
                `RSN${record.RSN}/${fileNameEW}`,
                contentEW,
            );
            const fileNameNS = record.fileNameNS + '.txt';
            const contentNS = generateContent(record.accelerationsNS);
            zip.folder('records')?.file(
                `RSN${record.RSN}/${fileNameNS}`,
                contentNS,
            );
        }
    }
    zip.generateAsync({ type: 'blob' }).then(function (content) {
        saveAs(content, 'records.zip');
    });
}

function generateContent(data: number[]) {
    let content = '';
    for (const d of data) {
        content += d + '\n';
    }

    return content;
}
