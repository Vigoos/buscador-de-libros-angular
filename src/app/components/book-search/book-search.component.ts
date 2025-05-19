import { Component } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent {
  query: string = '';
  books: any[] = [];
  isLoading = false;
  error = '';

  constructor(private booksService: BooksService) {}

  search(): void {
    if (!this.query.trim()) return;

    this.isLoading = true;
    this.booksService.searchBooks(this.query).subscribe({
      next: (res) => {
        this.books = res.items || [];
        this.isLoading = false;
        this.error = '';
      },
      error: () => {
        this.error = 'Error al buscar libros.';
        this.isLoading = false;
      }
    });
  }
}
