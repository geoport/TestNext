import * as fields from 'components/elements/FormFields';
import { Accordion } from 'components/elements/Accordion';
import { useEffect, useState, useContext } from 'react';
import { ConstructionFieldForm } from 'forms/construction_field_form';
import DataContext from '../context';

export default function ConstructionFieldAccordion({
    cityList,
}: {
    cityList: string[];
}) {
    const { data, setData } = useContext(DataContext);
    const [counties, setCounties] = useState(['']);
    const [neighbourhoods, setNeighbourhoods] = useState(['']);

    const handleInputChange = (event: any) => {
        const target = event.target;
        const name_ = target.name;
        const value = target.value || '';
        const constructionFieldData = {
            ...data.constructionFieldData,
            [name_]: value || '',
        };
        setData({
            ...data,
            constructionFieldData: constructionFieldData,
        });
    };

    const handleListChange = (id: string, e: any) => {
        const constructionFieldData = {
            ...data.constructionFieldData,
            [id]: e.value,
        };
        setData({
            ...data,
            constructionFieldData: constructionFieldData,
        });
    };

    useEffect(() => {
        (async () => {
            const response = await getCounties(
                data.constructionFieldData.city || cityList[0],
            );
            const counties_ = JSON.parse(response.message);
            setCounties(counties_);
            handleListChange('county', { value: counties_[0] });
        })();
    }, [data.constructionFieldData.city]);

    useEffect(() => {
        (async () => {
            const city = data.constructionFieldData.city || cityList[0];
            const county =
                data.constructionFieldData.county || counties[0] || 'Aladağ';
            const response = await getNeighbourhoods(city, county);
            const neighbourhoods_ = JSON.parse(response.message);
            setNeighbourhoods(neighbourhoods_);
        })();
    }, [data.constructionFieldData.city, data.constructionFieldData.county]);

    const form = new ConstructionFieldForm(cityList, counties, neighbourhoods);

    return (
        <Accordion id="constructionFieldData" title="Saha Bilgileri">
            <div className="grid grid-cols-2 gap-2">
                <fields.ListBox
                    formField={form.city}
                    selected={data.constructionFieldData.city || 'Adana'}
                    setSelected={(e) => handleListChange('city', e)}
                />
                <fields.ListBox
                    formField={form.county}
                    selected={data.constructionFieldData.county || counties[0]}
                    setSelected={(e) => handleListChange('county', e)}
                />
                <fields.ListBox
                    formField={form.neighbourhood}
                    selected={
                        data.constructionFieldData.neighbourhood ||
                        neighbourhoods[0]
                    }
                    setSelected={(e) => handleListChange('neighbourhood', e)}
                />
                <fields.InputField
                    onChange={handleInputChange}
                    value={data.constructionFieldData['pafta']}
                    formField={form.pafta}
                />
                <fields.InputField
                    onChange={handleInputChange}
                    value={data.constructionFieldData['ada']}
                    formField={form.ada}
                />
                <fields.InputField
                    onChange={handleInputChange}
                    value={data.constructionFieldData['parsel']}
                    formField={form.parsel}
                />
            </div>
        </Accordion>
    );
}

async function getCounties(city: string) {
    const response = await fetch('/api/get_counties', {
        method: 'POST',
        body: JSON.stringify({ city }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return response.json();
}

async function getNeighbourhoods(city: string, county: string) {
    const response = await fetch('/api/get_neighbourhoods', {
        method: 'POST',
        body: JSON.stringify({ city, county }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return response.json();
}
