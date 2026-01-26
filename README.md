# Notes App

A modern, feature-rich note-taking application built with React, TypeScript, and Tailwind CSS. This application provides a clean, intuitive interface for creating, organizing, and managing your notes with support for Markdown formatting.

## Features

- **Rich Text Editing**: CodeMirror-powered editor with Markdown support
- **Real-time Preview**: Side-by-side editing and preview panes
- **Tag Organization**: Organize notes with customizable tags and colors
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Light/Dark Theme**: Automatic theme switching with manual override option
- **Persistent Storage**: Notes stored locally using IndexedDB
- **Search Functionality**: Quickly find notes by title or content
- **Export Options**: Download notes as text files
- **Keyboard Shortcuts**: Efficient keyboard navigation and shortcuts
- **Skeleton Loading**: Smooth loading experiences with skeleton placeholders

## Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **State Management**: Redux Toolkit
- **UI Components**: Custom components with shadcn/ui primitives
- **Styling**: Tailwind CSS with custom theme
- **Editor**: CodeMirror with Markdown support
- **Icons**: Lucide React and React Icons
- **Build Tool**: Vite
- **Database**: IndexedDB for local storage
- **Code Quality**: ESLint, Prettier, TypeScript

## Installation

1. Clone the repository:

```bash
git clone https://github.com/tunngtv/notes-taking.git
```

2. Navigate to the project directory:

```bash
cd notes-app
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5175`.

## Usage

- **Creating Notes**: Click the "+" button in the sidebar to create a new note
- **Editing Notes**: Select a note from the sidebar to edit its content
- **Adding Tags**: Use the tag input field to add colored tags to your notes
- **Switching Views**: Use the view controls in the footer to toggle between editor-only, preview-only, or split view
- **Searching Notes**: Use the search bar in the navigation header to find specific notes
- **Changing Themes**: Click the theme toggle button in the navbar to switch between light and dark mode

## Project Structure

```
src/
├── components/          # React components
│   ├── editor/          # Editor component with CodeMirror
│   ├── preview/         # Markdown preview component
│   ├── navigation/      # Sidebar navigation components
│   ├── ui/              # Reusable UI components (buttons, dialogs, etc.)
│   └── ...
├── hooks/              # Custom React hooks
├── redux/              # Redux store, actions, and reducers
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── styles/             # Global styles and variables
```

## Key Components

- **PanelsContainer**: Main container for editor and preview panes
- **TagIntegrator**: Component for adding and managing note tags
- **Navigation**: Sidebar with note listing and search
- **Editor**: CodeMirror-based editor with Markdown support
- **Preview**: Real-time Markdown preview renderer
- **ThemeProvider**: Context provider for theme management

## Customization

The application can be easily customized by:

1. Modifying the theme variables in `src/index.css`
2. Adjusting the UI components in the `src/components` directory
3. Extending the tag system in `src/components/tagIntegrator`
4. Adding new editor features in `src/components/editor`

## Contributing

This project follows the principles outlined in our [constitution](.specify/memory/constitution.md), which establishes standards for code quality, testing, user experience consistency, and performance.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes while adhering to the project's constitution principles
4. Ensure your changes meet the quality standards (linting, testing, accessibility)
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Vite](https://vitejs.dev/) for fast development
- UI components inspired by [shadcn/ui](https://ui.shadcn.com/)
- Icons provided by [Lucide React](https://lucide.dev/)
- Editor powered by [CodeMirror](https://codemirror.net/)
