document.addEventListener('DOMContentLoaded', () => {
  const goTo = (id, page) => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener('click', () => {
        window.location.href = `${page}.html`;
      });
    }
  };
  goTo('paperNameBtn', 'paperNames');
  goTo('paperOptionsBtn', 'paperOptions');
  goTo('paperSizeBtn', 'paperSizes');
  goTo('caliperBtn', 'calipers');
  goTo('receivedBtn', 'dateReceived');
  goTo('maintenanceBtn', 'maintenance');
  goTo('inksBtn', 'inks');
  goTo('suppliesBtn', 'supplies');
});
