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
			this.seller = ''
		},
		buyerFocus: function() {
			this.buyer = ''
		},
		productFocus: function() {
			productId = ''
		},
	}

})
