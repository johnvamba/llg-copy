import React, { useState } from 'react';
import TemplateForm from './template-form';
import ReceiptList from './receipt-list';
import TemplateForm1 from './template-form-1';
import ReceiptTemplateV2 from './receipt-template-v2';
import OffersPlus from '../../../svg/offers-plus';


const ReceiptTemplate = () => {

    const [addTemplate, setAddTemplate] = useState(true);

    return(
        <>
            <section className="r-template">
                <header className="offers-create h-16 flex flex-row jutify-center items-center border-b bg-white px-12">
                    <div className="flex flex-1">
                        <h1>Receipt Template</h1>
                    </div>
                    <div className="flex flex-1 justify-end">
                        <button className="flex rounded-sm" onClick={() => setAddTemplate(true)}>
                            <OffersPlus />
                            <span>Add Template</span>
                        </button>
                    </div>
                </header>
                <section className="r-template__body">
                    {/* <TemplateForm /> */}
                    <ReceiptList />
                    {
                        // addTemplate && <ReceiptTemplateV2 />
                        // addTemplate && <TemplateForm1 />
                    }
                    
                </section>
            </section>
        </>
    )
}

export default ReceiptTemplate; 