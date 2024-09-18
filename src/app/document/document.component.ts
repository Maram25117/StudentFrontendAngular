import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  pdfFiles: any[] = [];
  previewUrl: string | null = null;
  viewingFile: number | null = null;
  @ViewChild('fileInput') fileInputRef!: ElementRef;

  private readonly apiUrl = 'http://localhost:8082/file';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchFiles();
  }

  fetchFiles(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (response) => {
        this.pdfFiles = response;
      },
      (error) => {
        console.error('Error fetching files:', error);
        alert('Erreur lors de la récupération des fichiers. Veuillez réessayer.');
      }
    );
  }

    handleFileChange(event: Event): void {
      const input = event.target as HTMLInputElement;
      const files = input.files;
      if (files) {
          const formData = new FormData();
          Array.from(files).forEach((file: File) => {
              formData.append('files', file);
          });
  
          this.http.post(`${this.apiUrl}/upload`, formData, { responseType: 'text' }).subscribe(
              (response) => {
                  console.log('Files uploaded successfully:', response);
                  alert(response); // Show the plain text message from the server
                  this.fetchFiles(); // Refresh file list after upload
              },
              (error) => {
                  console.error('Error uploading files:', error);
                  alert('Erreur lors du téléversement des fichiers. Veuillez vérifier les détails.');
              }
          );
      }
  }
  
    handleDownload(id: number, name: string): void {
      this.http.get(`${this.apiUrl}/${id}`, { responseType: 'blob' }).subscribe(
          (response: Blob) => {
              const url = window.URL.createObjectURL(response);
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', name);
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link); // Clean up link element
              window.URL.revokeObjectURL(url); // Clean up URL object
          },
          (error) => {
              console.error('Error downloading file:', error);
              alert('Erreur lors du téléchargement du fichier. Veuillez vérifier les détails.');
          }
      );
  }
  
    handlePreview(id: number): void {
      this.http.get(`${this.apiUrl}/${id}`, { responseType: 'blob' }).subscribe(
        (response: Blob) => {
          const url = window.URL.createObjectURL(new Blob([response], { type: 'application/pdf' }));
          window.open(url, '_blank'); // Open in a new tab
        },
        (error) => {
          console.error('Error previewing file:', error);
          alert('Erreur lors de l\'aperçu du fichier. Veuillez vérifier les détails.');
        }
      );
    }
     handleDelete(id: number): void {
    const confirmDelete = window.confirm('Voulez-vous supprimer ce document ?');
    if (confirmDelete) {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe(
        () => {
          this.fetchFiles(); // Refresh file list after deletion
          if (this.viewingFile === id) {
            this.previewUrl = null;
            this.viewingFile = null;
          }
          console.log('File deleted successfully');
        },
        (error) => {
          console.error('Error deleting file:', error);
          alert('Erreur lors de la suppression du fichier. Veuillez vérifier les détails.');
        }
      );
    }
  }

  handleBack(): void {
    this.previewUrl = null;
    this.viewingFile = null;
  }

  handleImportClick(): void {
    this.fileInputRef.nativeElement.click(); // Trigger the file input click event
  }
}

