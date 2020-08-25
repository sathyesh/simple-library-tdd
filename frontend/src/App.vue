<template>
  <div id="app">
    <app-header title="Simple Library Management" />
    <section class="app-main-content">
      <div class="app-main-content__container">
        <h1>Welcome <span>{{this.currentUser.name}}</span> 🥳</h1>
        <app-list
         :listItems="currentUser.books_borrowed"
         :listType="'return'"
         :errorMsg="`Currently your reading list is empty. Borrow books
                    and improve your skills and knowledge 😀`">
            <template v-slot:default="slotProps">
              <app-card :title="slotProps.item.title">
                <template v-slot:body>
                  {{slotProps.item.description}}
                </template>
                <template v-slot:footer>
                  <app-button
                    :value="'Return'"
                    :isLoading="slotProps.item.loading"
                    :backgroundColor="'#f4a261'"
                    @click.native="returnBook(slotProps.item)">
                  </app-button>
                </template>
              </app-card>
            </template>
        </app-list>
      </div>
      <h2> Books available for Reading:</h2>
      <app-list :listItems="booksList">
        <template v-slot:default="slotProps">
          <app-card :title="slotProps.item.title">
             <template v-slot:body>
              {{slotProps.item.description}}
            </template>
            <template v-slot:footer>
              <app-button
                :value="'Borrow'"
                :backgroundColor="'#e76f51'"
                :isLoading="slotProps.item.loading"
                @click.native="borrowBook(slotProps.item)">
              </app-button>
              <p class="availability">Availability:
                <span class="availability__number">{{slotProps.item.available_copies}}</span>
              </p>
            </template>
          </app-card>
        </template>
      </app-list>
    </section>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import AppList from './components/AppList.vue';
import AppCard from './components/AppCard.vue';
import AppButton from './components/AppButton.vue';
import BOOKS_LIST from './assets/json/books.json';
import USERS_LIST from './assets/json/users.json';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppList,
    AppCard,
    AppButton,
  },
  data() {
    const booksList = BOOKS_LIST;
    booksList.forEach((book) => {
      const tempBook = book;
      tempBook.loading = false;
      return tempBook;
    });
    return {
      booksList,
      currentUser: USERS_LIST[0],
    };
  },
  methods: {
    borrowBook(item) {
      const bookItem = item;
      bookItem.loading = true;
      // Set timeout added to simulate a API call
      setTimeout(() => {
        bookItem.loading = false;
        if (this.isBookAlreadyBorrowed(bookItem)) {
          alert('Selected book is already borrowed 😀');
        } else if (this.updateUserBorrowedList(bookItem)) {
          bookItem.available_copies -= 1;
        }
      }, 500);
    },
    returnBook(book) {
      const bookFromLibrary = this.booksList
        .find((item) => item.isbn === book.isbn);
      // Adding book to the library
      if (typeof bookFromLibrary !== 'undefined') {
        bookFromLibrary.available_copies += 1;
      }
      // Removing book from the User borrowed list
      const bookIndexFromUser = this.currentUser.books_borrowed
        .findIndex((item) => item.isbn === book.isbn);
      this.currentUser.books_borrowed.splice(bookIndexFromUser, 1);
    },
    updateUserBorrowedList(book) {
      let isUpdated = false;
      if (this.currentUser.books_borrowed.length < 2) {
        const newBook = { ...book };
        this.currentUser.books_borrowed.push(newBook);
        isUpdated = true;
      } else {
        alert('You can borrow only 2 books 😀');
      }
      return isUpdated;
    },
    isBookAlreadyBorrowed(book) {
      const userBooksList = this.currentUser.books_borrowed;
      const bookFound = userBooksList.find((item) => item.isbn === book.isbn);
      if (typeof bookFound === 'undefined') {
        return false;
      }
      return true;
    },
  },
};
</script>

<style lang="scss">
</style>
