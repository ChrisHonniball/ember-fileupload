import Ember from 'ember';
import layout from '../templates/components/ember-fileupload';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'form',
  classNames: ['ember-fileupload'],
  classNameBindings: ['disabled'],

  /**
   * Placeholder for a parent controller to be sent to the addon.
   * @type {Ember Object}
   */
  parentController: {},

  /**
   * Classes to put on the file input.
   * @type {String}
   */
  fileInputClass: '',

  /**
   * Classes to put on the activation button.
   * @type {String}
   */
  fileBtnClass: '',

  /**
   * Text to put in the activation button.
   * @type {String}
   */
  fileBtnText: 'Choose Files',

  /**
   * Flag to hide/show the activation button.
   * @type {Boolean}
   */
  hideActivationBtn: false,

  /**
   * Flag used to output imformational logs.
   * @type {Boolean}
   */
  debug: false,

  /**
   * Flag to disable/enable the file uploader.
   * @type {Boolean}
   */
  disabled: false,
  enabled: Ember.computed.not('disabled'),

  /**
   * A String containing the URL to sent the request.
   * If undefined or empty, it is set to the action property of the file upload form if available, or else the URL of the current page.
   * @type {String}
   */
  url: "",

  /**
   * The HTTP request method for the file uploads. Can be "POST", "PUT" or "PATCH" and defaults to "POST".
   * @type {String}
   */
  type: "POST",

  /**
   * The type of data that is expected back from the server.
   * @type {String}
   */
  dataType: "json",


  /**
   * The CSS class or id selector for the drop target.
   * Set to null to disable drag & drop support
   * @type {String}
   */
  dropZone: 'self',

  /**
   * The parameter name for the file form data (the request argument name).
   * If undefined or empty, the name property of the file input field is used "files[]".
   * @type {String}
   */
  paramName: 'files[]',

  /**
   * Allows to set the accept-charset attribute for the iframe upload forms.
   * @type {String}
   */
  formAcceptCharset: 'utf-8',

  /**
   * By default, each file of a selection is uploaded in one request each.
   * Set this option to true to upload file selections using an individual request for XHR type uploads.
   * Note: Uploading multiple files with one request requires the multipart option to be set to true (the default).
   * @type {Boolean}
   */
  singleFileUploads: true,
  allowMultiple: Ember.computed.not('singleFileUploads'),

  /**
   * To limit the number of files uploaded with one XHR request, set the following option to an integer greater than 0.
   * Note: This option is ignored if singleFileUploads is set to true or limitMultiFileUploadSize is set and the browser reports file sizes.
   * @type {Integer}
   */
  limitMultiFileUploads: undefined,

  /**
   * The following option limits the number of files uploaded with one XHR request to keep the request size under or equal to the defined limit in bytes.
   * Note: This option is ignored, if singleFileUploads is set to true.
   * @type {Integer}
   */
  limitMultiFileUploadSize: undefined,

  /**
   * Multipart file uploads add a number of bytes to each uploaded file, therefore the following option adds an overhead for each file used in the limitMultiFileUploadSize configuration.
   * @type {Integer}
   */
  limitMultiFileUploadSizeOverhead: 512,

  /**
   * Set this option to true to issue all file upload requests in a sequential order instead of simultaneous requests.
   * @type {Boolean}
   */
  sequentialUploads: false,

  /**
   * To limit the number of concurrent uploads, set this option to an integer value greater than 0.
   * Note: This option is ignored, if sequentialUploads is set to true.
   * @type {Integer}
   */
  limitConcurrentUploads: undefined,

  /**
   * Set this option to true to force iframe transport uploads, even if the browser is capable of XHR file uploads.
   * This can be useful for cross-site file uploads, if the Access-Control-Allow-Origin header cannot be set for the server-side upload handler which is required for cross-site XHR file uploads.
   * @type {Boolean}
   */
  forceIframeTransport: false,

  /**
   * Set this option to the location of a redirect url on the origin server (the server that hosts the file upload form), for cross-domain iframe transport uploads. If set, this value is sent as part of the form data to the upload server.
   * The upload server is supposed to redirect the browser to this url after the upload completes and append the upload information as URL-encoded JSON string to the redirect URL, e.g. by replacing the "%s" character sequence.
   * @type {String}
   */
  redirect: null,

  /**
   * The parameter name for the redirect url, sent as part of the form data and set to 'redirect' if this option is empty.
   * @type {String}
   */
  redirectParamName: null,

  /**
   * By default, XHR file uploads are sent as multipart/form-data.
   * The iframe transport is always using multipart/form-data.
   * If this option is set to false, the file content is streamed to the server url instead of sending a RFC 2388 multipart message for XMLHttpRequest file uploads.
   * Non-multipart uploads are also referred to as HTTP PUT file upload.
   * Note: Additional form data is ignored when the multipart option is set to false.
   * @type {Boolean}
   */
  multipart: true,

  /**
   * By default, failed (abort or error) file uploads are removed from the global progress calculation.
   * Set this option to false to prevent recalculating the global progress data.
   * @type {Boolean}
   */
  recalculateProgress: true,

  /**
   * The minimum time interval in milliseconds to calculate and trigger progress events.
   * @type {Integer}
   */
  progressInterval: 100,

  /**
   * The minimum time interval in milliseconds to calculate progress bitrate.
   * @type {Integer}
   */
  bitrateInterval: 500,

  /**
   * By default, files added to the widget are uploaded as soon as the user clicks on the start buttons. To enable automatic uploads, set this option to true.
   * @type {Boolean}
   */
  autoUpload: false,


  /**
   * Additional form data to be sent along with the file uploads can be set using this option, which accepts an array of objects with name and value properties, a function returning such an array, a FormData object (for XHR file uploads), or a simple object.
   * The form of the first fileInput is given as parameter to the function.
   * Note: Additional form data is ignored when the multipart option is set to false.
   * @type {Array, Object, function or FormData}
   */
  formData: null,

  /**
   * TODO Document this variable
   * @type {Array}
   */
  callbacks: [
    'add',
    'submit',
    'send',
    'done',
    'fail',
    'always',
    'progress',
    'progressall',
    'start',
    'stop',
    'change',
    'paste',
    'drop',
    'dragover',
    'chunksend',
    'chunkdone',
    'chunkfail',
    'chunkalways',
  ],


  /**
   * Computed property for the settings of the jQuery File Upload Plugin
   */
  settings: Ember.computed(
    'url',
    'type',
    'dataType',
    'dropZone',
    'fileInput',
    'paramName',
    'formAcceptCharset',
    'singleFileUploads',
    'limitMultiFileUploads',
    'limitFileUploadSize',
    'limitFileUploadSizeOverhead',
    'sequentialUploads',
    'limitConcurrentUploads',
    'forceIframeTransport',
    'initialIframeSrc',
    'redirect',
    'redirectParamName',
    'multipart',
    'maxChunkSize',
    'uploadedBytes',
    'recalculateProgress',
    'progressInterval',
    'bitrateInterval',
    'autoUpload',
  {
    get() {
      let settings = this.getProperties(
        'url',
        'type',
        'dataType',
        'dropZone',
        'fileInput',
        'paramName',
        'formAcceptCharset',
        'singleFileUploads',
        'limitMultiFileUploads',
        'limitFileUploadSize',
        'limitFileUploadSizeOverhead',
        'sequentialUploads',
        'limitConcurrentUploads',
        'forceIframeTransport',
        'initialIframeSrc',
        'redirect',
        'redirectParamName',
        'multipart',
        'maxChunkSize',
        'uploadedBytes',
        'recalculateProgress',
        'progressInterval',
        'bitrateInterval',
        'autoUpload'
      );

      // Handle form data
      if(this.attrs.formData) {
        settings.formData = this.attrs.formData;
      }

      // Compile the callbacks
      this.get('callbacks').forEach((callback) => {
        if(this.attrs[callback]) {
          settings[callback] = this.attrs[callback];
        }
      });

      // Look for the dropzone.
      if(this.get('dropZone') && typeof this.get('dropZone') === 'string') {
        if(this.get('debug')) {
          Ember.Logger.log(
            "%c%s#settings dropZone setup as %O",
            "color: purple", // http://www.w3schools.com/html/html_colornames.asp
            this.toString(),
            Ember.$(this.get('dropZone'))
          );
        }

        if(this.get('dropZone') === 'self') {
          this.set('dropZone', `#${this.get('elementId')}`);
        }

        settings.dropZone = Ember.$(this.get('dropZone'));
      }

      // Set some unchangeable settings
      settings.replaceFileInput = true;

      if(this.get('debug')) {
        console.log(
          "%c%s#settings: %O",
          "color: purple", // http://www.w3schools.com/html/html_colornames.asp
          this.toString(),
          settings
        );
      }

      return settings;
    }
  }),

  /**
   * Tracks the `disabled` value.
   */
  disabledTracker: Ember.observer('disabled',
    function() {
      Ember.run.once(this, 'checkDisabled');
    }
  ),

  /**
   * Initializes or destroys the cropper with the `disabled` options is changed.
   */
  checkDisabled() {
    if(this.get('disabled') === true) {
      this._setup();
    } else {
      this._teardown();
    }
  },

  /**
   * Perform any necessary initializations.
   */
  init() {
    this.super(...arguments);

    // Inject a copy of this component into the parent.
    this.set('parentController.fileuploadComponent', this);
  },

  /**
   * Initializes the jQuery File Upload plugin on the input element.
   */
  _setup() {
    // Prevent default document drag and drop behavior
    Ember.$(document).bind('drop dragover', function(e) {
      e.preventDefault();
    });

    if(this.get('enabled')) {
      this.$().fileupload(this.get('settings'));
    }
  },

  _teardown() {
    this.$().fileupload('destroy');
  },


  didInsertElement() {
    this._setup();
  },

  willDestroyElement() {
    this._teardown();
  },

  init() {
    this._super(...arguments);
    this.set('fileUploadComponent', this);
  },


  //////////////
  //! Actions //
  //////////////

  actions: {
    activateFileInput() {
      this.$('#' + this.get('elementId') + '-input').trigger('click');
    }
  }
});
