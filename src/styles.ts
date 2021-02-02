export const spinnerStyles = `
.lds-ripple {
    display: inline;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-ripple div {
    position: absolute;
    border: 4px solid #fff;
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  .lds-ripple div:nth-child(2) {
    animation-delay: -0.5s;
  }
  @keyframes lds-ripple {
    0% {
      top: 36px;
      left: 36px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: 0px;
      left: 0px;
      width: 72px;
      height: 72px;
      opacity: 0;
    }
  }
  `;

export const containerStyles = `
    position: fixed;
    overflow: hidden;
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 999999999;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    visibility: hidden;
    margin: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;  
  `;

export const iframeStyles = `
    position: fixed;
    display: none;
    overflow: hidden;
    z-index: 999999999;
    width: 100%;
    height: 100%;
    transition: opacity 0.2s ease 0s;
    margin: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  `;
