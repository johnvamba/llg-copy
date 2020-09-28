const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');

mix.react('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css')
    .js('resources/assets/canvasjs.min.js', 'public/assets')
    .js('resources/assets/canvasjs.react.js', 'public/assets')
    .options({
        processCssUrls: false,
        postCss: [tailwindcss('./tailwind.config.js')],
    });

mix.copyDirectory('node_modules/@fortawesome/fontawesome-free/webfonts', 'public/webfonts');

mix.browserSync('30379fbabe01.ngrok.io');