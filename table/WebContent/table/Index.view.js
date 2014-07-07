sap.ui.jsview("table.Index", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf table.Index
	*/ 
	getControllerName : function() {
		return "table.Index";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf table.Index
	*/ 
	createContent : function(oController) {
		// message toast library
		jQuery.sap.require("sap.m.MessageToast");
		
		//consume OData model as JSON
		var sUrl = "http://services.odata.org/V2/Northwind/Northwind.svc";
		var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
		
		// cells
		var oName = new sap.m.Text({text: "{ProductName}"});
		var oQty = new sap.m.Text({text: "{QuantityPerUnit}"});
		var oPrice = new sap.m.Text({text: "{UnitPrice}"});
		
		// row template
		var oRow = new sap.m.ColumnListItem();
		oRow.addCell(oName).addCell(oQty).addCell(oPrice);
		
		// columns
		var oColName = new sap.m.Column({header: new sap.m.Text({text:"Product Name"}) });
		var oColDesc = new sap.m.Column({header: new sap.m.Text({text:"Quantity per Unit"}) });
		var oColPrice = new sap.m.Column({header: new sap.m.Text({text:"Unit Price"}) });
		
		// table
		var oTab = new sap.m.Table("oTab");
		oTab.addColumn(oColName).addColumn(oColDesc).addColumn(oColPrice);
		
		// handler for selected row(s)
		oTab.attachSelectionChange(function(oEvent) {
			var oSelectedItem = oEvent.getParameter("listItem");
			var sTableMode = oSelectedItem._mode;
			var sItemName = oSelectedItem.getBindingContext().getProperty("ProductName");
			
			sap.m.MessageToast.show("Selected: " + sItemName + "\nin mode: " + sTableMode);
		});
		
		// handler for click on delete icon
		oTab.attachDelete(function(oEvent) {
			var oSelectedItem = oEvent.getParameter("listItem");
			var sItemName = oSelectedItem.getBindingContext().getProperty("ProductName");
			
			sap.m.MessageToast.show("Deleted: " + sItemName);
		});
		
		// buttons for switching table mode
		var oDelBtn = new sap.m.Button({
			icon:"sap-icon://delete",
			text: sap.m.ListMode.Delete,
			type: sap.m.ButtonType.Reject 
		}).attachPress(function(oEvent) { 
				sap.ui.getCore().byId("oTab").setMode(sap.m.ListMode.Delete);
				oController.setTextTableMode(sap.m.ListMode.Delete);
			}
		);
		
		var oMultiBtn = new sap.m.Button({
			icon:"sap-icon://multi-select",
			text: sap.m.ListMode.MultiSelect,
			type: sap.m.ButtonType.Emphasized 
		}).attachPress(function(oEvent) { 
				sap.ui.getCore().byId("oTab").setMode(sap.m.ListMode.MultiSelect);
				oController.setTextTableMode(sap.m.ListMode.MultiSelect);
			}
		);
		
		
		var oSelBtnR = new sap.m.Button({
			icon:"sap-icon://sys-enter",
			iconFirst: false,
			text: sap.m.ListMode.SingleSelect,
			type: sap.m.ButtonType.Accept,
		}).attachPress(function(oEvent) { 
				sap.ui.getCore().byId("oTab").setMode(sap.m.ListMode.SingleSelect);
				oController.setTextTableMode(sap.m.ListMode.SingleSelect);
			}
		);
		
		var oSelBtnL = new sap.m.Button({
			icon:"sap-icon://sys-enter",
			text: sap.m.ListMode.SingleSelectLeft,
			type: sap.m.ButtonType.Accept
		}).attachPress(function(oEvent) { 
				sap.ui.getCore().byId("oTab").setMode(sap.m.ListMode.SingleSelectLeft);
				oController.setTextTableMode(sap.m.ListMode.SingleSelectLeft);
			}
		);
		
		var oSelBtnM = new sap.m.Button({
			icon:"sap-icon://complete",
			text: sap.m.ListMode.SingleSelectMaster,
			type: sap.m.ButtonType.Accept
		}).attachPress(function(oEvent) { 
				sap.ui.getCore().byId("oTab").setMode(sap.m.ListMode.SingleSelectMaster);
				oController.setTextTableMode(sap.m.ListMode.SingleSelectMaster);
			}
		);
		
		var oBtnNone = new sap.m.Button({
			icon:"sap-icon://decline",
			text: sap.m.ListMode.None,
			type: sap.m.ButtonType.Transparent 
		}).attachPress(function(oEvent) { 
				sap.ui.getCore().byId("oTab").setMode(sap.m.ListMode.None);
				oController.setTextTableMode(sap.m.ListMode.None);
			}
		);
		
		// table header toolbar
		var oToolbar = new sap.m.Toolbar({active: true});
		var oHBox = new sap.m.HBox({ width: "100%", justifyContent: sap.m.FlexJustifyContent.SpaceBetween });
		oHBox.addItem(oDelBtn).addItem(oMultiBtn).addItem(oSelBtnR).addItem(oSelBtnL).addItem(oSelBtnM).addItem(oBtnNone);
		oToolbar.addContent(oHBox);
		oTab.setHeaderToolbar(oToolbar);

		// bind oModel items with row template to table
		oTab.setModel(oModel);
		oTab.bindItems("/Products", oRow, new sap.ui.model.Sorter("ProductName"));
		
		// show table mode in subheader
		var oTableMode = new sap.m.Text("oTableMode");
		oController.setTextTableMode(sap.ui.getCore().byId("oTab").getMode());
		
 		return new sap.m.Page({
			title: "sap.m.Table",
			subHeader: new sap.m.Bar( {contentLeft: oTableMode} ),
			content: [
			          oTab
			]
		});
	}

});