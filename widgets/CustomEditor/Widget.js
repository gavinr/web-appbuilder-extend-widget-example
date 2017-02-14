import declare from 'dojo/_base/declare';
import on from 'dojo/on';
import aspect from 'dojo/aspect';
import Point from 'esri/geometry/Point';
import Polygon from 'esri/geometry/Polygon';
import GeometryEngine from 'esri/geometry/geometryEngine';
import webMercatorUtils from 'esri/geometry/webMercatorUtils';

// Include the OOTB Widget's styles:
import css from 'xstyle/css!widgets/Edit/css/style.css';
// Include the OOTB Widget's NLS strings:
import nls from 'dojo/i18n!widgets/Edit/nls/strings';

// include a copy of the OOTB Editor widget (but never touch these files!):
import EditorWidget from 'widgets/Edit/Widget';

export default declare([EditorWidget], {

  baseClass: 'custom-editor',

  startup() {
    this.nls = nls;
    this.inherited(arguments);
  },

  // example adding custom functionality to the OOTB Editor widget
  _createEditor() {
    // call "this.inherited" to call the "_createEditor" in the original OOTB widget.
    this.inherited(arguments);
    // now that we've called "This.inherited", we can do our own thing:
    on(this.editor.editToolbar, 'activate', (evt) => {
      // copy the geometry and save for later (deactivate) if we need it:
      this.currentGeometry = new Point(evt.graphic.geometry.toJson());
    });
    on(this.editor.editToolbar, 'deactivate', (evt) => {
      // if the final dropped point is not in St. Louis,
      // move the point back to the original point (this.currentGeometry)
      if(!this._geometryInsideStLouis(evt.graphic.geometry)) {
        evt.graphic.geometry = this.currentGeometry;
        this.currentGeometry = false;
      }
    });
  },

  // returns true if the input geometry is in St. Louis
  // false otherwise
  _geometryInsideStLouis(geometry) {
    if(geometry) {
      const stlBoundary = new Polygon({"rings":[[[-90.36007676894046,38.826327098065676],[-90.25158677870604,38.846651579938495],[-90.14584337050289,38.77388454669628],[-90.20626817519042,38.74604221688868],[-90.18841539198728,38.671028118910016],[-90.28042589003418,38.48099870415093],[-90.33810411269044,38.41001166427751],[-90.67456041151871,38.65065357062876],[-90.36007676894046,38.826327098065676]]],"spatialReference":{"wkid":4326}});
      return GeometryEngine.intersects(webMercatorUtils.geographicToWebMercator(stlBoundary), geometry);
    }
    return false;
  }
});
