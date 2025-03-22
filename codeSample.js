// DYNAMIC EVENT LISTENER

document.addEventListener('DOMContentLoaded', () => {
  attachClickListener('paper-name', () => console.log('name Clidked'));
  attachClickListener('paper-size', () => console.log('size Clicked'));
  attachClickListener('paper-caliper', () => console.log('caliper Clicked'));
  attachClickListener('itemDateReceived', () =>
    console.log('Recieved Clicked')
  );
});
console.log('script loaded');

function attachClickListener(id, callback) {
  const el = document.getElementById(id);
  if (el && !el.dataset.listenerAttached) {
    el.addEventListener('click', callback);
    el.dataset.listenerAttached = 'true';
  }else if (!el){
    console.log(`Element with id ${id} not found!`)
  }
}
