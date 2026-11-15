(() => {
  const lessons = {'/level1.html':'Launch pad', '/level2.html':'Low orbit', '/level3.html':'Deep space', '/level4.html':'Mission control'};
  try {
    if (lessons[location.pathname]) localStorage.setItem('ai-planets-last-lesson', location.pathname);
    const last = localStorage.getItem('ai-planets-last-lesson');
    const resume = document.getElementById('resume-lesson');
    if (resume && lessons[last]) {
      resume.href = last;
      resume.textContent = 'Continue reading: ' + lessons[last];
      resume.hidden = false;
      resume.style.display = 'inline-block';
    }
  } catch { /* Reading still works when local storage is disabled. */ }
  const status = document.getElementById('offline-status');
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(() => navigator.serviceWorker.ready).then(() => {
      if (status) status.textContent = 'Guide saved for offline reading. Outside links need internet.';
    }).catch(() => {
      if (status) status.textContent = 'Offline saving is unavailable right now. You can keep reading online.';
    });
  } else if (status) status.textContent = 'This browser supports online reading only.';
  let installPrompt;
  const button = document.getElementById('install-guide');
  window.addEventListener('beforeinstallprompt', event => {
    if (!button) return;
    event.preventDefault();
    installPrompt = event;
    button.hidden = false;
  });
  if (button) button.addEventListener('click', async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    installPrompt = null;
    button.hidden = true;
  });
  window.addEventListener('appinstalled', () => { if (button) button.hidden = true; });
})();
