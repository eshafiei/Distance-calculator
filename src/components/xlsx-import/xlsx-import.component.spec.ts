import { TestBed, inject } from '@angular/core/testing';

import { XlsxImportComponent } from './xlsx-import.component';

describe('a xlsx-import component', () => {
	let component: XlsxImportComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				XlsxImportComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([XlsxImportComponent], (XlsxImportComponent) => {
		component = XlsxImportComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});