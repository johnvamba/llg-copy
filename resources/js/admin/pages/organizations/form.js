import React, {useState, useEffect} from 'react';
import OffersFormCross from '../../../svg/offers-form-cross';
import Camera from '../../../svg/camera';
import StoriesHouseIcon from '../../../svg/stories-house';
import PencilIcon from '../../../svg/pencil';
import CategoryScroll from '../../../components/CategoryScroll'
import { swalError } from '../../../components/helpers/alerts';
import { validateEmail, isValidated } from '../../../components/helpers/validator';
import LoadingScreen from '../../../components/LoadingScreen'
import CircleImageForm from '../../../components/CircleImageForm';
import BannerImage from '../../../components/BannerImage';
import ImageCropper from '../../../components/ImageCropper'
import AsyncSelect from 'react-select/async';
import { connect } from 'react-redux';
import { selectStyle, loadCampus, checkEmail } from '../../../components/helpers/async_options';
import { all } from '../needs/categorylist';

const OrgForm = ({ data = {}, handleClose, page, afterSubmit, AuthUserReducer }) => {
    const { roles } = AuthUserReducer;

    const [category, setCategory] = useState([]);
    const [form, setForm] = useState({
        name: '', 
        email: '',
        site: '', 
        phone_number: '',
        description: ''
    })
    const [images, setImages] = useState({
        banner: null,
        photo: null
    })
    const [cropper, openCropper] = useState(null)
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [location, setLocation] = useState({
        location: 'Sydney, Australia',
        lat: -33.868782, 
        lng: 151.207583
    })
    const [loading, setLoading] = useState(false);
    const [campus, setCampus] = useState({});

    //Loading data from table
    useEffect(()=>{
        if(data.id){
                const { name, email, site, phone_number, description, category, banner, photo } = data
                setForm({ ...form, name, email, site, phone_number, description})
                setImages({banner, photo})
            loadAll()
        } else {
            setForm({name: '', email: '',site: '', phone_number: '',description: ''})
            setImages({ banner: null, photo: null })
            setCampus({})
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
            const { name, email, site, phone_number, description, category = [], campus } = data.data
            // setForm({...form, name, email, site, phone_number, description})
            setCampus(campus)
            setCategory( all.filter(i => category.includes(i.name) ) );
            setLoading(false)
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
            if(cropper){
                openCropper(e2.target.result)
            } else {
                openCropper(null);
            }
            setImages({
                ...images,
                [type]: e2.target.result
            })
        }
        reader.readAsDataURL(file)
    }
    const handleBanner = (banner)=>{
        setImages({
            ...images,
            banner
        })
    }

    const handleCategories = (item, truth = false) => {
        if(truth)
            setCategory(category.filter(i=>item.slug != i.slug))
        else 
            setCategory([item, ...category])
        removeError('category');
    }

    const validateSubmit = () => {
        const { name, email, site, phone_number, description } = form
        const set = isValidated({
            name: name == '' ? "Missing name" : null,
            email: !validateEmail(email) ? "Missing email" : null,
            // site: site == '' ? "Missing site" : null,
            phone_number: phone_number == '' ? "Missing phone_number" : null,
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
                category,
                campus
            }
            const submitPromise = !data.id ? 
                api.post(`/api/web/organizations`, params) : 
                api.patch(`/api/web/organizations/${data.id}`, { ...params })

            submitPromise.then(({data})=>{
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
                cropper && <ImageCropper aspect={14/5} originalImage={cropper} 
                    onImageCropped={handleBanner}
                    closeCropper={()=>openCropper(null)} />
            }
            <div className="form-title create-story__header">
                <h3>{data.id ? "Edit" : "Add"} Organisation</h3>
                <button type="button" onClick={handleClose}>
                    <OffersFormCross />
                </button>
            </div>
            <section className="form-body org-form__body">
                <BannerImage src={images.banner} onChangeFile={(file)=>handleImages(file, 'banner', true)}>
                    <CircleImageForm ver2={true} src={images.photo} onChangeFile={(file)=>handleImages(file, 'photo')}/>
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
                            <label>Campus</label>
                            <AsyncSelect
                                styles={selectStyle}
                                loadOptions={loadCampus}
                                defaultOptions
                                cacheOptions
                                value={campus}
                                placeholder="Campus"
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
                                <input
                                    className="input-field"
                                    type="text"
                                    value={form.phone_number}
                                    name="phone_number"
                                    onChange={handleInput}
                                    placeholder="Enter Phone Number"
                                />
                                {
                                    (errors.phone_number || false) && <span className="text-xs pt-1 text-red-500 italic">Missing phone number</span>
                                }
                            </div>
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
                    </div>
                </form>
            </section>
            <footer className="form-footer org-form__footer">
                <button className="btn btn-secondary" onClick={handleDiscard}>Discard</button>
                <div className="flex-grow-1"></div>
                <button className="btn btn-primary" onClick={handleSubmit}>{data.id ? "Save" : "Add"}</button>
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