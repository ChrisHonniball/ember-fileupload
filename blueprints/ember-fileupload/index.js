module.exports = {
  description: '',

  normalizeEntityName: function(entityName) {
    return entityName;
  },

  afterInstall: function() {
    var that = this;
    
    return that.addBowerPackagesToProject([
      { name: 'jquery-file-upload' },
    ]);
  }
};
