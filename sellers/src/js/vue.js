new Vue({
	el: '#form',
	data: {
		notSubmitted: true,
		scan: false,

		company: "Company Name",
		company_default: "Company Name",

		productId: "Product ID",
		productId_default: "Product ID",
		passphrase: "Passphrase",
		passphrase_default: "Passphrase",
	},

	methods: {
		companyFocus: function() {
			this.company = '';
		},
		productFocus: function() {
			this.productId = '';
		},
		passphraseFocus: function() {
			this.passphrase = '';
		},

		companyFocusOut: function() {
			this.company = this.company_default;
		},
		productFocusOut: function() {
			this.productId = this.productId_default;
		},
		passphraseFocusOut: function() {
			this.passphrase = this.passphrase_default;
		},
	}

})
