import React from 'react';
import OffersViewStatus from '../../../svg/offers-view-status';
import OffersViewEdit from '../../../svg/offers-view-edit';
import StoriesStatusPublishIcon from '../../../svg/stories-status-publish';
import StoriesCatChildrenIcon from '../../../svg/stories-cat-children';

const View = ({data = {}, handleForm }) => {
    return (
        <>
            <section className="view-story">
                <header className="view-story__header flex flex-wrap">
                    <div className="view-story__header-left flex flex-wrap">
                        <StoriesStatusPublishIcon />
                        <label>Published</label>
                    </div>
                    <div className="view-story__header-right flex flex-wrap" >
                        <span className="delete">Delete</span>
                        <span className="unpublished">Unpublished</span>
                        <div onClick={() => handleForm(data, true)}>
                            <OffersViewEdit />
                            <label>Edit</label>
                        </div>
                    </div>
                </header>
                <article className="view-story__body">
                    <div className="bg-cover bg-center" style={{backgroundImage: "url(https://www.ratemds.com/blog/wp-content/uploads/2015/09/handshake-shaking-hands-shake-hands-trust.jpg)"}}></div>
                    <div className="content">
                        <div  className="title">
                            <h2>Sample Title Here</h2>
                            <span>08/27/20</span>
                        </div>
                        <div className="type">
                            <StoriesCatChildrenIcon />
                            <label>Children</label>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque id nibh tortor id aliquet lectus proin nibh nisl. Nunc congue nisi vitae suscipit tellus. Senectus et netus et malesuada fames ac. Sit amet justo donec enim diam vulputate. Molestie at elementum eu facilisis sed odio morbi quis. Nibh sit amet commodo nulla facilisi nullam. Ultrices tincidunt arcu non sodales. Sed velit dignissim sodales ut eu sem integer vitae.</p>

                        <p>Semper risus in hendrerit gravida rutrum quisque. Nulla malesuada pellentesque elit eget. Arcu dictum varius duis at consectetur. Tempus quam pellentesque nec nam aliquam. Nibh tellus molestie nunc non blandit massa enim. Urna duis convallis convallis tellus id. Urna duis convallis convallis tellus id interdum velit laoreet id. Velit sed ullamcorper morbi tincidunt ornare massa. Ultrices eros in cursus turpis massa tincidunt dui ut. Vulputate enim nulla aliquet porttitor lacus luctus accumsan tortor. </p>
                    </div>
                </article>
            </section>
        </>
    )
}

export default View;