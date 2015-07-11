import Ember from 'ember';
import layout from '../templates/components/ember-fileupload';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'form',
  classNames: ['ember-fileupload'],
  attributeBindings: ['disabled', 'enctype', 'type:method'],
  
  enctype: 'multipart/form-data',
  
  
  ////////////////
  //! Variables //
  ////////////////
  
  uploading: false,
  uploadProgress: 0,
  
  
  ///////////////
  //! Settings //
  ///////////////
  
  url: "",
  type: "POST",
  dataType: "json",
  
  dropZone: null,
  pasteZone: null,
  replaceFileInput: true,
  paramName: 'files[]',
  formAcceptCharset: 'utf-8',
  singleFileUploads: false,
  limitMultiFileUploads: undefined,
  limitFileUploadSize: undefined,
  limitFileUploadSizeOverhead: 512,
  sequentialUploads: false,
  limitConcurrentUploads: undefined,
  forceIframeTransport: false,
  redirect: null,
  redirectParamName: null,
  multipart: true,
  maxChunkSize: undefined,
  uploadedBytes: undefined,
  recalculateProgress: true,
  progressInterval: 100,
  bitrateInterval: 500,
  autoUpload: true,
  
  formParams: {},
  
  formData: function($form) {
    var that = this,
      formData = $form.serializeArray();
    
    formData.push({ name: 'paramName', value: that.get('paramName').replace(/\[\]/, '') });
    
    if(that.get('formParams')) {
      var formattedParams = [],
        formParams = that.get('formParams');
      
      for(var prop in formParams){
        if( !formParams.hasOwnProperty(prop) ){ continue; }
        
        formattedParams.push({ name: prop, value: formParams[prop] });
      }
      
      formData = formData.concat(formattedParams);
    }
    
    return formData;
  },
  
  fileInput: Ember.computed({
    get: function() {
      var that = this;
      
      return that.$('#' + that.get('elementId') + '-input');
    }
  }),
  
  
  ////////////////
  //! Callbacks //
  ////////////////
  
  add: null,
  submit: null,
  send: null,
  done: null,
  fail: null,
  always: null,
  progress: null,
  progressall: null,
  start: null,
  stop: null,
  change: null,
  paste: null,
  drop: null,
  dragover: null,
  chunksend: null,
  chunkdone: null,
  chunkfail: null,
  chunkalways: null,
  
  
  ///////////////
  //! Computed //
  ///////////////
  
  disabled: Ember.computed('uploading', {
    get: function(){
      var that = this;
      
      if(that.get('uploading')) {
        return true;
      } else {
        return false;
      }
    }
  }),
  
  settings: Ember.computed(
    'url',
    'type',
    'dataType',
    'dropZone',
    'pasteZone',
    'fileInput',
    'replaceFileInput',
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
    'formData',
  {
    get: function(){
      var that = this,
        settings = that.getProperties(
          'url',
          'type',
          'dataType',
          'dropZone',
          'pasteZone',
          'fileInput',
          'replaceFileInput',
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
      
      settings.formData = Ember.$.proxy(that.formData, that);
      
      var callbacks = [
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
      ];
      
      callbacks.forEach(function(callback) {
        if(that.get(callback)) {
          settings[callback] = Ember.$.proxy(that[callback], that);
        }
      });
      
      // Look for the dropzone.
      if(that.get('dropZoneClass')) {
        settings.dropZone = that.$('.' + that.get('dropZoneClass'));
      }
      
      /* */
      console.log(
        "%c%s#settings: %O",
        "color: purple", // http://www.w3schools.com/html/html_colornames.asp
        that.toString(),
        settings
      );
      //*/
      
      return settings;
    }
  }),
  
  
  /////////////
  //! Events //
  /////////////
  
  
  didInsertElement: function() {
    var that = this;
    
    that._setup();
  },
  
  willDestroyElement: function() {
    var that = this;
    
    that._teardown();
  },
  
  
  ////////////////
  //! Functions //
  ////////////////
  
  _setup: function() {
    var that = this;
    
    Ember.$(document).bind('drop dragover', function(e) {
      e.preventDefault();
    });
    
    if(that.get('dropzoneClickable')) {
      that.$('.' + that.get('dropZoneClass')).on('click', Ember.$.proxy(that._inputClickHandler, that));
    }
    
    that.$().fileupload(that.get('settings'));
  },
  
  _teardown: function() {
    var that = this;
    
    that.$('.' + that.get('dropZoneClass')).off('click');
    that.$().fileupload('destroy');
  },
  
  _inputClickHandler: function() {
    var that = this;
    
    that.$('#' + that.get('elementId') + '-input').trigger('click');
  }
});
