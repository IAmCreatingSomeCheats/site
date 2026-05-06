import { useEffect, useState } from 'react';

const STORAGE_KEY = 'three-deaths-beta-unlocked';

/**
 * Beta passphrase overlay. Loads passphrase from /beta-gate.json (public/).
 * Delete public/beta-gate.json and redeploy → gate is off (fetch returns 404).
 * Not security: anyone can read the JSON or bundle; good enough to hide a beta URL.
 */
export default function BetaGate({ children }) {
  const [status, setStatus] = useState('loading'); // loading | off | unlocked | locked

  useEffect(() => {
    let cancelled = false;

    async function run() {
      const url = new URL('beta-gate.json', window.location.origin + import.meta.env.BASE_URL).href;

      try {
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) {
          if (!cancelled) setStatus('off');
          return;
        }
        const data = await res.json();
        const password = typeof data.password === 'string' ? data.password : '';
        if (!password) {
          if (!cancelled) setStatus('off');
          return;
        }
        if (sessionStorage.getItem(STORAGE_KEY) === '1') {
          if (!cancelled) setStatus('unlocked');
          return;
        }
        if (!cancelled) setStatus('locked');
      } catch {
        if (!cancelled) setStatus('off');
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  if (status === 'loading') {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[var(--void-bg)]">
        <div className="h-8 w-8 border-2 border-soul-cyan/20 border-t-soul-cyan rounded-full animate-spin" />
      </div>
    );
  }

  if (status === 'off' || status === 'unlocked') {
    return children;
  }

  return <BetaLockScreen />;
}

function BetaLockScreen() {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError(false);

    const url = new URL('beta-gate.json', window.location.origin + import.meta.env.BASE_URL).href;
    let password = '';
    try {
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) {
        sessionStorage.setItem(STORAGE_KEY, '1');
        window.location.reload();
        return;
      }
      const data = await res.json();
      password = typeof data.password === 'string' ? data.password : '';
    } catch {
      sessionStorage.setItem(STORAGE_KEY, '1');
      window.location.reload();
      return;
    }

    if (value === password) {
      sessionStorage.setItem(STORAGE_KEY, '1');
      window.location.reload();
      return;
    }
    setError(true);
    setValue('');
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[var(--void-bg)] px-6">
      <form
        onSubmit={submit}
        className="w-full max-w-sm border border-soul-cyan/20 bg-[var(--obsidian)]/80 p-8 shadow-xl backdrop-blur-sm"
      >
        <p className="font-display text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
          Beta access
        </p>
        <h1 className="font-display font-black text-xl text-bone mb-6">Enter passphrase</h1>
        <label className="sr-only" htmlFor="beta-pass">
          Passphrase
        </label>
        <input
          id="beta-pass"
          type="password"
          autoComplete="off"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-soul-cyan/40 mb-4"
          placeholder="Passphrase"
        />
        {error && (
          <p className="text-sm text-blood-tax mb-4" role="alert">
            Incorrect passphrase.
          </p>
        )}
        <button
          type="submit"
          className="w-full py-3 text-sm font-bold tracking-wider uppercase bg-soul-cyan/15 border border-soul-cyan/40 text-soul-cyan hover:bg-soul-cyan/25 transition-colors"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
