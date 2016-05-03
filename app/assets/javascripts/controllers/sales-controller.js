(function () {
  'use strict';

  var app = angular.module('store');

  // HOME CONTROLLER
  app.controller("SalesController", ['Restangular', '$scope', '$resource', '$route', '$routeParams', '$location', 'Flash', 'StoreNowDataService', function(Restangular, $scope, $resource, $route, $routeParams, $location, Flash, StoreNowDataService) {
    $scope.sale_items = [];
    $scope.detailed_sale = {};
    $scope.tabSelected = 'ventas';
    $scope.selectedCustomer = '';
    $scope.selectedPayment = 'efectivo';
    $scope.search_customer = '';

    //Helpers
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $scope.selectPayment = function(payment){
      $scope.selectedPayment = payment;
    };

    $scope.isSaleCompleted = function(status){
      return status === "completed"
    }

    $scope.isSaleDraft = function(status){
      return status === "draft"
    }

    $scope.assignSale = function(sale){
      $scope.detailed_sale = sale;
    }

    $scope.getStatus = function(status){
      var s = "";
      if(status === 'completed'){
        s = "Completada";
      }else if(status === 'draft'){
        s = "Borrador"
      }
      return s;
    }

    $scope.getIndex = function(arr, o){
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].name == o.name && arr[i].price.replace(/[^0-9]/g, '') == o.price.replace(/[^0-9]/g, '')) {
          return i;
        }
      }        
      return -1;
    };

    $scope.getSubtotal = function(saleItem){
      var subtotal = 0;

      if(saleItem.quantity != 0){
        subtotal = saleItem.quantity * saleItem.price;
      };

      return subtotal;
    };

    $scope.getTotal = function(){
      var total = 0;
      for(var i = 0; i < $scope.sale_items.length; i++){
          var sale_item = $scope.sale_items[i];
          total += (sale_item.price.replace(/[^0-9]/g, '') * sale_item.quantity);
      }
      return total;
    };

    $scope.getDetailTotal = function(items){
      var total = 0;

      if(items){
        for(var i = 0; i < items.length; i++){
            var sale_item = items[i];
            total += (sale_item.price.replace(/[^0-9]/g, '') * sale_item.quantity);
        }
      }        
      return total;
    };

    $scope.toNumber = function(num){
      var n = parseInt(num);
      return n;
    };

    $scope.selectCustomer = function(customer){
      $scope.selectedCustomer = customer;
      console.log($scope.selectedCustomer);
    };

    $scope.fillSaleItems = function(items){
      $scope.sale_items = [];
      for (var i = 0; i < items.length; i++) {
        var formatedPrice = items[i].price.replace(/[^0-9]/g, '')
        $scope.sale_items.push({name:items[i].name, price:formatedPrice, quantity:items[i].quantity, base_price:formatedPrice});
      };
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
    //TABS
    $scope.selectTab = function(tab){
      $scope.tabSelected = tab;
    };

    //DATABASE
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $scope.getCustomers = function(){
      StoreNowDataService.getCustomers().getList().then(function(response) {
        $scope.customers = response.plain();
      });  
    };

    $scope.addItemToSale = function(item){
      if($scope.getIndex($scope.sale_items, item) === -1 || item.name === "Tatuaje"){
        var formatedPrice = item.price.replace(/[^0-9]/g, '')
        $scope.sale_items.push({name:item.name, price:formatedPrice, quantity:item.quantity, base_price:formatedPrice});
      }else{
        var i = $scope.getIndex($scope.sale_items, item);
        $scope.sale_items[i].quantity +=1;
      };        
    };

    $scope.saveSale = function(sale_items, tot, status){
      var items = angular.toJson(sale_items);
      $scope.sale = {total:tot, items:sale_items, status:status, customer_id: $scope.selectedCustomer.id, payment: $scope.selectedPayment};
      StoreNowDataService.saveSale($scope.sale).then(function(response) {
          $scope.getSales();
          $scope.selectedCustomer = '';
          $scope.selectedPayment = 'efectivo';
          $scope.sale_items = [];
      });
    };

    $scope.getSales = function(){
      StoreNowDataService.getSales().get().then(function(response) {
          $scope.sales = response.plain();
          $scope.detailed_sale = $scope.sales[0];
      });
    };

    $scope.getItems = function(){
      StoreNowDataService.getItems().get().then(function(response) {
        $scope.items = response.plain();
      });
    };

    //PAGE
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $scope.removeSaleItem = function(index){
      $scope.sale_items.splice(index, 1);
    };

    // Key BINDING
    var listener = new window.keypress.Listener();
    $scope.assignKeys = function(){
      listener.simple_combo("v", function() {
        $('#new-sale-button').click();
      });
    };

    $scope.unassignKeys = function(){
      listener.unregister_combo("v");
    };
    // Call basic functions
    $scope.assignKeys();
  }]);//END OF HEADER CONTROLLER

}());