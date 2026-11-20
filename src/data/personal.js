// Public identity fields: name, initials, website, headline, SEO summary, and roles.
// Set optional social URLs to '' to hide them; cvPath is the PDF path under public/.
// aboutAreas, currentGoals, and currentlyExploring provide the related profile copy.
export const personal = {
  name: 'Soniya Adhikari',
  initials: 'SA',
  website: 'https://soniyaadhikari.com.np',
  headline: 'Building Intelligent Solutions Through Engineering and AI.',
  seoDescription: 'Computer Engineering student exploring AI, machine learning, computer vision, and software development.',
  introduction: 'Exploring AI, computer vision, and software engineering—and turning ideas into practical projects.',
  roles: ['a Computer Engineering Student', 'an AI/ML Enthusiast', 'a Software Developer', 'a Research Enthusiast'],
  email: 'soniyadhikari29@gmail.com',
  github: 'https://github.com/soniyadhikari',
  linkedin: 'https://www.linkedin.com/in/soniyaadhikari/',
  facebook: 'https://www.facebook.com/soniya.adhikari.319247/',
  instagram: 'https://www.instagram.com/soniyadhikarii/',
  cvPath: '/soniya-cv.pdf',
  philosophy: 'I believe engineering is not just about writing code. It is about understanding problems, experimenting with solutions, learning from failures, and building technology that creates meaningful impact.',
  about: 'I am studying Computer Engineering and developing a multidisciplinary interest across software development, machine learning, computer vision, and AI safety. I enjoy turning ideas into working prototypes while learning the principles behind reliable engineering systems.',
  aboutAreas: [
    { icon: 'academic', title: 'Academic Foundation', education: true },
    { icon: 'ai', title: 'AI / ML', description: 'Learning to design practical, responsible intelligent systems' },
    { icon: 'vision', title: 'Computer Vision', description: 'Exploring perception for safety and real-world applications' },
    { icon: 'software', title: 'Software Development', description: 'Building accessible and maintainable web applications' },
  ],
  currentGoals: ['Strengthen foundations in machine learning and deep learning', 'Build reproducible computer vision experiments', 'Develop thoughtful, accessible software products'],
  currentlyExploring: [
    { name: 'PyTorch', detail: 'Model design and training workflows' },
    { name: 'Computer Vision', detail: 'Detection and autonomous systems' },
    { name: 'Edge AI', detail: 'Efficient real-time inference' },
  ],
}

export const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(personal.email)}&su=Portfolio%20inquiry`
