import React, {useState, useEffect} from 'react';
import OffersFormCross from '../../../svg/offers-form-cross';
import EmptyImg from '../../../svg/empty-img';
import Camera from '../../../svg/camera';
import StoriesHouseIcon from '../../../svg/stories-house';
import PencilIcon from '../../../svg/pencil';
import CategoryScroll from '../../../components/CategoryScroll'
import { swalError, swalSuccess } from '../../../components/helpers/alerts';
import { validateEmail, isValidated, validBenevityLink, validPhone } from '../../../components/helpers/validator';
import LoadingScreen from '../../../components/LoadingScreen'
import CircleImageForm from '../../../components/CircleImageForm';
import BannerImage from '../../../components/BannerImage';
import ImageCropper from '../../../components/ImageCropper'
import AsyncSelect from 'react-select/async';
import { connect } from 'react-redux';
import { selectStyle, selectStylePaddingZero, loadCampus, checkEmail } from '../../../components/helpers/async_options';
import { all } from '../needs/categorylist';
import Location from '../../../components/Location'
import {IMaskInput} from 'react-imask';


const OrgForm = ({ data = {}, handleClose, page, afterSubmit, AuthUserReducer }) => {
    const { roles } = AuthUserReducer;

    const [category, setCategory] = useState([]);
    const [accessable, setAccess] = useState(false);
    const [numbRef, setNumbRef] = useState(null);
    const [form, setForm] = useState({
        name: '', 
        email: '',
        site: '', 
        phone_number: '',
        address: '',
        description: '',
        benevity_link: ''
    })
    const [images, setImages] = useState({
        banner: null,
        photo: null
    })
    const [cropper, openCropper] = useState({
        url: null,
        cropTarget: 'banner'
    })
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [location, setLocation] = useState({
        location: '',
        lat: -33.868782, 
        lng: 151.207583
    })
    const [loading, setLoading] = useState(false);
    const [campus, setCampus] = useState([]);
    const [answers, setAnswers] = useState({
        acnc: false,
        fundraiser: false,
        insured: false,
        taxable: false
    })
    //Loading data from table
    useEffect(()=>{
        if(data.id){
                const { name, email, site, phone_number, description, category, banner, photo, address, benevity_link } = data
                setForm({ ...form, name, email, site, phone_number, description, address, benevity_link })
                setImages({banner, photo})
            loadAll()
        } else {
            setForm({name: '', email: '',site: '', phone_number: '', description: '', address: '', benevity_link: ''})
            setImages({ banner: null, photo: null })
            setCampus([])
            setLoading(false)
            setSubmitting(false)
            setErrors({})
            setLocation({
                location: 'Sydney, Australia',
                lat: -33.868782, 
                lng: 151.207583
            })
        }
    }, [data])

    const updateAnswers = (field = 'acnc', state = false)=>{
        setAnswers({ ...answers, [field]: state })
    }

    const loadAll = (clearCache = false) =>{
        setLoading(true)
        const token = axios.CancelToken.source();
        api.get(`/api/web/organizations/${data.id}`, {
            cache: {
                exclude: { query: false },
            }, 
            clearCacheEntry: clearCache,
            cancelToken: token.token
        }).then(({ data })=>{
            const { name, email, site, phone_number, description, category = [], campuses, accessable, address, location, lng, lat, details } = data.data
            // setForm({...form, name, email, site, phone_number, description})
            setAnswers({...details})
            setLocation({
                location,
                lat, 
                lng
            })
            setCampus(campuses)
            setCategory( all.filter(i => category.includes(i.name) ) );
            setLoading(false)
            setAccess(accessable || false)
        }).catch(({response})=>{
            if(response){
                setErrors({...response.errors})
                setLoading(false)
            }

        }).finally(()=>{
            // setLoading(false)
        })
        return token; //for useEffect
    }

    const removeError= (name = '') => {
        delete errors[name]
        setErrors(errors)
    }

    const handleInput = (e) => {
        const { name, value } = e.target
        setForm({ ...form,
            [name]: value
        })
        removeError(name)
    }

    const handleEmail = (email) => {
        setForm({ ...form, email })
        if(validateEmail(email)){
            checkEmail(email, {type: 'organization'})
            .then(({data})=>{
                if(email == data.email){
                    if(data.status == 'free')
                        removeError('email')
                    else
                        setErrors({...errors, email: 'Email already existed'})                    
                }
            })
        }
    }

    const handleImages = (file, type = 'photo', cropper = false) => {
        const reader = new FileReader();
        reader.onload = (e2) => {
            openCropper({
                url: (cropper) ? e2.target.result : null,
                cropTarget: type
            })
            setImages({
                ...images,
                [type]: e2.target.result
            })
        }
        reader.readAsDataURL(file)
    }

    const handleBanner = (imageData)=>{
        setImages({
            ...images,
            [cropper.cropTarget || 'banner']: imageData
        })
        // setCropTarget(null)
    }

    const handleCategories = (item, truth = false) => {
        if(truth)
            setCategory(category.filter(i=>item.slug != i.slug))
        else 
            setCategory([item, ...category])
        removeError('category');
    }

    const validateSubmit = () => {
        const { name, email, site, phone_number, description, benevity_link } = form
        const set = isValidated({
            name: name == '' ? "Missing name" : null,
            email: !validateEmail(email) ? "Missing email" : null,
            // site: site == '' ? "Missing site" : null,
            // benevity_link: !validBenevityLink(benevity_link) ? 'Wrong benevity_link' : null,
            phone_number: !validPhone(phone_number) ? "Missing phone_number" : null,
            description: description == '' ? "Missing description" : null,
            category: category.length == 0 ? "Missing category" : null,
        })
        setErrors(set)
        return set;
    }
    const handleSubmit = () => {
        const set = validateSubmit()
        if(_.isEmpty(set)){
            setSubmitting(true)
            const params = {
                ...form,
                ...location,
                ...images,
                ...answers,
                category,
                campus
            }
            const submitPromise = !data.id ? 
                api.post(`/api/web/organizations`, params) : 
                api.patch(`/api/web/organizations/${data.id}`, { ...params })
            const data_id = data.id;
            submitPromise.then(({data})=>{
                swalSuccess(data_id ? "Organization has been updated": 'New Organization Created!')
                setSubmitting(false)
                afterSubmit()
                handleClose(data.data);
            }).catch(err=>{
                if(err.response){
                    const { data } = err.response
                    setErrors(data.errors || [])
                    setSubmitting(false)
                }
            })
        } else {
            swalError('Invalid field content')
        }
    }

    const handleLocation = ({formatted_address, geometry}) => {
        setLocation({
            location: formatted_address, 
            lat: geometry.location.lat(), 
            lng: geometry.location.lng()
        })
    }

    const handleDiscard = () => {
        setForm({
            name: '', 
            email: '',
            site: '', 
            phone_number: '',
            description: ''
        })
        setCategory([])
        setError({})
        handleClose({}, true)
    }

    const access = () => {
        setLoading(true)
        api.post(`/api/web/organizations/${data.id}/access`, {
            access: !accessable
        }).then((res) =>{
            loadAll(true)
            swalSuccess(!accessable ? 'Access to organization added' : "Access to this Organization revoked")
        }).catch(err=>{

        })
    }

    const closeCropper=()=>{
        openCropper({url: null, cropTarget: 'photo'})
    }

    const setNumber = (phone_number, mask) => {
        removeError('phone_number');
        setForm({...form, phone_number})
    }

    return (
        <section className="form org-form">
            {
                (loading || submitting) &&
                <LoadingScreen title={
                    (loading && 'Loading Organisation...') ||
                    (submitting && (data.id ? 'Updating Organisation' : 'Creating Organisation')) ||
                    'Please wait'
                }/>
            }
            {
                cropper.url && <ImageCropper aspect={cropper.cropTarget == 'banner' ?  (14/5) : 1} originalImage={cropper.url} 
                    onImageCropped={handleBanner}
                    circle={ cropper.cropTarget == 'photo'}
                    closeCropper={closeCropper} />
            }
            <div className="form-title create-story__header">
                <h3>{data.id ? "Edit" : "Add"} Organisation</h3>
                <button type="button" onClick={handleClose}>
                    <OffersFormCross />
                </button>
            </div>
            <section className="form-body org-form__body">
                <BannerImage src={images.banner} onChangeFile={(file)=>handleImages(file, 'banner', true)}>
                    {
                        !images.banner && <EmptyImg />
                    }
                    <CircleImageForm ver2={true} src={images.photo} onChangeFile={(file)=>handleImages(file, 'photo', true)}/>
                </BannerImage>
                <form>
                    <CategoryScroll 
                        type={'monetary'}
                        selectedCategories={category} 
                        handleCategories={handleCategories}
                        errors={errors.category}
                    />
                    {
                        //Set user priveledges here.. campus users will need to know what organization is asking for need.
                        (roles.name == 'admin') && <div className={`form-group w-full ${errors.campus && 'form-error'}`}>
                            <label>Location</label>
                            <AsyncSelect
                                styles={selectStylePaddingZero}
                                loadOptions={loadCampus}
                                defaultOptions
                                isMulti
                                cacheOptions
                                value={campus}
                                placeholder="Location"
                                onChange={setCampus}
                                />
                            {
                                (errors.campus || false) && <span className="text-xs pt-1 text-red-500 italic">Missing Organization</span>
                            }
                        </div>
                    }
                    <div className="flex flex-wrap -mx-2">
                        <div className="w-full sm:w-full md:w-full xl:w-1/2 px-2">
                            <div className={`form-group ${errors.name && 'form-error'}`}>
                                <label>Organisation Name</label>
                                <input
                                    className="input-field"
                                    type="text"
                                    value={form.name}
                                    name="name"
                                    onChange={handleInput}
                                    placeholder="Enter Organisation Name"
                                />
                                {
                                    (errors.name || false) && <span className="text-xs pt-1 text-red-500 italic">Missing name</span>
                                }
                            </div>
                            <div className={`form-group ${errors.email && 'form-error'}`}>
                                <label>Email</label>
                                <input
                                    className="input-field"
                                    type="text"
                                    value={form.email}
                                    name="email"
                                    onChange={e=>handleEmail(e.target.value)}
                                    placeholder="Enter Email Address"
                                />
                                {
                                    (errors.email || false) && <span className="text-xs pt-1 text-red-500 italic">{errors.email}</span>
                                }
                            </div>
                        </div>
                        <div className="w-full sm:w-full md:w-full xl:w-1/2 px-2">
                            <div className={`form-group ${errors.site && 'form-error'}`}>
                                <label>Website</label>
                                <input
                                    className="input-field"
                                    type="text"
                                    value={form.site}
                                    name="site"
                                    onChange={handleInput}
                                    placeholder="eg. www.website.com"
                                />
                                {
                                    (errors.site || false) && <span className="text-xs pt-1 text-red-500 italic">Missing site</span>
                                }
                            </div>
                            <div className={`form-group ${errors.phone_number && 'form-error'}`}>
                                <label>Phone Number</label>
                                <IMaskInput
                                    className="input-field"
                                  mask={'00 0000 0000 [00]'}
                                  value={form.phone_number || ''}
                                  unmask={false} 
                                  inputRef={setNumbRef}
                                  onComplete={setNumber}
                                  placeholder='Enter number here'
                                />
                               {/* <input
                                    className="input-field"
                                    type="text"
                                    value={form.phone_number}
                                    name="phone_number"
                                    onChange={handleInput}
                                    placeholder="Enter Phone Number"
                                />*/}
                                {
                                    (errors.phone_number || false) && <span className="text-xs pt-1 text-red-500 italic">Missing phone number</span>
                                }
                            </div>
                        </div>
                        <div className="w-full px-2">
                                <div className={`form-group ${errors.benevity_link && 'form-error'}`}>
                                <label>Benevity Link</label>
                                <input
                                    className="input-field"
                                    type="text"
                                    value={form.benevity_link}
                                    name="benevity_link"
                                    onChange={handleInput}
                                    placeholder="Enter Benevity Link"
                                />
                                {
                                    (errors.benevity_link || false) && <span className="text-xs pt-1 text-red-500 italic">Missing Benevity Link</span>
                                }
                            </div>
                        </div>
                        <div className="w-full px-2">
                        {/*
                            <div className={`form-group ${errors.address && 'form-error'}`}>
                                <label>Street Address</label>
                                <input
                                    className="input-field"
                                    type="text"
                                    value={form.address}
                                    name="address"
                                    onChange={handleInput}
                                    placeholder="House # and/or Lot"
                                />
                                {
                                    (errors.address || false) && <span className="text-xs pt-1 text-red-500 italic">Missing street address</span>
                                }
                            </div>
                        */}
                            <Location 
                                className={`short-width ${errors.location && 'form-error'}`}
                                name={'location'}
                                defaultValue={location.location}
                                placesSelected={handleLocation}
                                errors={errors.location || []}
                            />
                        </div>
                        <div className="w-full xl:w-full px-2">
                            <div className={`form-group form-group-textarea ${errors.description && 'form-error'}`}>
                                <label>About</label>
                                <textarea type="text" placeholder="Say something about this need" rows="3"
                                    value={form.description}
                                    name="description"
                                    onChange={handleInput}
                                ></textarea>
                                {
                                    (errors.description || false) && <span className="text-xs pt-1 text-red-500 italic">Missing about description</span>
                                }
                            </div>
                        </div>
                        <div className="w-full px-2 mb-4">
                            <div className={`form-group`}>
                                <label>Please answer these questions</label>
                                <div className="org-questions">
                                    <div className={'questions'}>
                                        <p>Is your organisation registered with ACNC?</p>
                                        <div className={`question-buttons ${answers.acnc ? 'active': ''}`}>
                                            <span onClick={()=>updateAnswers('acnc',true)}>YES</span>
                                            <span onClick={()=>updateAnswers('acnc',false)}>NO</span>
                                        </div>
                                    </div>
                                    <div className={'questions'}>
                                        <p>Are you registered for fundraising?</p>
                                        <div className={`question-buttons ${answers.fundraiser ? 'active': ''}`}>
                                            <span onClick={()=>updateAnswers('fundraiser',true)}>YES</span>
                                            <span onClick={()=>updateAnswers('fundraiser',false)}>NO</span>
                                        </div>
                                    </div>
                                    <div className={'questions'}>
                                        <p>Do you have public liability insurance?</p>
                                        <div className={`question-buttons ${answers.insured ? 'active': ''}`}>
                                            <span onClick={()=>updateAnswers('insured',true)}>YES</span>
                                            <span onClick={()=>updateAnswers('insured',false)}>NO</span>
                                        </div>
                                    </div>
                                    <div className={'questions'}>
                                        <p>Are you registered as a tax deductible gift recipient?</p>
                                        <div className={`question-buttons ${answers.taxable ? 'active': ''}`}>
                                            <span onClick={()=>updateAnswers('taxable',true)}>YES</span>
                                            <span onClick={()=>updateAnswers('taxable',false)}>NO</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
            <footer className="form-footer org-form__footer">
                <button className="btn btn-secondary" onClick={handleDiscard}>Discard</button>
                <div className="flex-grow-1"></div>
                {
                    (roles.name === 'campus admin' && data.id ) && 
                    <button className="primary-btn mr-2" onClick={access}>{!accessable ? "Access Org" : "Remove Access" }</button>
                }
                <button className="primary-btn" onClick={handleSubmit}>{data.id ? "Save" : "Add"}</button>
            </footer>
        </section>
    )
}
// export default OrgForm;
export default connect(({AuthUserReducer})=>{
    return {
        AuthUserReducer
    }
},(dispatch)=>{
    return {

    }
})(OrgForm);