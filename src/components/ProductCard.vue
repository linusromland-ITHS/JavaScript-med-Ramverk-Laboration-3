<script>
	import Button from './Button.vue';

	export default {
		name: 'ProductCard',
		components: {
			Button
		},
		props: {
			p_id: {
				type: String,
				required: true
			},
			p_name: {
				type: String,
				required: true
			},
			p_one_picture: {
				type: String,
				required: true
			},
			p_temperament: {
				type: String,
				required: true
			},
			p_price: {
				type: Number,
				required: true
			},
			p_images_arr: {
				type: Array,
				required: true
			},
			p_type: {
				type: String,
				required: true
			},
			p_description: {
				type: String,
				required: true
			},
			background: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			shorter_text_description() {
				if (this.p_description) {
					return this.p_description.substring(0, 165).trim() + '...';
				} else {
					return '';
				}
			},
			p_price_with_space() {
				// Visar pris snyggare (10000 blir 10 000)
				return this.p_price.toLocaleString();
			}
		},

		data() {
			return {
				//image_1: 'assets/products/' + this.p_id + '/0.jpg',
				img_src: 'assets/products/' + this.p_images_arr[0]
			};
		},

		created() {
			//alert("this.p_id \n"+ this.p_id);
			this.img_src = 'assets/products/' + this.p_images_arr[0];
		},

		methods: {
			go_to_details_view(id_) {
				this.$router.push({ path: '/product/' + id_ + '/' });
			},
			add_to_cart(id_, na_) {
				//Adds item to cart

				// 1 Fetch prev contents of localStorage (array)
				let cart;
				if (localStorage.getItem('petCart')) {
					cart = JSON.parse(localStorage.getItem('petCart'));
				} else {
					//alert("ls is empty");
					cart = {}; //sessionStorage.getItem('petCart');
				}

				//Check if product already exists in cart
				const alreadyInCart = cart[this.p_id] ? true : false;

				// 2
				// Adds current pet: { id : name}
				cart[id_] = na_;

				// 3 Set localStorage to the new object
				localStorage.setItem('petCart', JSON.stringify(cart));

				// 4 (Possibly) - inform about new contents (removed now)
				// this.displayCartContents();

				// UPDATE LABEL ON CART BUTTON - GERNERIC CALL
				this.$store.commit('updateNumInCartBasedOnLS');

				if (alreadyInCart) {
					// Add toast message to indicate product was already in cart
					this.$root.showToast({
						title: 'Varukorgen',
						message: `${this.p_name} fanns redan i din varukorg!`,
						type: 'info'
					});
				} else {
					// Add toast message to indicate product was added to cart
					this.$root.showToast({
						title: 'Varukorgen',
						message: `${this.p_name} har lagts till i din varukorg.`,
						type: 'success'
					});
				}
			},

			// Show contents (petCart) from Localstorage
			displayCartContents() {
				let fetched_cart = JSON.parse(localStorage.getItem('petCart'));
				let utarr = [];

				for (let i in fetched_cart) {
					utarr.push(i + ' (' + fetched_cart[i] + ')');
				}

				alert('Innehåll i petCart (i localStorage) nu:\n\n' + utarr.join('\n'));
			}
		}
	};
</script>
<template>
	<div @click="go_to_details_view(this.p_id)" :class="`card ${background ? 'background-change' : ''}`">
		<div class="image">
			<picture>
				<source :srcset="this.img_src" media="(max-width: 480px)" />
				<source :srcset="this.img_src" media="(max-width: 768px)" />
				<source :srcset="this.img_src" media="(max-width: 1500px)" />
				<img :srcset="this.img_src" style="max-width: 100%; max-height: 100%" alt="brutus" />
			</picture>
		</div>
		<div class="title">{{ p_name }}</div>
		<div class="text">{{ shorter_text_description }}</div>
		<div class="price">{{ p_price_with_space }}:-</div>
	</div>
	<Button class="btn" @click="add_to_cart(this.p_id, this.p_name)" :larger="true">lägg i varukorg</Button>
</template>

<style scoped>
	.card {
		width: 300px;
		height: 390px;
		max-height: 390px;
		background-color: #f0efee;
		color: antiquewhite;
		padding: 15px;
		margin-bottom: 5px;
		border-radius: 8px;
		border-style: none;

		cursor: pointer;
		transition: 0.3s ease-out;

		margin-left: auto;
		margin-right: auto;

		/*https://ui.glass/generator/ */
		/* backdrop-filter: blur(16px) saturate(180%);
		-webkit-backdrop-filter: blur(16px) saturate(180%);
		background-color: rgba(255, 255, 255, 0.75); */
	}

	/**
	* Sets gray transparent background to work better on ProductView.vue
	*/
	.background-change {
		background-color: #f0efee !important; /**Important is used to override .card options */
	}

	.card:hover {
		transform: scale(1.04);
	}

	.img-image {
		max-width: 100%;
		height: 165px;
		max-height: 165px;
		object-fit: cover;
		object-position: 100% 0;
		max-width: 100%;
		/* max-width: fit-content; */
	}
	img {
		border: 1px solid white;
	}

	.image {
		max-width: 100%;
		height: 165px;
		max-height: 165px;
		margin: auto;
		margin-top: 5px;
		margin-bottom: 5px;
		border-radius: 8px;
	}

	.title {
		height: 17.14px;
		font-family: 'Roboto Mono', monospace !important;
		font-style: normal;
		font-weight: normal;
		font-size: 23px;
		line-height: 18px;
		text-align: center;
		text-transform: uppercase;
		margin-top: 12px;
		margin-bottom: 12px;
		color: black;
	}

	.text {
		text-align: center;
		width: 98%;
		/* height: 50.4px; */

		font-family: 'Noto Serif';

		font-size: 14px;
		line-height: 20px;

		margin-bottom: 5px;
		color: black;
	}

	.price {
		bottom: 36px;
		position: absolute;
		width: 300px;
		height: 14.11px;
		font-family: 'Noto Mono', 'Roboto Mono', monospace;
		font-style: normal;
		font-weight: normal;
		font-size: 21px;
		text-align: center;
		margin-bottom: 5px;
		color: black;
	}

	/* .cart-button {
		width: 200px;
		height: 42px;

		background: #faac77;
		border-radius: 8px;
		margin-top: 5px;

		font-family: Roboto Mono;
		font-style: normal;
		font-weight: normal;
		font-size: 9px;
		line-height: 12px;
		text-align: center;
		text-transform: uppercase;

		color: #f0efee;
		border: none;
	} */

	.btn {
		text-transform: uppercase;
		margin-top: 9px;
	}
</style>
