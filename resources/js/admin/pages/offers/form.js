import React, { useState, useEffect } from 'react';
import OffersFormCross from '../../../svg/offers-form-cross';
// import FormSelectCategory from './form-select-category';
import FormServiceInfo from './form-service-info';
import FormBusinessInfo from './form-business-info';
import CategoryGrid from '../../../components/CategoryGrid'

const OffersForm = ({setShowForm, data, handleForm}) => {
    const editing = data.id ? true : false;
    //form state
    const [countTab, setCountTab] = useState(1);
    //form fields
    const [category, setCategory] = useState([]);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [location, setLocation] = useState({});
    const [photo, setImage] = useState(null);
    const [busName, setBusName] = useState('');
    const [busSite, setBusSite] = useState('');
    const [busContact, setBusContact] = useState('');
    //validators
    const [errors, setErrors] = useState({});
    //loaders and submit
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        //change form fields here
    }, [data])

    const handleCategories = (item, truth = false) => {0
        setCategory(truth ? [] : [item]);
    }

    const updateService = ({title, desc, location, photo}) => {
        // console.log('added?', title, desc, location, photo);
        setTitle(title)
        setDesc(desc)
        setLocation(location)
        setImage(photo)
    }

    const updateBusiness = ({busName, busSite, busContact}) => {
        setBusName(busName)
        setBusSite(busSite)
        setBusContact(busContact)
    }

    const showTabTitle = () => {
        if(editing)
            return '';
        switch(countTab){
            case 1:
            return <h3>Select Category</h3>
            case 2:
            return <h3>Service Information</h3>
            case 3:
            return <h3>Business Information</h3>
            default:
            return '';
        }
    }
    const validateTab = (newCount) => {
        let set = {} 
        if(newCount > countTab)
            switch(countTab){
                case 1:
                if(category.length <= 0){
                    setErrors({
                        ...errors,
                        category: 'Missing Category'
                    })
                    return;
                } else {
                    delete errors.category
                    setErrors({...errors})
                }
                break;
                case 2:
                set = {
                    title: title == '' ? 'Missing title' : null,
                    desc: desc == '' ? 'Missing title' : null,
                    photo: photo == null ? 'Missing photo' : null,
                    location: _.isEmpty(location)
                }
                if(Object.values(set).filter(i=>i).length > 0){
                    setErrors({
                        ...errors,
                        ...set
                    })
                    return;
                } else {
                    delete errors.title;
                    delete errors.desc;
                    delete errors.photo;
                    delete errors.location;
                    setErrors({...errors});
                }
                break;
                case 3:
                set = {
                    busName: busName == '' ? 'Missing business name' : null,
                    busContact: busContact == '' ? 'Missing business contract' : null
                }
                if(Object.values(set).filter(i=>i).length > 0){
                    setErrors({
                        ...errors,
                        ...set
                    })
                    return;
                } else {
                    delete errors.busName;
                    delete errors.busContact;
                    setErrors({...errors});
                }
                break;
            }

        setCountTab(newCount)
    }

    const submit = () => {
        setSubmitting(true)
        const submitPromise = !data.id ? 
            api.post(`/api/web/offers`, {
                title,
                category,
                location,
                busName,
                busSite,
                busContact,
                photo: files.length > 0 ? photo : null,
                description: desc || ''
            }) : 
            api.update(`/api/web/offers/${data.id}`, {
                params: {
                    title,
                    category,
                    location,
                    busName,
                    busSite,
                    busContact,
                    photo: files.length > 0 ? photo : null,
                    description: about || bring || ''
                }
            })

        submitPromise.then(({data})=>{
            setSubmitting(false)
            handleForm(false, 'submit', data.data);
        }).catch(err=>{
            // console.log('error', err, err.response)
            if(err.response){
                const { data } = err.response
                setErrors(data.errors || [])
            }
            setSubmitting(false)
        })
    }

    return (
        <div className="offers-create-form">
            <div className="offers-create-form__header">
                <h2>{editing ? 'Edit' : 'Create'} Offer</h2>
                {
                    !editing &&
                    <div className="relative pt-1">
                        <div className="w-full bg-gray-400 rounded-full">
                            <div className={`bg-blue-400 rounded-full leading-none py-1 text-white tab-${countTab}`}></div>
                        </div>
                        <p>{countTab} of 3</p>
                    </div>
                }
                <button className="offers-create-form__close" type="button" onClick={()=>setShowForm(false)}>
                    <OffersFormCross />
                </button>
            </div>
            {
                editing && <div className="offer-edit__opts">
                    <ul>
                        <li className={"offer-edit__opts-item w-1/3 " + (countTab == 1 ? 'offer-edit__opts-item--active' : '')} onClick={()=>validateTab(1)}><h3>Select Category</h3></li>
                        <li className={"offer-edit__opts-item w-1/3 " + (countTab == 2 ? 'offer-edit__opts-item--active' : '')} onClick={()=>validateTab(2)}><h3>Service Information</h3></li>
                        <li className={"offer-edit__opts-item w-1/3 " + (countTab == 3 ? 'offer-edit__opts-item--active' : '')} onClick={()=>validateTab(3)}><h3>Business Information</h3></li>
                    </ul>
                </div>
            }
            
            <div className="offers-create-form__body">
                {showTabTitle()}
                { countTab == 1 && <CategoryGrid selectedCategories={category} handleCategories={handleCategories} errors={errors.category}/>}
                { countTab == 2 && <FormServiceInfo service={{title, desc, location, photo}} updateService={updateService} errors={errors}/>}
                { countTab == 3 && <FormBusinessInfo service={{busName, busSite, busContact}} updateBusiness={updateBusiness} errors={errors}/>}
            </div>

             <section className="offers-category-opt">
                <div className="offers-category-opt__container flex">
                    <button className="discard" onClick={()=>setShowForm(false)}>Discard</button>
                    {
                        editing ? <button className="next" onClick={()=>setShowForm(false)}>Submit</button> 
                        : <div>
                            {
                                countTab > 1 &&
                                <button className="back" onClick={() => validateTab(countTab-1)}>Back</button>
                            }
                            {
                                (countTab < 3) 
                                ? (<button className="next" onClick={() => validateTab(countTab+1)}>Next</button>)
                                : (<button className="next">Create</button>)
                            }
                        </div>
                    }
                </div>
            </section>
        </div>
    )
}

export default OffersForm;