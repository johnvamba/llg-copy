import React from 'react';
import Search from '../../../svg/search';
import Attachment from '../../../svg/attachment';

const FormTabInvite = ({data = {}, users = [], setUsers}) => {
    const handleSearch = () => {

    }

	return(
		<>
            <h3>Invite People</h3>
            <section className="tab__content">
                <p>Let’s help you grow your group by inviting people you may know.</p>
                <form className="w-full">
                    <div className="form-search">
                        <div>
                            <Search />
                            <input className="w-full focus:outline-none placeholder-gray-400" type="text" placeholder="Search for NEUMA people" />
                        </div>
                    </div>
                </form>
                <footer>
                    <div>
                        <label>Share Link</label>
                        <div className="share__container">
                            <div>
                                <Attachment />
                                <span>neuma_jasndauh3SDqeslkdsl123lskdade219039</span>
                            </div>
                            <button>Copy</button>
                        </div>
                    </div>
                </footer>
            </section>
		</>
	)
}

export default FormTabInvite;