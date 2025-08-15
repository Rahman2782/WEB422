import { useSession, getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Header from '../components/Header';

export default function Dashboard({ initialBooks }) {
  const { data: session, status } = useSession({ required: true });
  const [books, setBooks] = useState(initialBooks);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  const handleDelete = async (bookId) => {
    const res = await fetch(`http://localhost:5000/api/books/${bookId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${session.accessToken}`,
      },
    });
    if (res.ok) {
      setBooks(books.filter(book => book._id !== bookId));
    }
  };

  return (
    <div>
      <Header />
      <h1>Book Dashboard</h1>
      <ul>
        {books.map(book => (
          <li key={book._id}>
            {book.title} by {book.author}
            <button onClick={() => handleDelete(book._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const res = await fetch('http://localhost:5000/api/books', {
    headers: {
      'Authorization': `Bearer ${session.accessToken}`,
    },
  });
  const books = await res.json();

  return {
    props: {
      initialBooks: books,
      session,
    },
  };
}