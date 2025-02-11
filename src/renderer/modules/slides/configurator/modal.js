const Modal = {
  content: `<header>
      <h2>Inserir Script</h2>
      <div id="buttonWrapper">
        <button id="saveButton"
          aria-label="Salvar Script"
          title="Salvar Script"
        >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-save"><path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"/><path d="M7 3v4a1 1 0 0 0 1 1h7"/></svg>
        </button>
        <button
          id="executeButton"
          aria-label="Executar Script"
          title="Executar Script">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>
        </button>
        <button id="pasteButton" aria-label="Colar do clipboard" title="Colar do clipboard">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard-paste"><path d="M15 2H9a1 1 0 0 0-1 1v2c0 .6.4 1 1 1h6c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1Z"/><path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2M16 4h2a2 2 0 0 1 2 2v2M11 14h10"/><path d="m17 10 4 4-4 4"/></svg>
        </button>
        <button
          id="closeButton"
          aria-label="Fechar"
          title="Fechar">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-x"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
        </button>
      </div>
    </header>
    <pre><code id="scriptTextarea" class="language-javascript hljs"></code></pre>
    <textarea id="scriptTextareaExecute" hidden></textarea>`,
  createDialog() {
    const dialog = document.createElement('dialog');
    dialog.id = 'scriptModal'
    dialog.innerHTML = this.content;
    return dialog;
  },
  open() {
    const scriptModal = document.getElementById('scriptModal');
    const scriptTextarea = document.getElementById('scriptTextarea');
    const scriptTextareaExecute = document.getElementById('scriptTextareaExecute');
    const saveButton = document.getElementById('saveButton');
    const executeButton = document.getElementById('executeButton');
    const pasteButton = document.getElementById('pasteButton');
    const closeButton = document.getElementById('closeButton');

    scriptModal.showModal();

    scriptTextareaExecute.value = localStorage.getItem('savedScript') || '';
    scriptTextarea.innerHTML = scriptTextareaExecute.value;
    const highlightedValue = hljs.highlightAuto(scriptTextarea.textContent).value
    scriptTextarea.innerHTML = highlightedValue

    saveButton.addEventListener('click', () => {
      localStorage.setItem('savedScript', scriptTextareaExecute.value);
      alert('Script salvo com sucesso!');
    });

    executeButton.addEventListener('click', () => {
      try {
        eval(scriptTextareaExecute.value);
        alert('Script executado com sucesso!');
      } catch (error) {
        alert(`Erro ao executar o script: ${error.message}`);
      }
    });

    pasteButton.addEventListener('click', () => {
      navigator.clipboard.readText().then((text) => {
        scriptTextareaExecute.value = text;
        const highlightedValue = hljs.highlightAuto(text).value
        scriptTextarea.innerHTML = highlightedValue
      });
    });

    closeButton.addEventListener('click', () => {
      scriptModal.close();
    });
  }
}

document.body.appendChild(Modal.createDialog())

module.exports = Modal;