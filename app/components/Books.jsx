"use client"

import React, { useState, useEffect } from 'react';

async function fetchBooks() {
  const res = await fetch('http://localhost:3000/api/books/getBooks');
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    return await res.json();
}

async function issueBook(studentId, bookId) {
    const res = await fetch('http://localhost:3000/api/students/issueBook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ studentId, bookId }),
    });
  
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error);
    }
  
    return await res.json();
  }

export default function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks()
      .then((data) => {
        setBooks(data);
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
      });
  }, []);  
  
  const handleBookClick = async (bookId) => {
    try {
      let studentId = prompt('Please enter your student ID:');
      if (!studentId) {
        return; 
      }
      studentId = parseInt(studentId);
      if (isNaN(studentId)) {
        console.error('Please enter a valid student ID.');
        alert('Please enter a valid student ID. Press enter to continue.');
        return;
      }
      const issuedBook = await issueBook(studentId, bookId);
      console.log('Book successfully issued:', issuedBook);
      alert('Book successfully issued. Press enter to continue.');

    } catch (error) {
      console.error('Error issuing book:', error.message);
      alert(`${error.message}. Press enter to continue.`);
    }
  };


  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {books.map((book) => (
            <div key={book.id} className='bg-white text-black rounded-lg shadow-md p-4'
            onClick={() => handleBookClick(book.id)} 
          style={{ cursor: 'pointer' }} 
          >
                <img src={book.image} alt="bookcover" className='object-contain h-72 w-72' />
                <h3 className='font-semibold text-lg mb-2'>{book.title}</h3>
                <p className='text-gray-700'>{book.author.name}</p>
            </div>
        ))}
    </div>
  );
}


