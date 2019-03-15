new Vue({
	el: '#form',
	data: {
		seller: "Seller Company",
		buyer: "Buyer Company",
		productId: "Product ID",
		passphrase: "Passphrase",
		passphraseOnFocus: true
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
		passphraseFocus: function() {
			this.passphrase = '';
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
		passphraseFocusOut: function() {
			this.passphrase = this.passphrase_default;
		},
	}

})
