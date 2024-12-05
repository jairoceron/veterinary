import { TestBed } from '@angular/core/testing';

import { FileUploadServiceX } from './file-upload.serviceX';

describe('FileUploadService', () => {
  let service: FileUploadServiceX;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileUploadServiceX);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
