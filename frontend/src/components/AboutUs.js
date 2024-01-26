import React from 'react';


const AboutUs = () => {
  const testimonials = [
    {
      id: 1,
      author: 'Alice Johnson',
      position: 'Software Engineer',
      content: 'MentorHub has been an invaluable resource for my career growth. The mentors provided insightful guidance that helped me navigate complex projects and make informed career decisions.',
    },
    {
      id: 2,
      author: 'Michael Rodriguez',
      position: 'Marketing Specialist',
      content: 'Finding the right mentor can be challenging, but MentorHub made it seamless. The platform connected me with experienced mentors who shared their expertise and provided actionable advice for advancing in my marketing career.',
    },
    {
      id: 3,
      author: 'Emily Chen',
      position: 'Entrepreneur',
      content: 'As a startup founder, MentorHub played a crucial role in connecting me with mentors who had successfully built and scaled their businesses. Their guidance was instrumental in overcoming challenges and achieving business milestones.',
    },
    
  ];

  return (
    <div className="about-us-container">
      <h2>About Us</h2>
      <div className="about-content">
        <p>
          MentorHub is dedicated to helping individuals like you find the right mentor to guide and support your professional journey.
          Our platform connects mentees with experienced mentors across various industries, creating opportunities for mentorship that can drive personal and career development.
        </p>
      </div>

      <div className="testimonials-slider">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-slide">
            <p className="testimonial-content">{testimonial.content}</p>
            <p className="author">{testimonial.author}</p>
            <p className="position">{testimonial.position}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
