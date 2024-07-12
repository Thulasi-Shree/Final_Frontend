// Contact.js
import React, { useEffect, useRef } from 'react';
import styles from './styles.module.css';

const Contact = () => {
  const contactRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.loaded);
        }
      });
    }, {
      rootMargin: '0px',
      threshold: 0.2
    });

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => {
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
    };
  }, []);

  return (
    <section id="contact" ref={contactRef} className={`${styles.contact}`}>
      <div className={styles.contactContent}>
        <h2>Contact Us</h2>
        <form className={styles.contactForm}>
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
          <textarea placeholder="Your Message"></textarea>
          <button className='btn' type="submit">Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
