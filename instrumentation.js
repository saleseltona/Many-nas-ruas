// Inicia o worker da fila dentro do próprio servidor (a menos que QUEUE_MODE=external).
export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs' || process.env.QUEUE_MODE === 'external') return;
  const { startLoop } = await import('./lib/loop');
  startLoop();
}
