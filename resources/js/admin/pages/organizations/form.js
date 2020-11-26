import React, {useState, useEffect} from 'react';
import OffersFormCross from '../../../svg/offers-form-cross';
import Camera from '../../../svg/camera';
import StoriesHouseIcon from '../../../svg/stories-house';
import PencilIcon from '../../../svg/pencil';
import CategoryScroll from '../../../components/CategoryScroll'
import { swalError } from '../../../components/helpers/alerts';
import { validateEmail, isValidated } from '../../../components/helpers/validator';
import LoadingScreen from '../../../components/LoadingScreen'

const OrgForm = ({ data = {}, handleClose, page, afterSubmit }) => {
    const [category, setCategory] = useState([]);
    const [form, setForm] = useState({
        name: '', 
        email: '',
        site: '', 
        phone_number: '',
        description: ''
    })
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [location, setLocation] = useState({
        location: 'Sydney, Australia',
        lat: -33.868782, 
        lng: 151.207583
    })
    const [loading, setLoading] = useState(false);

    //Loading data from table
    useEffect(()=>{
        if(data.id){
                const { name, email, site, phone_number, description, category } = data
                setForm({ ...form, name, email, site, phone_number, description})
            // if(form.name == ''){
            // }
            loadAll()
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
            const { name, email, site, phone_number, description, category } = data
            // setForm({...form, name, email, site, phone_number, description})
            setCategory(category || [])
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

    const categoryWheel = event => {
        const { target } = event
        // target.scrollLeft += (event.deltaY / 10)
        console.log('onWheel', event.deltaY, target.scrollLeft)
        // target.scrollX += event.deltaY
    }

    const categoryScroll = event => {
        console.log('onScroll', event.target.scrollTop, event.target.scrollLeft)
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
            site: site == '' ? "Missing site" : null,
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
                category,
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
            <div className="form-title create-story__header">
                <h3>{data.id ? "Edit" : "Add"} Organisation</h3>
                <button type="button" onClick={handleClose}>
                    <OffersFormCross />
                </button>
            </div>
            <section className="form-body org-form__body">
                <header>
                    <div className="org-form__cover-bg bg-cover bg-center" style={{backgroundImage: "url()"}}>
                        <button>
                            <Camera /> 
                            Add Cover
                        </button>
                        <div className="org-form__rounded-img"></div>
                        <div className="org-form__edit">
                            <PencilIcon />
                        </div>
                    </div>
                </header>
                <form>
                    <CategoryScroll 
                        type={'monetary'}
                        selectedCategories={category} 
                        handleCategories={handleCategories}
                        errors={errors.category}
                    />
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
                                    onChange={handleInput}
                                    placeholder="Enter Email Address"
                                />
                                {
                                    (errors.email || false) && <span className="text-xs pt-1 text-red-500 italic">Missing email</span>
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
                <button className="btn btn-primary" onClick={handleSubmit}>{data.id ? "Edit" : "Add"}</button>
            </footer>
        </section>
    )
}
export default OrgForm;