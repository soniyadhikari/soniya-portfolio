// Add or edit highlighted projects here; each entry becomes a project card automatically.
// Keep slugs unique. Required fields: slug, title, description, technologies, and status.
// Optional fields include github, demo, featured, overview, and architecture.
export const projects = [
  {
    slug: 'ai-ghostdriver',
    title: 'AI GhostDriver',
    description: 'An AI-based tele-driving and safety assistance project using simulated driving environments.',
    technologies: ['Python', 'CARLA', 'Computer Vision', 'Deep Learning'],
    status: 'In Progress',
    featured: true,
    github: 'https://github.com/Sujan29k/Ghost_Driver',
    demo: '',
    overview: 'A safety-oriented tele-driving and AI assistance experiment built around simulated driving environments.',
  },
  {
    slug: 'e-commerce',
    title: 'E-commerce',
    description: 'A full-stack shopping application with a customer storefront, admin interface, and Express/Mongoose backend.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'JWT'],
    status: 'Completed',
    featured: false,
    github: 'https://github.com/soniyadhikari/E-commerce',
    demo: '',
    overview: 'The repository contains a customer-facing React storefront, a separate React admin interface, and an Express backend using Mongoose.',
    architecture: 'Customer storefront and admin interface connect to the Express API; the backend uses Mongoose for MongoDB data access.',
  },
  {
    slug: 'name-that-llm',
    title: 'Name That LLM – Model Attribution',
    description: 'A machine learning competition focused on identifying which language model generated a given text passage.',
    technologies: ['Python', 'NLP', 'TF-IDF', 'Logistic Regression', 'SVM'],
    status: 'Experimenting',
    featured: false,
    github: '',
    demo: '',
  },
  {
    slug: 'dogs-vs-cats',
    title: 'Dogs vs Cats Classification',
    description: 'An image classification project using deep learning.',
    technologies: ['Python', 'CNN', 'TensorFlow', 'Keras'],
    status: 'Completed',
    featured: false,
    github: 'https://github.com/soniyadhikari/dog-vs-cat-image-classification',
    demo: '',
  },
]
