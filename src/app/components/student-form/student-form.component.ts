import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  studentForm: FormGroup;
  studentId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.studentId = +id;
      this.studentService.getStudentById(this.studentId).subscribe(student => {
        this.studentForm.patchValue(student);
      });
    }
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      const student: Student = this.studentForm.value;
      if (this.studentId) {
        this.studentService.updateStudent(this.studentId, student).subscribe(() => {
          this.router.navigate(['/students']);
        });
      } else {
        this.studentService.addStudent(student).subscribe(() => {
          this.router.navigate(['/students']);
        });
      }
    }
  }

  cancel(): void {
    // Implement cancel logic here (e.g., navigate back to student list)
    console.log('Form canceled');
    this.router.navigate(['/students']);
  }
}
