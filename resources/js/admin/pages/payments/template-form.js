import React from 'react';


const TemplateForm = () => {
    return(
        <div class="flex mb-4">
            <div class="payment-r-template__left tab__content w-1/2">
                <header>
                    <div className="image"></div>
                    <div>
                        <button>Upload Photo</button>
                        <p>Images should be atleast 300 x 300 px in pngo or jpeg file</p>
                    </div>
                </header>
                <form>
                    <div className="w-full xl:w-full px-2">
                        <div className="form-group form-input-text">
                            <label>Surname</label>
                            <input
                                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 leading-tight focus:outline-none"
                                type="text"
                                placeholder="Enter Surname"
                            />
                        </div>
                    </div>
                </form>
            </div>
            <div class="payment-r-template__left  w-1/2 bg-gray-400 h-12"></div>
        </div>
    )
}

export default TemplateForm;