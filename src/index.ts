// @ts-nocheck

import { configType } from './types';

import { addStyles, closeWidget, init, isRequired, openWidget } from './lib';

function connect({
  key,
  onClose = () => {},
  onLoad = () => {},
  onSuccess,
  ...rest
}: configType) {
  if (!(this instanceof connect))
    return new connect({ key, onClose, onSuccess, onLoad, ...rest });

  this.key = key || isRequired('key');
  connect.prototype.onLoad = onLoad;
  connect.prototype.onClose = onClose;
  connect.prototype.onSuccess = onSuccess || isRequired('onSuccess callback');
}

connect.prototype.setup = function () {
  addStyles();
  init({
    key: this.key,
    onload: this.load,
  });
};

connect.prototype.showOTP = function () {
  addStyles();
  init({
    key: this.key,
    onload: this.load,
    type: 'otp',
  });

  openWidget();
};

connect.prototype.open = function () {
  openWidget();

  function handleModalEvents(event: any) {
    switch (event.data.type) {
      case 'brank.widget.link_successful':
        this.onSuccess({ ...event.data.data });
        break;

      case 'brank.widget.close':
        connect.prototype.close();
        break;
    }
  }

  connect.prototype.eventHandler = handleModalEvents.bind(this);
  window.parent.addEventListener('message', this.eventHandler, false);
};

connect.prototype.close = function () {
  window.removeEventListener('message', this.eventHandler, false);
  closeWidget();
  this.onClose();
};

window.brank = connect;

export default connect;
