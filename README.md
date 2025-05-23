# NeuroSync

A modern web application focused on brain-computer interface technology, built with React, TypeScript, and Tailwind CSS.

![NeuroSync Banner](https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg)

## Project Overview

NeuroSync is a cutting-edge frontend application showcasing a company that develops brain-computer interface technology. The application features a responsive design with smooth animations and transitions powered by Framer Motion.

## Features

- **Modern UI**: Clean, responsive design with dark mode by default
- **Interactive Elements**: Hover effects, transitions, and animated components
- **Page Transitions**: Smooth transitions between pages using Framer Motion
- **Responsive Layout**: Mobile-first approach ensuring compatibility across devices
- **Modular Components**: Well-organized component structure for maintainability

## Tech Stack

- **React 19**: Latest version of React with improved rendering
- **TypeScript**: Type-safe JavaScript for enhanced developer experience
- **Vite**: Next generation frontend tooling for fast development
- **Tailwind CSS 4**: Utility-first CSS framework with modern features
- **Framer Motion**: Animation library for React
- **React Router**: Routing library for React applications
- **Lucide Icons**: Simple, clean icon library

## Project Structure

```
frontend/
├── public/              # Static files
├── src/                 # Source files
│   ├── components/      # Reusable components
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   └── ui/         # UI components
│   ├── lib/            # Utility functions and helpers
│   │   └── utils.ts
│   ├── pages/          # Page components
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Work.tsx
│   │   └── Contact.tsx
│   ├── App.tsx         # Main App component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles
└── package.json        # Dependencies and scripts
```

## Pages

- **Home**: Animated landing page with hero section and features
- **Work**: Showcase of projects with filtering capability
- **About**: Team information and company values
- **Contact**: Interactive contact form with animations

## Installation

1. Clone the repository:
```bash
git clone https://github.com/VaibhavMttl21/neurosync.git
cd neurosync
```

2. Install dependencies:
```bash
cd frontend
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Design System

The application uses a custom design system with a dark purple/lavender theme:

- **Color Palette**: Dark purple background with lavender accents
- **Typography**: Modern, clean font hierarchy
- **Components**: Custom UI components with consistent styling
- **Animations**: Subtle animations for enhanced user experience

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Credits

- Images: [Pexels](https://www.pexels.com/)
- Icons: [Lucide Icons](https://lucide.dev/)

## License

MIT License

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request
