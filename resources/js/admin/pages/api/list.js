import React from 'react';
import UsersActionsEdit from '../../../svg/users-actions-edit';
import UsersActionsDelete from '../../../svg/users-actions-delete';
import Attachment from '../../../svg/attachment';


const ApiList = () => {
    return(
        <>
            <section className="api-list">
                <ul className="flex flex-wrap items-center justify-between">
                    <li>
                        <header className="flex items-center justify-between">
                            <h2>Key Name</h2>
                            <div className="api-list__actions flex items-center justify-between">
                                <UsersActionsEdit />
                                <UsersActionsDelete />
                            </div>
                        </header>
                        <section className="api-list__body">
                            <div className="share">
                                <label>Public Key</label>
                                <div className="share__container">
                                    <div>
                                        <Attachment />
                                        <span>neuma_jasndauh3SDqeslkdsl123lskdade219039</span>
                                    </div>
                                    <button>Copy</button>
                                </div>
                                <p>Created on 12 Sept 2020, 19:37</p>
                            </div>
                        </section>
                    </li>
                    <li>
                        <header className="flex items-center justify-between">
                            <h2>Key Name</h2>
                            <div className="api-list__actions flex items-center justify-between">
                                <UsersActionsEdit />
                                <UsersActionsDelete />
                            </div>
                        </header>
                        <section className="api-list__body">
                            <div className="share">
                                <label>Public Key</label>
                                <div className="share__container">
                                    <div>
                                        <Attachment />
                                        <span>neuma_jasndauh3SDqeslkdsl123lskdade219039</span>
                                    </div>
                                    <button>Copy</button>
                                </div>
                                <p>Created on 12 Sept 2020, 19:37</p>
                            </div>
                        </section>
                    </li>
                    <li>
                        <header className="flex items-center justify-between">
                            <h2>Key Name</h2>
                            <div className="api-list__actions flex items-center justify-between">
                                <UsersActionsEdit />
                                <UsersActionsDelete />
                            </div>
                        </header>
                        <section className="api-list__body">
                            <div className="share">
                                <label>Public Key</label>
                                <div className="share__container">
                                    <div>
                                        <Attachment />
                                        <span>neuma_jasndauh3SDqeslkdsl123lskdade219039</span>
                                    </div>
                                    <button>Copy</button>
                                </div>
                                <p>Created on 12 Sept 2020, 19:37</p>
                            </div>
                        </section>
                    </li>
                    <li>
                        <header className="flex items-center justify-between">
                            <h2>Key Name</h2>
                            <div className="api-list__actions flex items-center justify-between">
                                <UsersActionsEdit />
                                <UsersActionsDelete />
                            </div>
                        </header>
                        <section className="api-list__body">
                            <div className="share">
                                <label>Public Key</label>
                                <div className="share__container">
                                    <div>
                                        <Attachment />
                                        <span>neuma_jasndauh3SDqeslkdsl123lskdade219039</span>
                                    </div>
                                    <button>Copy</button>
                                </div>
                                <p>Created on 12 Sept 2020, 19:37</p>
                            </div>
                        </section>
                    </li>
                </ul>
            </section>
        </>
    )
}


export default ApiList;