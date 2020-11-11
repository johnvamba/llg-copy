import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { Tooltip } from 'reactstrap';
import UsersActionsEdit from '../../../svg/users-actions-edit';
import UsersActionsDelete from '../../../svg/users-actions-delete';
import Attachment from '../../../svg/attachment';


const ApiList = ({ handleEditForm }) => {

    const [keyLink, setKeyLink] = useState({
        value: 'neuma_jasndauh3SDqeslkdsl123lskdade219039',
        copied: false,
    });
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggle = () => {
        if(keyLink.value) setKeyLink({...keyLink, copied: false})
        setTooltipOpen(!tooltipOpen);
    }

    return(
        <>
            <section className="api-list">
                <ul className="flex flex-wrap items-center justify-between">
                    <li>
                        <header className="flex items-center justify-between">
                            <h2>Key Name</h2>
                            <div className="api-list__actions flex items-center justify-between">
                                <button onClick={handleEditForm} >
                                    <UsersActionsEdit />
                                </button>
                                <button>
                                    <UsersActionsDelete />
                                </button>
                            </div>
                        </header>
                        <section className="api-list__body">
                            <div className="share">
                                <label>Public Key</label>
                                <div className="share__container">
                                    <div>
                                        <Attachment />
                                        <span>{keyLink.value}</span>
                                    </div>
                                    <CopyToClipboard text={keyLink.value}
                                        onCopy={() => setKeyLink({...keyLink, copied: true})}>
                                        <button id="share-link">Copy</button>
                                    </CopyToClipboard>
                                </div>
                                <p>Created on 12 Sept 2020, 19:37</p>
                            </div>
                        </section>
                        <Tooltip placement="right" isOpen={tooltipOpen} target="share-link" toggle={toggle}>
                            {keyLink.copied ? 'Copied' : 'Copy to Clipboard'}
                        </Tooltip>
                    </li>
                    
                </ul>
            </section>
        </>
    )
}

export default ApiList;
