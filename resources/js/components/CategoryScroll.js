import React, { useEffect, useState, useRef } from 'react';

//This part is just a test
import { monetary, volunteer } from '../admin/pages/needs/categorylist';
import Check from '../svg/check'

const CatComponent = ({cat, onSelect, truth = false}) => {
    return <div className={`icon-category ${truth ? 'active':''}`} onClick={()=>onSelect(cat, truth)}>
        <i className={`icon-circle`}>
            { truth &&
                <Check className="svg-check" fill='#109CF1'/>
            }
            <cat.svg_class className="svg-icon" active={truth} />
        </i>
        {cat.name || 'unknown'}
    </div>
}

const CategoryScroll = ({
    className,
    type = 'monetary',
    selectedCategories = [],
    handleCategories,
    errors,
    ...props
}) => {
    const [catList, setCatList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [scrollLeft, setScrollLeft] = useState(0);
    const container = useRef(null);
    const [widths, setWidth] = useState({
        left: 0,
        right: 0,
        start: 0,
        full: 0
    });

    useEffect(()=>{
        //load categories here.
        const { current } = container
        if(container.current){
            setWidth({
                left: 0,
                right: current.offsetWidth,
                start: 0,
                full: current.scrollWidth
            })
        }
    }, [type])

    const categoryWheel = event => {
        const { target } = event
        // target.scrollLeft += (event.deltaY / 10)
        // console.log('onWheel', event.deltaY, target.scrollLeft)
        // target.scrollX += event.deltaY
    }

    const categoryScroll = event => {
        const { target } = event
        // if(target.offsetWidth + target.scrollLeft >= target.scrollWidth)
        //     console.log('final', target.offsetWidth, target.scrollLeft, target.scrollWidth);
        // else
        //     console.log('scrolling',target.offsetWidth, target.scrollLeft, target.scrollWidth);

        setScrollLeft(event.target.scrollLeft)
    }

    const hover = (e, action = 'right') => {
        const { current } = container
        let left = widths.left + (action == 'right' ? 200 : -200)
        if(left < 0) {
            left = 0;
        } else if(left > current.offsetWidth) {
            left -= current.offsetWidth;
        }
        current.scroll({left, behavior: 'smooth'})
        setWidth({
            ...widths,
            left,
            right: left + current.offsetWidth,
        })
    }

    return (
        <div className={`form-group category-container ${errors ? 'form-error' : ''}`}>
            <label>Select Category</label>
            <div className="icon-categories"
                ref={container}
                onWheel={categoryWheel}
                onScroll={categoryScroll}>
                {
                    widths.left > 0 &&
                    <div className="scroll left-scroll" onClick={(e)=>hover(e, 'left')}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#CF995F"/>
                            <path d="M14 7L9 12L14 17" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>

                    </div>
                }
                {
                    type == 'monetary' ?
                    monetary.map((cat, ind)=><CatComponent key={cat.slug} 
                        cat={cat}
                        truth={selectedCategories.findIndex(i=> cat.slug == i.slug || cat.name == i.name) >= 0}
                        onSelect={handleCategories}
                        />) 
                    :   
                    volunteer.map((cat, ind)=><CatComponent key={cat.slug} 
                        cat={cat}
                        truth={selectedCategories.findIndex(i=> cat.slug == i.slug || cat.name == i.name) >= 0}
                        onSelect={handleCategories}
                        />)
                }
                {
                    (widths.right < widths.full) &&
                    <div className="scroll right-scroll" onClick={hover}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="12" fill="#CF995F"/>
                        <path d="M10 7L15 12L10 17" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                }
            </div>
            {
                (errors || false) && <span className="text-xs pt-1 text-red-500">Pick at least a category</span>
            }
        </div>
    )
}

export default CategoryScroll;