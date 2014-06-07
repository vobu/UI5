sap.ui.jsview("jsondate.Index", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf jsondate.Index
	*/ 
	getControllerName : function() {
		return "jsondate.Index";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf jsondate.Index
	*/ 
	createContent : function(oController) {
		
		console.log("original date is: " + new Date(1402166783294));
		
		// this comes from SAP NW Gateway
		var sJsonDate = "/Date(1402166783294)/";

		// Possibility 1
					/* just the timer, not relevant */ var start1 = new Date().getTime(); 
		var sNumber = sJsonDate.replace(/[^0-9]+/g,'');
		var iNumber = sNumber * 1; //trick seventeen
		var oDate = new Date(iNumber);
					/* just the timer, not relevant */ var end1 = new Date().getTime(); var dur1 = end1 - start1; console.log(dur1);
		
		var oDateTimeInput1 = new sap.m.DateTimeInput({
			dateValue: oDate,
			displayFormat: "MMM yyyy",
			valueFormat: "yyyy-MM-dd"
		});
		
		
		// Possibility 2
		
					/* just the timer, not relevant */ var start2 = new Date().getTime();
		/\/(.+)\//.exec(sJsonDate);
		var oDate1 = eval("new " + RegExp.$1);
					/* just the timer, not relevant */ var end2 = new Date().getTime(); var dur2 = end2-start2; console.log(dur2);
		
		var oDateTimeInput2 = new sap.m.DateTimeInput({
			dateValue: oDate1,
			displayFormat: "dd.MMM.yyyy",
			valueFormat: "yyyy-MM-dd"
		});
		
		
 		return new sap.m.Page({
			title: "JSON Model Date Formatting",
			content: [
			          oDateTimeInput1,
			          oDateTimeInput2
			]
		});
	}

});