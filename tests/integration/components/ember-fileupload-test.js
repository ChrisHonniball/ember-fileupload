import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('ember-fileupload', 'Integration | Component | ember fileupload', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ember-fileupload}}`);

  assert.equal(this.$().text(), '');

  // Template block usage:
  this.render(hbs`
    {{#ember-fileupload}}
      template block text
    {{/ember-fileupload}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
