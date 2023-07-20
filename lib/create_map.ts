type Map = {
    key: string;
    value: string;
};

export default function createMapList(list: string[]): Map[] {
    const mapList: Map[] = [];
    list.forEach((item) => {
        mapList.push({ key: item, value: item });
    });
    return mapList;
}
