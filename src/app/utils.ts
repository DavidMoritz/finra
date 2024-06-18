import clientList from '../data/clients.json';

export function getRandomColor() {
  var randomRed = '0' + Math.floor(Math.random() * 205).toString(16);
  var randomGreen = '0' + Math.floor(Math.random() * 205).toString(16);
  var randomBlue = '0' + Math.floor(Math.random() * 205).toString(16);
  // console.log('randomColor', randomColor);

  return (
    '#' + randomRed.slice(-2) + randomGreen.slice(-2) + randomBlue.slice(-2)
  );
  // return '#d800a4';
}

export function arrayToCoords(cordArray: any) {
  return {
    lng: cordArray[0],
    lat: cordArray[1],
  };
}
export function buildContent(property: any) {
  const content = document.createElement('div');

  content.classList.add('property');
  content.innerHTML = `
    <div class="icon">
        <i aria-hidden="true" class="fa fa-icon fa-${property.type}" title="${
    property.type
  }"></i>
        <span class="fa-sr-only">${property.lastName.charAt(0)}</span>
    </div>
    `;
  return content;
}

export function updateContactList() {
  const button = document.getElementById('contact-button');
  const modalList = document.getElementById('clients-selected');
  const total = clientList.filter((x) => x.selected);

  button.innerHTML = `Contact (${total.length})`;
  modalList.innerHTML = total.reduce((text, client) => {
    return text + `<li>${client.description}</li>`;
  }, '');
}
export function toggleHighlight(
  markerView: any,
  property: any,
  forceSelect = false
) {
  const wasHighlighted = markerView.content.classList.contains('highlight');

  if (forceSelect && wasHighlighted) return;

  property.selected = !wasHighlighted;

  if (wasHighlighted) {
    markerView.content.classList.remove('highlight');
    markerView.zIndex = null;
  } else {
    markerView.content.classList.add('highlight');
    markerView.zIndex = 1;
  }

  if (!forceSelect) updateContactList();
}
