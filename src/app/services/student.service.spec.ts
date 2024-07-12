import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StudentService } from './student.service';
import { Student } from '../models/student';

describe('StudentService', () => {
  let service: StudentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StudentService]
    });
    service = TestBed.inject(StudentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve students from the API via GET', () => {
    const dummyStudents: Student[] = [
      { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
      { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com' }
    ];

    service.getStudents().subscribe(students => {
      expect(students.length).toBe(2);
      expect(students).toEqual(dummyStudents);
    });

    const request = httpMock.expectOne(`${service['baseUrl']}`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyStudents);
  });

  // Add more tests for other methods similarly
});
