import Cookie from 'js-cookie';
import { setupCache } from 'axios-cache-adapter'

window._ = require('lodash');

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

try {
    window.Popper = require('popper.js').default;
    window.$ = window.jQuery = require('jquery');

    require('bootstrap');
} catch (e) {}

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

let token = Cookie.get('oToken_admin') || Cookie.get('oToken_org_admin');

//Cache machine for data. 
window.cache = setupCache({
    maxAge: 15 * 60 * 1000, //15 minutes
    invalidate: async (config, request) => {
        // console.log("Attempt invalidate", config, request)
      if (request.clearCacheEntry || request.method != 'get') {
        await config.store.removeItem(config.uuid)
      }
    }
    // readHeaders: true
})
window.api = axios.create({
    adapter: cache.adapter,
})

if (token) {
    const arr = [axios, api].map(i=>{
        i.interceptors.request.use(
            config => {
                config.headers.common['Authorization'] = `Bearer ${token}`

                return config;
            }, 
            error => {
                return Promise.reject(error);
            }
        );

        i.interceptors.response.use(
            function(response) {
                return response;
            },
            function(error) {
                if(401 === error.response.status) {
                    logout();
                } else {
                    return Promise.reject(error);
                }
            }
        );
    })
}



const logout = async() => {
    if(Cookie.get("oToken_admin")){
        Cookie.set("oToken_admin", "")
    } else if (Cookie.get("oToken_org_admin")) {
        Cookie.set("oToken_org_admin", "")
    }

    window.location = '/login';
}

/*
// To use
  api({ ...options}).then().catch()
  or
  api.get() or post().then().catch()  

*/


/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo';

// window.Pusher = require('pusher-js');


// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     encrypted: true,
//     forceTLS: true,
//     auth
// });
