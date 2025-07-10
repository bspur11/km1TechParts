// modal.js (Reusable Modal Utility)

export function createModal({ title = '', message = '', onConfirm, onCancel }) {
  // Check if modal already exists
  let existing = document.getElementById('reusable-modal');
  if (existing) existing.remove();

  const modalOverlay = document.createElement('div');
  modalOverlay.id = 'reusable-modal';
  modalOverlay.style = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  `;

  const modalBox = document.createElement('div');
  modalBox.style = `
    background: #22c0de;
    padding: 1.5rem;
    border-radius: 8px;
    max-width: 400px;
    width: 100%;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  `;

  const modalTitle = document.createElement('h2');
  modalTitle.textContent = title;

  const modalMessage = document.createElement('p');
  modalMessage.textContent = message;

  const input = document.createElement('input');
  input.type = 'number';
  input.placeholder = 'Enter a number';
  input.autofocus = true;
  input.style = 'width: 100%; padding: 0.5rem; margin-top: 0.5rem;';

  const btnRow = document.createElement('div');
  btnRow.style = 'margin-top: 1rem; text-align: right;';

  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = 'Cancel';
  cancelBtn.style = 'margin-right: 0.5rem;';
  cancelBtn.onclick = () => {
    modalOverlay.remove();
    if (onCancel) onCancel();
  };

  const confirmBtn = document.createElement('button');
  confirmBtn.textContent = 'OK';
  confirmBtn.onclick = () => {
    const value = input.value.trim();
    if (!value || isNaN(Number(value))) {
      alert('Please enter a valid number.');
      return;
    }
    modalOverlay.remove();
    onConfirm(Number(value));
  };

  btnRow.appendChild(cancelBtn);
  btnRow.appendChild(confirmBtn);

  modalBox.appendChild(modalTitle);
  modalBox.appendChild(modalMessage);
  modalBox.appendChild(input);
  modalBox.appendChild(btnRow);

  modalOverlay.appendChild(modalBox);
  document.body.appendChild(modalOverlay);
  setTimeout(() => input.focus(), 0);

  // ✅ Add key handlers
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    confirmBtn.click();
  } else if (e.key === 'Escape') {
    cancelBtn.click();
  }
});


}
