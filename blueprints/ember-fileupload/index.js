module.exports = {
  description: '',

  normalizeEntityName(entityName) {
    return entityName;
  },

  afterInstall() {
    return this.addBowerPackagesToProject([
      { name: 'jquery-file-upload' }
    ]);
  }
};
