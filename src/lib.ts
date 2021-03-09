// @ts-ignore

import { spinnerStyles, containerStyles, iframeStyles } from './styles';

const widgetId: string = 'brank-widget-div';
const iframeId: string = 'brank-widget-iframe';
const loaderId: string = 'brank-widget-loading-indicator';

interface IInit {
  key: string;
  onload: () => void;
  type?: 'otp' | 'bank-statement' | 'auth';
  env?: 'sandbox' | 'production' | 'development';
}

export function init({
  env = 'development',
  key,
  onload,
  type = 'auth',
  ...rest
}: IInit) {
  // safe guard for SSR
  if (!document || !window) return;

  const origin: URL = new URL('https://connect.getbrank.com');
  // const origin: URL = new URL('http://localhost:1234');
  origin.searchParams.set('key', key);
  origin.searchParams.set('clientUrl', window?.location.href);
  origin.searchParams.set('type', type);
  origin.searchParams.set('env', env);

  if (document.getElementById(widgetId) && document.getElementById(iframeId)) {
    // @ts-ignore
    const iframe: HTMLIFrameElement = document.getElementById(iframeId);
    iframe?.setAttribute('src', origin.href);
    return;
  }

  Object.keys(rest).map((key: string) =>
    // @ts-ignore
    origin.searchParams.set(key, rest[key])
  );

  // container for iframe wrapper
  const container: HTMLDivElement = document?.createElement('div');
  container.setAttribute('id', widgetId);
  container.setAttribute('style', containerStyles);
  document.body.insertBefore(container, document.body.childNodes[0]);

  createIframe(origin, onload);
}

function createIframe(origin: URL, onload: () => void) {
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
    onload?.();
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
  // @ts-ignore
  const container: HTMLElement = document.getElementById(widgetId); // @ts-ignore
  const iframe: HTMLElement = document.getElementById(iframeId);

  container.style.display = 'none';
  iframe.style.display = 'none';
  container.style.visibility = 'hidden';
  iframe.style.visibility = 'hidden';
}

export function showWidget() {
  // @ts-ignore
  const container: HTMLElement = document.getElementById(widgetId); // @ts-ignore
  const iframe: HTMLElement = document.getElementById(iframeId);
  // var loader = document.getElementById(loaderId);

  container.style.display = 'flex';
  iframe.style.display = 'block';
  container.style.visibility = 'visible';
  iframe.style.visibility = 'visible';
}

export function openWidget() {
  var container = document.getElementById(widgetId);
  var loader = document.getElementById(loaderId);
  var iframe = document.getElementById(iframeId);

  // @ts-ignore
  container.style.visibility = 'visible'; // @ts-ignore
  container.style.display = 'flex'; // @ts-ignore
  loader.style.display = 'block';

  setTimeout(() => {
    showWidget();
    // @ts-ignore
    iframe.focus({ preventScroll: false });
    // @ts-ignoreg
    container.focus({ preventScroll: false });
  }, 500);
}

export function closeWidget() {
  hideWidget();
}

export function addStyles() {
  const styleSheet = document.createElement('style');
  styleSheet.innerText = spinnerStyles;
  document.head.appendChild(styleSheet);
}

export const isRequired = (name: string) => {
  throw new Error(`${name} is required`);
};
