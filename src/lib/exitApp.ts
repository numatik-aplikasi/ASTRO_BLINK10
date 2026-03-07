type AnyRecord = Record<string, unknown>;

function getCapacitorAppPlugin(): AnyRecord | undefined {
  const cap = (window as unknown as AnyRecord | undefined)?.Capacitor as AnyRecord | undefined;
  const plugins = cap?.Plugins as AnyRecord | undefined;
  const app = plugins?.App as AnyRecord | undefined;
  return app;
}

export function canExitApp(): boolean {
  const w = window as any;
  const n = navigator as any;

  return (
    (typeof w?.Android?.exitApp === "function") ||
    (typeof n?.app?.exitApp === "function") ||
    (typeof getCapacitorAppPlugin()?.exitApp === "function")
  );
}

export function exitApp(): boolean {
  const w = window as any;
  const n = navigator as any;

  // 1. Coba native Android app exit
  try {
    if (typeof w?.Android?.exitApp === "function") {
      w.Android.exitApp();
      return true;
    }
  } catch {
    // ignore
  }

  // 2. Coba iOS/Cordova exit
  try {
    if (typeof n?.app?.exitApp === "function") {
      n.app.exitApp();
      return true;
    }
  } catch {
    // ignore
  }

  // 3. Coba Capacitor exit
  try {
    const app = getCapacitorAppPlugin();
    const exit = app?.exitApp;
    if (typeof exit === "function") {
      exit.call(app);
      return true;
    }
  } catch {
    // ignore
  }

  // 4. Coba navigator.sendBeacon untuk menutup
  try {
    // Coba navigasi ke about:blank kemudian tutup
    if (w.history && w.history.length > 0) {
      // Coba metode lain untuk menutup
    }
  } catch {
    // ignore
  }

  // 5. Coba window.close() - hanya berhasil jika window dibuka oleh script
  try {
    // Cek apakah ini adalah top-level window yang bisa ditutup
    if (w.top === w && w.opener == null) {
      // Ini adalah main window - coba tutup
      w.close();
      return true;
    }
    // Jika window dibuka oleh tab lain
    if (w.opener) {
      w.close();
      return true;
    }
  } catch {
    // Browser memblokir window.close() - ignore
  }

  return false;
}

