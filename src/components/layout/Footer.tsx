import { NavLink } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            Built with RCRT — AI-native backend infrastructure.
          </p>
          <nav className="flex items-center gap-4">
            <NavLink to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Home
            </NavLink>
            <NavLink to="/chat" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Chat
            </NavLink>
            <NavLink to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </NavLink>
          </nav>
        </div>
      </div>
    </footer>
  );
}
