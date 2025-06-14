module.exports = {
	future: {
		removeDeprecatedGapUtilities: true,
	},
	purge: [],
	theme: {
		extend: {
			width: {
				'1/10': '10%',
				'1/14': '7.14285715%',
				'1/7': '14.2857143%',
				'3/14': '21.42857145%',
				'2/7': '28.5714286%',
				'5/14': '35.71428575%',
				'3/7': '42.8571429%',
				'4/7': '57.1428571%',
				'5/7': '71.4285714%',
				'6/7': '85.7142857%',
			}
		},
	},
	variants: {},
	plugins: [
		require('@tailwindcss/custom-forms'),
	],
}
