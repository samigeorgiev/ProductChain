new Vue({
	el: '#fields',
	data: {
		seller: "Seller Company",
		seller_default: "Seller Company",
		buyer: "Buyer Company",
		buyer_default: "Buyer Company",
		productId: "Product ID",
		productId_default: "Product ID"
	},

	methods: {
		sellerFocus: function() {
			this.seller = '';
		},
		buyerFocus: function() {
			this.buyer = '';
		},
		productFocus: function() {
			this.productId = '';
		},

		sellerFocusOut: function() {
			this.seller = this.seller_default;
		},
		buyerFocusOut: function() {
			this.buyer = this.buyer_default;
		},
		productFocusOut: function() {
			this.productId = this.productId_default;
		},
	}

})
