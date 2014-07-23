
/**
 * @fileoverview The demo application for goog.ui.AutoComplete.Nominatim.
 *
 * @author petr.pridal@klokantech.com (Petr Pridal)
 *
 * Copyright 2011 Klokan Technologies Gmbh (www.klokantech.com)
 */

goog.provide('nominatim.main');

goog.require('goog.array');
goog.require('goog.debug.Console');
goog.require('goog.debug.DivConsole');

goog.require('goog.debug.ErrorHandler');

goog.require('goog.debug.LogManager');
goog.require('goog.debug.Logger');
goog.require('goog.dom');
goog.require('goog.ui.ac.AutoComplete.EventType');
goog.require('goog.ui.ac.Nominatim');
goog.require('goog.events');


/**
 * Demo application for goog.ui.ac.Nominatim. Main function.
 */
nominatim.main = function() {
  // Initialize logger
  var logger = goog.debug.Logger.getLogger('nominatim');
  var logconsole = new goog.debug.Console();
  logconsole.setCapturing(true);

  var input = /** @type {!Element} */
      (goog.dom.getElement('q'));
  var ac = new goog.ui.ac.Nominatim(input);

  // the action which should be done on the selected item
  var run_action = function(item) {
    logger.info('DISPLAY: ' + item['lat'] + ',' + item['lon'] + ' -- ' +
        item['boundingbox'].toString());
    goog.dom.getElement('searchform').submit();
  }

  goog.events.listen(ac, goog.ui.ac.AutoComplete.EventType.UPDATE, function(e) {
    logger.info('SELECT: ' + e.row['display_name']);
    run_action(e.row);  
  });
};

goog.exportSymbol('autocomplete', nominatim.main);
