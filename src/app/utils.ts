import clientList from '../data/clients.json';

export function random1toN(n = 200) {
  return Math.floor(Math.random() * n);
}

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

export function tacByColor(color = 'black') {
  return `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" stroke="${color}" fill="${color}" viewBox="0 0 32 32">
                    <path d="M20.743 14.815l-0.933-12.065h5.191c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0h-18c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0h5.432l-1.275 12.103c-3.213 0.959-5.574 3.738-5.904 7.113l-0.003 0.034c0 0.414 0.336 0.75 0.75 0.75h9.25v7.25c0 0.414 0.336 0.75 0.75 0.75s0.75-0.336 0.75-0.75v0-7.25h9.25c0.414-0 0.75-0.336 0.75-0.75v0c0-3.017-2.35-5.787-6.007-7.185zM12.104 16.081c0.096-0.035 0.179-0.085 0.249-0.148l-0.001 0.001 0.005-0.003c0.126-0.117 0.211-0.275 0.233-0.453l0-0.004 0.011-0.022 1.337-12.701h4.367l0.979 12.681c0.033 0.35 0.303 0.627 0.647 0.67l0.004 0c2.542 0.682 4.512 2.623 5.222 5.096l0.013 0.052h-18.341c0.729-2.54 2.714-4.49 5.222-5.157l0.052-0.012z"/>
                    </svg>`;
}

// export function updateContactList() {
//   const button = document.getElementById('contact-button');
//   const modalList = document.getElementById('clients-selected');
//   const total = clientList.filter((x) => x.selected);

//   button.innerHTML = `Contact (${total.length})`;
//   modalList.innerHTML = total.reduce((text, client) => {
//     return text + `<li>${client.description}</li>`;
//   }, '');
// }
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

  // if (!forceSelect) updateContactList();
}
