// $Id$

/**
 * Baseclass for all free-text widgets.
 *
 * @class AbstractTextWidget
 * @augments AjaxSolr.AbstractWidget
 */
AjaxSolr.AbstractTextWidget = AjaxSolr.AbstractWidget.extend(
  /** @lends AjaxSolr.AbstractTextWidget.prototype */
  {
  /**
   * Sets the main Solr query to the given string.
   *
   * @param {String} q The new Solr query.
   * @returns {Boolean} Whether the selection changed.
   */
  set: function (q) {
    return this.changeSelection(function () {
      this.manager.store.get('q').val(q);
    });
  },

  /**
   * Sets the main Solr query to the empty string.
   *
   * @returns {Boolean} Whether the selection changed.
   */
  clear: function () {
    return this.changeSelection(function () {
      this.manager.store.get('q').val('');
    });
  },

  /**
   * Helper for selection functions.
   *
   * @param {Function} Selection function to call.
   * @returns {Boolean} Whether the selection changed.
   */
  changeSelection: function (func) {
    var before = this.manager.store.get('q').val();
    func.apply(this);
    var after = this.manager.store.get('q').val();
    if (after !== before) {
      this.afterChangeSelection(after);
    }
    return after !== before;
  },

  /**
   * An abstract hook for child implementations.
   *
   * <p>This method is executed after the main Solr query changes.</p>
   *
   * @param value The current selection.
   */
  afterChangeSelection: function (value) {},

  /**
   * Returns a function to unset the main Solr query.
   *
   * @returns {Function}
   */
  unclickHandler: function () {
    var me = this;
    return function () {
      if (me.clear()) {
        me.manager.doRequest(0);
      }
      return false;
    }
  },

  /**
   * Returns a function to set the main Solr query.
   *
   * @param value The new Solr query.
   * @returns {Function}
   */
  clickHandler: function (q) {
    var me = this;
    return function () {
      if (me.set(q)) {
        me.manager.doRequest(0);
      }
      return false;
    }
  }
});
