import React from 'react';
import TemplateForm from './template-form';
import OffersPlus from '../../../svg/offers-plus';


const ReceiptTemplate = () => {
    return(
        <>
            <section className="r-template">
                <header className="offers-create h-16 flex flex-row jutify-center items-center border-b bg-white px-12">
                    <div className="flex flex-1">
                        <h1>Receipt Template</h1>
                    </div>
                    <div className="flex flex-1 justify-end">
                        <button className="flex rounded-sm">
                            <OffersPlus />
                            <span>Add Template</span>
                        </button>
                    </div>
                </header>
                <section className="r-template__body">
                    <TemplateForm />
                </section>
            </section>
        </>
    )
}

export default ReceiptTemplate;