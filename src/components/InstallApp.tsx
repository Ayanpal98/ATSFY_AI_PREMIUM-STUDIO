import { useState, useEffect } from 'react';
import { Download, Smartphone, X, Sparkles } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function InstallApp() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if app is already running in standalone mode (installed)
    const isStandalone = 
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone ||
      document.referrer.includes('android-app://');

    if (isStandalone) {
      return;
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Update UI to show the install button
      if (!isDismissed) {
        setIsVisible(true);
      }
    };

    const handleAppInstalled = () => {
      // Clear the deferredPrompt so it can be garbage collected
      setDeferredPrompt(null);
      setIsVisible(false);
      console.log('PWA: India Startup Guide app was successfully installed!');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [isDismissed]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    await deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`PWA: User response to the install prompt: ${outcome}`);

    // We've used the prompt, and can't use it again
    setDeferredPrompt(null);
    setIsVisible(false);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
  };

  if (!isVisible) return null;

  return (
    <div 
      className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100/80 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 duration-500"
      id="pwa-install-banner"
    >
      <div className="flex items-start gap-3">
        <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-sm shrink-0">
          <Smartphone className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h4 className="text-sm font-bold text-slate-900">Install Startup Guide</h4>
            <span className="flex items-center gap-0.5 bg-indigo-100/60 text-indigo-700 text-[9px] font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-wider">
              <Sparkles className="w-2.5 h-2.5 text-indigo-600" /> offline ready
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            Get instant access, offline support, cost calculators, and business comparison tools directly from your home screen.
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
        <button
          onClick={handleDismiss}
          className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Dismiss banner"
          id="pwa-dismiss-btn"
        >
          <X className="w-4 h-4" />
        </button>
        <button
          onClick={handleInstallClick}
          className="flex-1 sm:flex-none px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          id="pwa-install-btn"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Install Now</span>
        </button>
      </div>
    </div>
  );
}
