import React, { useEffect, useState } from 'react';

//This part is just a test
import { volunteer } from '../admin/pages/needs/categorylist';
import Check from '../svg/check'

const CatComponent = ({cat, onSelect, truth = false}) => {
    return <div className={`offers-category__item ${truth ? 'active':''}`} onClick={()=>onSelect(cat, truth)}>
            <cat.svg_class className="svg-icon" active={truth} />
            <span>
                {cat.name || 'unknown'}
            </span>
    </div>
}

const CategoryGrid = ({
    className,
    // label = "Select Category",
    selectedCategories = [],
    handleCategories,
    errors,
    ...props
}) => {
    const [catList, setCatList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [scrollLeft, setScrollLeft] = useState(0);

    // useEffect(()=>{
    //     //load categories here.
    // }, [type])

    const categoryWheel = event => {
        const { target } = event
        // target.scrollLeft += (event.deltaY / 10)
        console.log('onWheel', event.deltaY, target.scrollLeft)
        // target.scrollX += event.deltaY
    }

    const categoryScroll = event => {
        const { target } = event
        if(target.offsetWidth + target.scrollLeft >= target.scrollWidth)
            console.log('final', target.offsetWidth, target.scrollLeft, target.scrollWidth);
        else
            console.log('scrolling',target.offsetWidth, target.scrollLeft, target.scrollWidth);

        setScrollLeft(event.target.scrollLeft)
    }

    return (
        <div className={`${className || ''} ${errors ? 'form-error' : ''}`}>
            <div className="offers-category"
                onWheel={categoryWheel}
                onScroll={categoryScroll}>
                {
                    //Apply me later on. At the meantime, do svg
                    /*
                    <div className={`icon-category ${test ? 'active':''}`} onClick={()=>setTest(!test)}>
                        <div>
                        <i className={`icon-circle icon-png`} style={{background: "url('/assets/icons/Employment.png')"}}>
                            { test &&
                                <Check className="svg-check" fill='#109CF1'/>
                            }
                        </i>
                        {'Test'}
                    </div>
                    */
                }
                {
                    volunteer.length &&
                    volunteer.map((cat, ind)=><CatComponent key={cat.slug} 
                        cat={cat}
                        truth={selectedCategories.findIndex(i=> cat.slug == i.slug || cat.name == i.name) >= 0}
                        onSelect={handleCategories}
                        />)
                }
            </div>
            {
                (errors || false) && <span className="text-xs pt-1 text-red-500">Pick at least a category</span>
            }
        </div>
    )
}

export default CategoryGrid;