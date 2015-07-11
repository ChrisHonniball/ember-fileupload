/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-fileupload',
  
  included: function(app) {
    this._super.included(app);

    // Import the correct JS
    app.import(app.bowerDirectory + '/jquery-file-upload/js/vendor/jquery.ui.widget.js');
    app.import(app.bowerDirectory + '/jquery-file-upload/js/jquery.iframe-transport.js');
    app.import(app.bowerDirectory + '/jquery-file-upload/js/jquery.fileupload.js');
  },
  
  isDevelopingAddon: function() {
    return true;
  }
};
