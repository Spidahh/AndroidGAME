// Unico punto di configurazione: indirizzi, ID e chiavi pubbliche arrivano da variabili VITE_*.
export const CONFIG = {
  baseUrl: import.meta.env.VITE_PUBLIC_BASE_URL ?? 'https://holdout.magistaf.com',
  appId: import.meta.env.VITE_APP_ID ?? 'com.magistaf.holdout',
  build: import.meta.env.VITE_BUILD ?? 'dev',
};
