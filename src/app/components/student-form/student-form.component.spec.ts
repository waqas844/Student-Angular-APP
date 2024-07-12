import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StudentFormComponent } from './student-form.component';
import { StudentService } from '../../services/student.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Student } from '../../models/student';
import { MatFormFieldModule } from '@angular/material/form-field';

describe('StudentFormComponent', () => {
  let component: StudentFormComponent;
  let fixture: ComponentFixture<StudentFormComponent>;
  let studentService: StudentService;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule,MatFormFieldModule],
      declarations: [StudentFormComponent],
      providers: [
        StudentService,
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentFormComponent);
    component = fixture.componentInstance;
    studentService = TestBed.inject(StudentService);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate form when editing', () => {
    const dummyStudent: Student = { id: 1, name: 'John Doe', email: 'john.doe@example.com' };
    spyOn(studentService, 'getStudentById').and.returnValue(of(dummyStudent));

    component.ngOnInit();

    expect(component.studentForm.value).toEqual({ name: 'John Doe', email: 'john.doe@example.com' });
  });
});
