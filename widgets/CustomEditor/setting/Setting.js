import serviceUtils from 'builder/serviceUtils';
import declare from 'dojo/_base/declare'
import ParentSetting from '/webappbuilder/stemapp/widgets/Edit/setting/Setting.js';
import ParentNLS from 'dojo/i18n!stemapp/widgets/Edit/setting/nls/strings.js'


export default declare([ParentSetting], {
  postMixInProperties: function() {
    this.nls = ParentNLS;
    serviceUtils.copyWidgetToApp(window.appInfo.id, 'Edit');
    this.inherited(arguments);
  }
});
