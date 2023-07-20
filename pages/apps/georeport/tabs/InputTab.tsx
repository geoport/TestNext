import React from 'react';
import ProjectAccordion from '../accordions/project_accordion';
import BuildingAccordion from '../accordions/building_accordion';
import LoadingAccordion from '../accordions/loading_accordion';
import FoundationAccordion from '../accordions/foundation_accordion';
import SeismicAccordion from '../accordions/seismic_accordion';
import SoilProfileAccordion from '../accordions/soil_profile_accordion';
import ConstructionFieldAccordion from '../accordions/construction_field_accordion';
import SiteInvestigationAccordion from '../accordions/site_investigation_accordion';

export default function InputTab({ cityList }: { cityList: string[] }) {
    return (
        <>
            <ProjectAccordion />
            <BuildingAccordion />
            <ConstructionFieldAccordion cityList={cityList} />
            <SiteInvestigationAccordion />
            <FoundationAccordion />
            <LoadingAccordion />
            <SeismicAccordion />
            <SoilProfileAccordion />
        </>
    );
}

/*
            
*/
