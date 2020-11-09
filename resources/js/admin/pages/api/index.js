import { defaultModifiers } from '@popperjs/core/lib/popper-lite';
import React from 'react';
import ApiHeader from './header';
import ApiList from './list';

import './api.css';

const Api = () => {
    return(
        <>
            <section>
                <ApiHeader />
                <ApiList />
            </section>
        </>
    )
}


export default Api;