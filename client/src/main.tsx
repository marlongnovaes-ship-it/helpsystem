import { trpc } from "@/lib/trpc";
import { UNAUTHED_ERR_MSG } from '@shared/const';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, TRPCClientError } from "@trpc/client";
import { createRoot } from "react-dom/client";
import superjson from "superjson";
import App from "./App";
import { getLoginUrl } from "./const";
import "./index.css";

const queryClient = new QueryClient();

const redirectToLoginIfUnauthorized = (error: unknown) => {
  if (!(error instanceof TRPCClientError)) return;
  if (typeof window === "undefined") return;

  const isUnauthorized = error.message === UNAUTHED_ERR_MSG;

  if (!isUnauthorized) return;

  window.location.href = getLoginUrl();
};

queryClient.getQueryCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.query.state.error;
    redirectToLoginIfUnauthorized(error);
    console.error("[API Query Error]", error);
  }
});

queryClient.getMutationCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.mutation.state.error;
    redirectToLoginIfUnauthorized(error);
    console.error("[API Mutation Error]", error);
  }
});

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "/api/trpc",
      transformer: superjson,
      fetch(input, init) {
        return globalThis.fetch(input, {
          ...(init ?? {}),
          credentials: "include",
        });
      },
    }),
  ],
});

// ========== PROTEÇÕES AVANÇADAS DE SEGURANÇA ==========

// 1. Bloquear botão direito do mouse
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  return false;
});

// 2. Bloquear atalhos de teclado (F12, DevTools, Ver Código)
document.addEventListener('keydown', (e) => {
  // F12, Ctrl+Shift+I/J/C, Ctrl+U, Ctrl+S
  if (
    e.key === 'F12' ||
    (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
    (e.ctrlKey && e.key === 'U') ||
    (e.ctrlKey && e.key === 'S') || // Salvar página
    (e.ctrlKey && e.key === 'P') // Imprimir
  ) {
    e.preventDefault();
    return false;
  }
});

// 3. Desabilitar seleção de texto e arrastar
document.addEventListener('selectstart', (e) => {
  e.preventDefault();
  return false;
});

document.addEventListener('dragstart', (e) => {
  e.preventDefault();
  return false;
});

// 4. Detector de DevTools
let devtoolsOpen = false;
const detectDevTools = () => {
  const threshold = 160;
  const widthThreshold = window.outerWidth - window.innerWidth > threshold;
  const heightThreshold = window.outerHeight - window.innerHeight > threshold;
  
  if (widthThreshold || heightThreshold) {
    if (!devtoolsOpen) {
      devtoolsOpen = true;
      alert('⚠️ ATENÇÃO\n\nEste site está protegido por direitos autorais.\n\n© 2026 HelpSystem - Todos os direitos reservados.\nDesenvolvido por Marlon Novaes');
      // Opcional: redirecionar ou desfocar
      // window.location.href = '/';
    }
  } else {
    devtoolsOpen = false;
  }
};

setInterval(detectDevTools, 1000);

// 5. Watermark invisível (comentário no console)
console.log('%c🔒 SITE PROTEGIDO', 'color: #3b82f6; font-size: 20px; font-weight: bold;');
console.log('%c© 2026 HelpSystem - Todos os direitos reservados', 'color: #6b7280; font-size: 14px;');
console.log('%cDesenvolvido por Marlon Novaes', 'color: #6b7280; font-size: 14px;');
console.log('%c\n⚠️ AVISO: Qualquer tentativa de copiar, modificar ou redistribuir este código é PROIBIDA e pode resultar em ações legais.', 'color: #ef4444; font-size: 12px; font-weight: bold;');

// 6. Bloquear Ctrl+A (selecionar tudo)
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'a') {
    e.preventDefault();
    return false;
  }
});

// 7. Adicionar marca d'água invisível no DOM
const watermark = document.createElement('div');
watermark.style.display = 'none';
watermark.setAttribute('data-owner', 'Marlon Novaes');
watermark.setAttribute('data-copyright', '2026 HelpSystem');
watermark.setAttribute('data-protection', 'enabled');
document.body?.appendChild(watermark);

createRoot(document.getElementById("root")!).render(
  <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </trpc.Provider>
);
