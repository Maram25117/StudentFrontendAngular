import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.css']
})
export class ClasseComponent implements OnInit {
  classe: string = '';
  students: any[] = [];
  error: string = '';
  confirmationOpen: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  handleSearch() {
    if (this.classe) {
      this.http.get<any[]>(`http://localhost:8082/student/classe/${this.classe}`)
        .subscribe(
          data => {
            this.students = data;
            this.error = '';
          },
          err => {
            console.error("Erreur lors de la récupération des étudiants", err);
            this.error = "Erreur lors de la récupération des étudiants.";
          }
        );
    } else {
      this.error = 'Le champ de classe est vide.';
    }
  }

  generatePDF() {
    const doc = new jsPDF();

    // Set font to bold, color to blue, and font size to 16 for the title
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 255); // Blue color
    doc.setFontSize(18); // Increase font size for title

    // Title text
    const title = `Classe ${this.classe}`;
    
    // Center title
    const titleWidth = doc.getStringUnitWidth(title) * doc.internal.scaleFactor;
    const pageWidth = doc.internal.pageSize.getWidth();
    const xPosition = (pageWidth - titleWidth) / 2;
    
    doc.text(title, xPosition, 20); // Title at the top center

    // Reset font to normal and color to black for the rest of the text
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0); // Black color

    // Add student details
    this.students.forEach((student, index) => {
      const yPosition = 30 + (index * 20); // Position each entry
      doc.text(`${index + 1}. ${student.firstName} ${student.lastName}`, 10, yPosition);
    });

    doc.save(`Classe_${this.classe}.pdf`);
  }

  handleGeneratePDF() {
    if (!this.classe) {
      this.error = 'Le champ de classe est vide.';
    } else {
      this.confirmationOpen = true;
    }
  }

  handleConfirmationClose() {
    this.confirmationOpen = false;
  }

  handlePDFConfirm() {
    this.generatePDF();
    this.handleConfirmationClose();
  }
}
