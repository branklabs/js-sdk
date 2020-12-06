import { spinnerStyles, containerStyles, iframeStyles } from './styles';

const widgetId: string = 'brank-widget-div';
const iframeId: string = 'brank-widget-iframe';
const loaderId: string = 'brank-widget-loading-indicator';

export function init({ key }) {
  if (document.getElementById(widgetId) && document.getElementById(iframeId)) {
    return;
  }

  const origin: URL = new URL('https://google.com');
  origin.searchParams.set('key', key);
  origin.searchParams.set('referrer', window.location.href);

  // container for iframe wrapper
  const container: HTMLDivElement = document?.createElement('div');
  container.setAttribute('id', widgetId);
  container.setAttribute('style', containerStyles);
  document.body.insertBefore(container, document.body.childNodes[0]);

  createIframe(origin);
}

function createIframe(origin: URL) {
  // iframe creator
  const iframe: HTMLIFrameElement = document?.createElement('iframe');
  iframe.setAttribute('src', origin.href);
  iframe.setAttribute('style', iframeStyles);
  iframe.setAttribute('id', iframeId);
  iframe.setAttribute('allowfullscreen', 'true');
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('title', 'Mono connect');
  iframe.setAttribute(
    'sandbox',
    'allow-forms allow-scripts allow-same-origin allow-top-navigation-by-user-activation allow-popups'
  );

  iframe.onload = () => {
    const loader: HTMLElement | null = document.getElementById(
      'brank-widget-loading-indicator'
    );
    if (iframe.style.visibility === 'visible') {
      loader.style.display = 'none';
    }
  };

  const loader = createLoader();

  document.getElementById(widgetId)?.appendChild(loader);
  document.getElementById(widgetId)?.appendChild(iframe);
}

export function createLoader() {
  let loaderContainer: HTMLDivElement = document.createElement('div');
  loaderContainer.setAttribute('id', loaderId);

  const subDiv1: HTMLDivElement = document.createElement('div');
  const subDiv2: HTMLDivElement = document.createElement('div');
  loaderContainer.classList.add('lds-ripple');

  loaderContainer.appendChild(subDiv1);
  loaderContainer.appendChild(subDiv2);

  return loaderContainer;
}

export function hideWidget() {
  const container: HTMLElement = document.getElementById(widgetId);
  const iframe: HTMLElement = document.getElementById(iframeId);

  container.style.display = 'none';
  iframe.style.display = 'none';
  container.style.visibility = 'hidden';
  iframe.style.visibility = 'hidden';
}

export function showWidget() {
  const container: HTMLElement = document.getElementById(widgetId);
  const iframe: HTMLElement = document.getElementById(iframeId);

  container.style.display = 'flex';
  iframe.style.display = 'block';
  container.style.visibility = 'visible';
  iframe.style.visibility = 'visible';
}

export function openWidget() {
  var container = document.getElementById(widgetId);
  var loader = document.getElementById(loaderId);
  var iframe = document.getElementById(iframeId);
  container.style.visibility = 'visible';
  container.style.display = 'flex';
  loader.style.display = 'block';

  setTimeout(() => {
    showWidget();
    iframe.focus({ preventScroll: false });
    container.focus({ preventScroll: false });
  }, 1000);
}

export function closeWidget() {
  hideWidget();
}

export function addStyles() {
  const styleSheet = document.createElement('style');
  styleSheet.innerText = spinnerStyles;
  document.head.appendChild(styleSheet);
}
