import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Student {
  id?: number;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  email: string;
  cin: string;
  classe: string;
}

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  firstName = '';
  lastName = '';
  address = '';
  phone = '';
  email = '';
  cin = '';
  classe = '';
  students: Student[] = [];
  showList = false;
  error = '';
  editStudent: Student | null = null;
  isEditMode = false; // Flag to determine if we are in edit mode

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  validateFields(): boolean {
    if (!this.firstName || !this.lastName || !this.address || !this.phone || !this.email || !this.cin || !this.classe) {
      this.error = 'Tous les champs sont obligatoires';
      return false;
    }
    if (this.firstName.length < 2 || this.lastName.length < 2) {
      this.error = 'Prénom et nom doivent avoir au moins 2 caractères';
      return false;
    }
    if (this.address.length < 3) {
      this.error = 'Adresse doit avoir au moins 3 caractères';
      return false;
    }
    if (this.phone.length !== 8 || isNaN(Number(this.phone))) {
      this.error = 'Le numéro de téléphone doit contenir exactement 8 chiffres';
      return false;
    }
    if (!this.email.includes('@')) {
      this.error = 'L\'adresse email doit contenir un @';
      return false;
    }
    if (this.cin.length !== 8 || isNaN(Number(this.cin))) {
      this.error = 'Le CIN doit contenir exactement 8 chiffres';
      return false;
    }
    this.error = '';
    return true;
  }

  checkIfStudentExists(): void {
    this.http.get<Student[]>('http://localhost:8082/student/getAll').subscribe(students => {
      const studentExists = students.some(student => 
        (student.email === this.email || 
        student.cin === this.cin || 
        student.phone === this.phone) &&
        (!this.isEditMode || student.id !== this.editStudent?.id) // Avoid checking for the current student being edited
      );

      if (studentExists) {
        this.error = 'Un étudiant avec cet email, CIN ou numéro de téléphone existe déjà';
        return;
      } else {
        if (this.isEditMode && this.editStudent) {
          this.updateStudent();
        } else {
          this.addStudent();
        }
      }
    });
  }

  addStudent(): void {
    const student: Student = { 
      firstName: this.firstName, 
      lastName: this.lastName, 
      address: this.address, 
      phone: this.phone, 
      email: this.email, 
      cin: this.cin, 
      classe: this.classe 
    };

    this.http.post('http://localhost:8082/student/add', student).subscribe(() => {
      this.resetForm();
      if (this.showList) this.fetchStudents();
    });
  }

  updateStudent(): void {
    if (!this.editStudent?.id) return;

    const updatedStudent: Student = { 
      id: this.editStudent.id, 
      firstName: this.firstName, 
      lastName: this.lastName, 
      address: this.address, 
      phone: this.phone, 
      email: this.email, 
      cin: this.cin, 
      classe: this.classe 
    };

    this.http.put(`http://localhost:8082/student/update/${this.editStudent.id}`, updatedStudent).subscribe(() => {
      this.resetForm();
      if (this.showList) this.fetchStudents();
    });
  }

  handleSubmit(): void {
    if (!this.validateFields()) return;
    this.checkIfStudentExists();
  }

  resetForm(): void {
    this.firstName = '';
    this.lastName = '';
    this.address = '';
    this.phone = '';
    this.email = '';
    this.cin = '';
    this.classe = '';
    this.error = '';
    this.isEditMode = false; // Reset to add mode
    this.editStudent = null; // Clear the edit student
  }

  fetchStudents(): void {
    this.http.get<Student[]>('http://localhost:8082/student/getAll').subscribe((students) => {
      this.students = students;
    });
  }

  handleShowList(): void {
    this.showList = !this.showList;
    if (this.showList) {
      this.fetchStudents();
    }
  }

  handleEdit(student: Student): void {
    this.editStudent = student;
    this.firstName = student.firstName;
    this.lastName = student.lastName;
    this.address = student.address;
    this.phone = student.phone;
    this.email = student.email;
    this.cin = student.cin;
    this.classe = student.classe;
    this.isEditMode = true; // Set to edit mode
  }

  handleDelete(student: Student): void {
    const confirmation = window.confirm('Êtes-vous sûr de vouloir supprimer cet étudiant ?');
    if (confirmation) {
      if (student.id) {
        this.http.delete(`http://localhost:8082/student/delete/${student.id}`).subscribe(() => {
          this.fetchStudents();
        });
      } else {
        this.error = 'ID de l\'étudiant manquant';
      }
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
