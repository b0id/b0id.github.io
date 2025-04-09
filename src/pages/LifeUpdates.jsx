import React, { useState } from 'react';

const LifeUpdates = () => {
  const [currentPost, setCurrentPost] = useState(0);
  
  const blogPosts = [
    {
      date: 'April 5, 2025',
      title: 'Balancing Nursing School & Tech Projects',
      content: `
        <p>The past month has been an incredible journey of balancing clinical rotations with my ongoing electronics projects. I've found surprising parallels between nursing assessments and troubleshooting circuits - both require systematic thinking and careful observation.</p>
        
        <p>My recent patient simulations have given me ideas for a new vital signs monitoring system that could simplify data collection for nurses. I'm sketching initial designs and hope to start prototyping next month.</p>
        
        <p>Meanwhile, my boid simulation studies have led me to think about how groups of patients with similar conditions might respond to treatments in patterns that could be predicted with the right algorithms. The intersection between my different interests continues to inspire new ideas.</p>
      `
    },
    {
      date: 'March 20, 2025',
      title: 'Q*bert and Retro Gaming Inspiration',
      content: `
        <p>Decided to take a break from intense studying this weekend and revisited some classic arcade games. Q*bert has always been a favorite, and I realized how much the isometric cube design has influenced my aesthetic preferences over the years.</p>
        
        <p>The simple rules but complex emergent behavior in these old games feels similar to the boid algorithm I've been fascinated with. It's amazing how simple parameters can create such rich interactive experiences.</p>
        
        <p>I'm thinking of incorporating more of this retro gaming aesthetic into my personal projects, including this website. There's something comforting about the limited color palettes and pixel art that feels both nostalgic and fresh at the same time.</p>
      `
    },
    {
      date: 'February 28, 2025',
      title: 'New Semester, New Challenges',
      content: `
        <p>Started my advanced med-surg rotation this week, and it's already pushing me to grow in unexpected ways. The complexity of caring for multiple patients with various conditions reminds me of managing multiple interacting systems in engineering.</p>
        
        <p>I've been sketching ideas for a smartphone app that would help nursing students organize and prioritize patient care tasks. The interface would use a modified boid algorithm to visually cluster related tasks and adapt as priorities shift throughout a shift.</p>
        
        <p>On the electronics front, I've been tinkering with some health monitoring sensors that could feed data into this system. The dream is to create something that bridges the gap between my technical background and my healthcare education.</p>
      `
    }
  ];
  
  const nextPost = () => {
    setCurrentPost((prev) => (prev + 1) % blogPosts.length);
  };
  
  const previousPost = () => {
    setCurrentPost((prev) => (prev - 1 + blogPosts.length) % blogPosts.length);
  };
  
  return (
    <div className="page-container">
      <h1 className="page-title">Life Updates</h1>
      
      <div className="blog-container">
        <div className="blog-navigation">
          <button 
            className="pixel-nav-button" 
            onClick={previousPost}
            aria-label="Previous post"
          >
            ◀
          </button>
          
          <div className="post-indicator">
            {blogPosts.map((_, index) => (
              <span 
                key={index} 
                className={`post-dot ${index === currentPost ? 'active' : ''}`}
                onClick={() => setCurrentPost(index)}
              />
            ))}
          </div>
          
          <button 
            className="pixel-nav-button" 
            onClick={nextPost}
            aria-label="Next post"
          >
            ▶
          </button>
        </div>
        
        <div className="blog-post">
          <div className="post-header">
            <div className="post-date">{blogPosts[currentPost].date}</div>
            <h2 className="post-title">{blogPosts[currentPost].title}</h2>
          </div>
          
          <div 
            className="post-content"
            dangerouslySetInnerHTML={{ __html: blogPosts[currentPost].content }}
          />
        </div>
      </div>
      
      <div className="pixel-box mt-4">
        <h2>Current Status</h2>
        <div className="status-grid">
          <div className="status-item">
            <h3>Nursing School</h3>
            <div className="pixel-progress">
              <div className="progress-bar" style={{ width: '65%' }}></div>
              <span className="progress-text">65% Complete</span>
            </div>
            <p>Advanced med-surg rotation in progress</p>
          </div>
          
          <div className="status-item">
            <h3>Electronics Project</h3>
            <div className="pixel-progress">
              <div className="progress-bar" style={{ width: '40%' }}></div>
              <span className="progress-text">40% Complete</span>
            </div>
            <p>PCB design phase for patient monitoring system</p>
          </div>
          
          <div className="status-item">
            <h3>Website Development</h3>
            <div className="pixel-progress">
              <div className="progress-bar" style={{ width: '80%' }}></div>
              <span className="progress-text">80% Complete</span>
            </div>
            <p>Final touches on the b0id.dev site</p>
          </div>
          
          <div className="status-item">
            <h3>Reading List</h3>
            <div className="pixel-progress">
              <div className="progress-bar" style={{ width: '30%' }}></div>
              <span className="progress-text">30% Complete</span>
            </div>
            <p>Currently reading: "Emergent Patterns in Healthcare"</p>
          </div>
        </div>
      </div>
      
      <div className="upcoming-events">
        <h2>Upcoming Events</h2>
        <ul className="pixel-list">
          <li>
            <span className="event-date">April 15</span>
            <span className="event-title">Nursing Simulation Lab</span>
          </li>
          <li>
            <span className="event-date">April 23</span>
            <span className="event-title">Electronics Maker Faire</span>
          </li>
          <li>
            <span className="event-date">May 10</span>
            <span className="event-title">Healthcare Tech Hackathon</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LifeUpdates;