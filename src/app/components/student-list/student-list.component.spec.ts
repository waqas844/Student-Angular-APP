import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StudentListComponent } from './student-list.component';
import { StudentService } from '../../services/student.service';
import { of } from 'rxjs';
import { Student } from '../../models/student';
import { MatFormFieldModule } from '@angular/material/form-field';

describe('StudentListComponent', () => {
  let component: StudentListComponent;
  let fixture: ComponentFixture<StudentListComponent>;
  let studentService: StudentService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule,MatFormFieldModule],
      declarations: [StudentListComponent],
      providers: [StudentService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentListComponent);
    component = fixture.componentInstance;
    studentService = TestBed.inject(StudentService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch students on init', () => {
    const dummyStudents: Student[] = [
      { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
      { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com' }
    ];
    spyOn(studentService, 'getStudents').and.returnValue(of(dummyStudents));

    component.ngOnInit();

    expect(component.students.length).toBe(2);
    expect(component.students).toEqual(dummyStudents);
  });
});
