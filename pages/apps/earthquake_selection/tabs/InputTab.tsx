import React from 'react';
import FilteringAccordion from '../accordions/filtering_accordion';
import SpectraAccordion from '../accordions/spectra_accordion';

export default function InputTab() {
	return (
		<>
			<FilteringAccordion />
			<SpectraAccordion />
		</>
	);
}
