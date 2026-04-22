const Footer = () => {
  return (
    <footer className="w-full border-t border-white/20 mt-auto bg-white/40 backdrop-blur-md">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 space-y-6 md:space-y-0 max-w-7xl mx-auto">
        <div>
          <span className="text-lg font-black text-primary">SkyGlass</span>
          <p className="text-sm font-body-md leading-relaxed text-on-surface-variant mt-2">© 2024 SkyGlass Meteorology. Radiant, Reliable, and Uplifting.</p>
        </div>
        <nav className="flex gap-8">
          <a className="text-on-surface-variant hover:text-primary transition-colors text-sm font-body-md leading-relaxed" href="#">Forecasts</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors text-sm font-body-md leading-relaxed" href="#">Air Quality</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors text-sm font-body-md leading-relaxed" href="#">Radar</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors text-sm font-body-md leading-relaxed" href="#">Settings</a>
        </nav>
        <div className="flex gap-4">
          <button className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-white/80 transition-all opacity-100 hover:opacity-80">
            <span className="material-symbols-outlined text-primary">public</span>
          </button>
          <button className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-white/80 transition-all opacity-100 hover:opacity-80">
            <span className="material-symbols-outlined text-primary">share</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;