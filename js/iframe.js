'use strict';

/*
  Resize parent iframe from postmessage
  received via iframe onload event containing the iframe height
*/

function receiveMessage(e) {
  if (parseInt(e.data.payload, 10) && e.data.type === "resize") { // if integer and msg type resize
    resizeIframeHeight(e.data.payload) // set timeline height to parent iframe size
  }
};

function resizeIframeHeight(h) { // T
  document.getElementsByClassName("lb-timeline")[0].style.height = (h - 250) + "px";
};

function onElementHeightChange(elem, callback) {
  // Periodically check and act if timeline height has changed
  var lastHeight = elem.clientHeight // persist over calls
    , newHeight;

  setInterval(function() {
    newHeight = elem.clientHeight;
    if (lastHeight != newHeight) callback(newHeight);
    lastHeight = newHeight;
  }, 800);
};

module.exports = {
  registerMessageHandler: function() {
    window.addEventListener("message", receiveMessage, false);
  },

  adjustBody: function() {
    if (!!window.FRAME_HEIGHT && parseInt(window.FRAME_HEIGHT)) {
      resizeIframeHeight(window.FRAME_HEIGHT);
    }
  },

  sendHeight: function(h) {
    parent.postMessage({ // theme's own dynamic height adjustment
      type: 'iframe',
      updatedHeight: h+300
    }, '*');

    parent.postMessage({ // AMP dynamic height adjustment
      sentinel: 'amp',
      type: 'embed-size',
      height: document.body.scrollHeight
    }, '*');
  },

  onElemHeightChange: onElementHeightChange
}