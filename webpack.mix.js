const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');

mix.js('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css')
    .postCss('resources/assets/css/general.css', 'public/css')
    .postCss('resources/assets/css/update-12042020.css', 'public/css')
    .js('resources/assets/canvasjs.min.js', 'public/assets')
    .js('resources/assets/canvasjs.react.js', 'public/assets')
    .options({
        processCssUrls: false,
        postCss: [tailwindcss('./tailwind.config.js')],
    });

mix.copyDirectory('node_modules/@fortawesome/fontawesome-free/webfonts', 'public/webfonts');

// mix.browserSync('neuma.test');