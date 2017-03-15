'use strict';

/*
  Metrics, UI A/B testing events handler.
  In lieu of an event stream data warehouse
  we log requests to s3 :)
*/

var sendMetric = {
  send: function(customEvent) {
    if (!customEvent.detail) return false; // early exit

    var pixel = new Image()
      , randString = String(Math.random())
      , hash = randString.substr(randString.length-10) // cache-buster
      , pixel_src = "https://dq4xjmopyzaan.cloudfront.net/pixel.gif"
      , metricName = customEvent.detail.action;

    pixel.src = pixel_src + '?a='+ encodeURIComponent(metricName) + "&hash=" + hash;
  },
  
  init: function() {
    var parent = this;
    window.addEventListener("sendmetric", this.send.bind(this), false)
  }
}

module.exports = sendMetric;
