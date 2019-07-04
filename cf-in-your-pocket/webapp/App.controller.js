sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/odata/v4/ODataModel"
], function (Controller, JSONModel, ODataModel) {
	"use strict";
	return Controller.extend("Quickstart.App", {

		onInit : function () {
			this.getView().setModel(new JSONModel({
					features: [
						"Enterprise-Ready Web Toolkit",
						"Powerful Development Concepts",
						"Feature-Rich UI Controls",
						"Consistent User Experience",
						"Free and Open Source",
						"Responsive Across Browsers and Devices"
					]
				})
			);

			this.getView().setModel(new ODataModel({
				"serviceUrl": "/backend/",
				"autoExpandSelect": true,
				"operationMode": "Server",
				"groupId": "$direct",
				"synchronizationMode": "None"
			}), "Backend")
		},

		onChange: function (oEvent) {
			var bState = oEvent.getParameter("state");
			this.byId("ready").setVisible(bState);
		}

	});
});
