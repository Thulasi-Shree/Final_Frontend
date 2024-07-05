import React, { useState } from 'react';
import styles from './styles.module.css';

const ClientTestimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      author: "John Doe"
    },
    {
      quote: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      author: "Jane Smith"
    },
    // Add more testimonials as needed
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section id="testimonials" className={styles.testimonials}>
      <h2>Client Testimonials</h2>
      <div className={styles.carousel}>
        <div className={styles.testimonialItems}>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`${styles.testimonial} ${
                index === currentSlide ? styles.active : ''
              }`}
            >
              <p>{testimonial.quote}</p>
              <span>{testimonial.author}</span>
            </div>
          ))}
        </div>
        <button className={styles.prevBtn} onClick={prevSlide}>
          Prev
        </button>
        <button className={styles.nextBtn} onClick={nextSlide}>
          Next
        </button>
      </div>
    </section>
  );
};

export default ClientTestimonials;
