import React, { useState, useEffect } from 'react';
import OffersFormCross from '../../../svg/offers-form-cross';
import { swalSuccess, swalError } from '../../../components/helpers/alerts';

// import FormSelectCategory from './form-select-category';
import FormServiceInfo from './form-service-info';
import FormBusinessInfo from './form-business-info';
import CategoryGrid from '../../../components/CategoryGrid'
import LoadingScreen from '../../../components/LoadingScreen'
import { volunteer } from '../needs/categorylist';

const OffersForm = ({setShowForm, data, handleForm}) => {
    const editing = data.id ? true : false;
    //form state
    const [countTab, setCountTab] = useState(1);
    //form fields
    const [category, setCategory] = useState({});
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [address, setAddress] = useState('');
    const [location, setLocation] = useState({});
    const [photo, setImage] = useState(null);
    const [business_name, setBusName] = useState('');
    const [business_site, setBusSite] = useState('');
    const [business_contact, setBusContact] = useState('');
    //validators
    const [files, setFiles] = useState([])// for checking
    const [errors, setErrors] = useState({});
    //loaders and submit
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        //change form fields here
        if(data.id) {
            loadOffer()            
        } else {
            setTitle('')
            setDesc('')
            setImage(null)
            setBusName('')
            setBusSite('')
            setBusContact('')
            setFiles([])
            setAddress('')
            setLocation({})
            setCategory({})
            setSubmitting(false)
            setLoading(false)
        }
    }, [data])

    const loadOffer = (clearCoche = false) => {
        setLoading(true)
        api.get(`/api/web/offers/${data.id}`)
        .then(({ data })=>{
            const { title, type, photo, description, location, lat, lng, business_name, business_site, business_contact, address} = data.data
            setTitle(title || '')
            setDesc(description || '')
            setImage(photo || null)
            setBusName(business_name || '')
            setBusSite(business_site || '')
            setBusContact(business_contact || '')
            setLocation(location ? { location, lat, lng} : {})
            setAddress(address)
            setCategory(type ? volunteer.find(i => i.name == type) : {})
            setErrors({})
            setLoading(false)
        })
    }

    const handleCategories = (item, truth = false) => {0
        setCategory(item);
    }

    const removeError= (name = '') => {
        delete errors[name]
        setErrors(errors)
    }

    const updateService = ({title, desc, location, photo, address}) => {
        setTitle(title)
        setDesc(desc)
        setLocation(location)
        setImage(photo)
        setAddress(address)
        if(title !== '')
            delete errors.title
        if(desc !== '')
            delete errors.desc
        if(_.isEmpty(location))
            delete errors.location
        if(photo == null || photo == '')
            delete errors.photo
        setErrors(errors)
    }

    const updateBusiness = ({business_name, business_site, business_contact}) => {
        setBusName(business_name)
        setBusSite(business_site)
        setBusContact(business_contact)
        if(business_name !== '')
            delete errors.business_name
        if(business_site !== '')
            delete errors.business_site
        if(business_contact !== '')
            delete errors.business_contact
        setErrors(errors)
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
                if(_.isEmpty(category)){
                    setErrors({
                        ...errors,
                        category: 'Missing Category'
                    })
                    setCountTab(1) //meaning show tab 1
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
                    location: _.isEmpty(location) ? 'Missing location' : null
                }
                if(Object.values(set).filter(i=>i).length > 0){
                    setErrors({
                        ...errors,
                        ...set
                    })
                    setCountTab(2)
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
                    business_name: business_name == '' ? 'Missing business name' : null,
                    business_contact: business_contact == '' ? 'Missing business contract' : null
                }
                if(Object.values(set).filter(i=>i).length > 0){
                    setErrors({
                        ...errors,
                        ...set
                    })
                    return;
                } else {
                    delete errors.business_name;
                    delete errors.business_contact;
                    setErrors({...errors});
                }
                break;
            }

        setCountTab(newCount)
        return set;
    }

    const submit = () => {
        const set = validateTab(3);
        if(_.isEmpty({...set})){
            setSubmitting(true)
            const params = {
                title,
                category,
                address,
                location,
                business_name,
                business_site,
                business_contact,
                photo,//: files.length > 0 ? photo : null,
                description: desc || ''
            }
            const submitPromise = !data.id ? 
                api.post(`/api/web/offers`, params) : 
                api.patch(`/api/web/offers/${data.id}`, { ...params })

            submitPromise.then(({data})=>{
                setSubmitting(false)
                swalSuccess(data.id ? "Offer has been updated": 'Offer has been requested!')
                handleForm(false, 'submit', data.data);
            }).catch(err=>{
                if(err.response){
                    const { data } = err.response
                    setErrors(data.errors || [])
                }
                setSubmitting(false)
            })
        } else {
            swalError();
        }
    }

    if(loading || submitting)
    return <div className="offer-form absolute flex flex-column h-full top-0 right-0">
        <LoadingScreen title={
            (loading && 'Loading offer...') ||
            (submitting && (data.id ? 'Updating Offer' : 'Creating Offer')) ||
            'Please wait'
        }/>
    </div>

    return (
        <div className="offer-form absolute flex flex-column h-full top-0 right-0">
            <div className="header flex px-4 py-4 items-center">
                <h2>{editing ? 'Edit' : 'Create'} Offer</h2>
                <button className="offers-create-form__close" type="button" onClick={()=>handleForm(false)}>
                    <OffersFormCross />
                </button>
            </div>
            {
                !editing &&
                <div className="relative pt-1 px-4">
                    <div className="w-full bg-gray-400 rounded-full">
                        <div className={`bg-blue-400 rounded-full leading-none py-1 text-white tab-${countTab}`}></div>
                    </div>
                    <p>{countTab} of 3</p>
                </div>
            }
            <div className="body flex flex-column flex-grow">
                {
                    editing && <div className="offer-edit__opts">
                        <ul>
                            <li className={"offer-edit__opts-item w-1/3 " + (countTab == 1 ? 'offer-edit__opts-item--active' : '')} onClick={()=>validateTab(1)}><h3>Select Category</h3></li>
                            <li className={"offer-edit__opts-item w-1/3 " + (countTab == 2 ? 'offer-edit__opts-item--active' : '')} onClick={()=>validateTab(2)}><h3>Service Information</h3></li>
                            <li className={"offer-edit__opts-item w-1/3 " + (countTab == 3 ? 'offer-edit__opts-item--active' : '')} onClick={()=>validateTab(3)}><h3>Business Information</h3></li>
                        </ul>
                    </div>
                }
                <div className="offers-create-form__body h-full px-4 overflow-y-scroll">
                    {showTabTitle()}
                    { countTab == 1 && <CategoryGrid selectedCategories={category} handleCategories={handleCategories} errors={errors.category}/>}
                    { countTab == 2 && <FormServiceInfo service={{title, desc, location, photo}} updateService={updateService} fileList={(e)=>console.log('filepond files', e)} errors={errors}/>}
                    { countTab == 3 && <FormBusinessInfo service={{business_name, business_site, business_contact}} updateBusiness={updateBusiness}  errors={errors}/>}
                </div>
            </div>
            <div className="footer flex px-4 py-3 justify-between">
                <button className="discard" onClick={()=>handleForm(true, 'discard', {})}>Discard</button>
                {
                    editing ? <button className="next" disabled={submitting} onClick={submit}>{submitting? 'Submitting...' :'Submit'}</button> 
                    : <div>
                        {
                            countTab > 1 &&
                            <button className="back" disabled={submitting} onClick={() => validateTab(countTab-1)}>Back</button>
                        }
                        {
                            (countTab < 3) 
                            ? (<button className="primary-btn next" disabled={submitting} onClick={() => validateTab(countTab+1)}>Next</button>)
                            : (<button className="next" disabled={submitting} onClick={submit}>{submitting? 'Submitting...': 'Create'}</button>)
                        }
                    </div>
                }
            </div>
        </div>
        
    )
}

export default OffersForm;