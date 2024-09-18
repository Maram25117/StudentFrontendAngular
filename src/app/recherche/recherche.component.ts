// recherche.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  students: any[] = [];
  editStudent: any = null;
  deleteStudent: any = null;
  address: string = '';
  phone: string = '';
  email: string = '';
  classe: string = '';
  cin: string = '';
  error: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  handleSearch(): void { 
    if (this.firstName && this.lastName) {
      this.http.get<any[]>(`http://localhost:8082/student/name/${this.firstName}/${this.lastName}`)
        .subscribe(response => {
          this.students = response;
        }, error => {
          console.error("Erreur lors de la récupération des étudiants", error);
        });
    }
  }
  /*Le préfixe handle signifie "gérer" ou "traiter". Lorsqu'il est utilisé dans le nom d'une fonction ou d'une méthode, 
  il indique que cette fonction est conçue pour gérer une action ou un événement spécifique.    */

  handleEdit(student: any): void {
    this.editStudent = { ...student };
    this.address = student.address;
    this.phone = student.phone;
    this.email = student.email;
    this.classe = student.classe;
    this.cin = student.cin;
  }

  handleUpdate(): void {
    if (this.editStudent.firstName.length < 5 || this.address.length < 3 || this.phone.length !== 8 || !this.email.includes('@')) {
      this.error = "Le prénom doit contenir au moins 5 caractères, l'adresse au moins 3 caractères, le numéro de téléphone doit comporter 8 chiffres, et l'email doit contenir '@'";
      return;
    }

    this.http.put(`http://localhost:8082/student/update/${this.editStudent.id}`, {
      ...this.editStudent,
      address: this.address,
      phone: this.phone,
      email: this.email,
      classe: this.classe,
      cin: this.cin
    }).subscribe(() => {
      this.editStudent = null;
      this.handleSearch();
    }, error => {
      console.error("Erreur lors de la mise à jour de l'étudiant", error);
    });
  }

  confirmDelete(): void {
    this.http.delete(`http://localhost:8082/student/delete/${this.deleteStudent.id}`)
      .subscribe(() => {
        this.deleteStudent = null;
        this.handleSearch();
      }, error => {
        console.error("Erreur lors de la suppression de l'étudiant", error);
      });
  }

  setDeleteStudent(student: any): void {
    this.deleteStudent = student;
  }

  formatVCard(student: any): string {
    return `BEGIN:VCARD
VERSION:3.0
FN:${student.firstName} ${student.lastName}
TEL:${student.phone || ''}
EMAIL:${student.email || ''}
ADR:;;${student.address};;;
END:VCARD`;
  }

  handleSendEmail(student: any): void {
    const mailtoLink = `mailto:${student.email}`;
    window.location.href = mailtoLink;
  }
}
