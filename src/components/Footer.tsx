const Footer = () => {
  return (
    <footer className="w-full border-t border-white/20 mt-auto bg-white/40 backdrop-blur-md">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 space-y-6 md:space-y-0 max-w-7xl mx-auto">
        <div>
          <span className="text-lg font-black text-primary">SkyGlass</span>
          <p className="text-sm font-body-md leading-relaxed text-on-surface-variant mt-2">© 2026 Vite React.js with Typescript and Tailwind project created by Qiling Tan</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;