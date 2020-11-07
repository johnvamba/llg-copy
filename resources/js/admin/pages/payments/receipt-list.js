import React, { useState } from 'react';
import Switch from "react-switch";
import UsersActionsEdit from '../../../svg/users-actions-edit';
import UsersActionsDelete from '../../../svg/users-actions-delete';

const ReceiptList = () => {

    const [switchStatus, setSwitchStatus] = useState(false)

    const handleSwitch = (checked) => {
        setSwitchStatus(checked);
    }

    return(
        <>
            <section className="template-list">
                <ul className="flex flex-wrap items-center justify-between">
                    <li className="flex items-center justify-between">
                        <div className="flex items-center">
                            <label className="flex items-center">
                                <Switch
                                    offColor="#A5B0BF"
                                    onColor="#41DB82"
                                    handleDiameter={20}
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                    onChange={handleSwitch}
                                    checked={switchStatus}
                                    height={30}
                                    width={50}
                                />
                            </label>
                            <div className="template-list__details">
                                <label>Template 01</label>
                                <span>Created on 12 Sept 2020, 19:37</span>
                            </div>
                        </div>
                        <div>
                            <div className="template-list__actions flex items-center">
                                <button>
                                    <UsersActionsEdit />
                                </button>
                                <button>
                                    <UsersActionsDelete />
                                </button>
                            </div>
                            <div className="template-list__status flex items-center">
                                <div></div>
                                <span>In Use</span>
                            </div>
                        </div>
                    </li>
                    <li className="flex items-center justify-between">
                        <div className="flex items-center">
                            <label className="flex items-center">
                                <Switch
                                    offColor="#A5B0BF"
                                    onColor="#41DB82"
                                    handleDiameter={20}
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                    onChange={handleSwitch}
                                    checked={switchStatus}
                                    height={30}
                                    width={50}
                                />
                            </label>
                            <div className="template-list__details">
                                <label>Template 01</label>
                                <span>Created on 12 Sept 2020, 19:37</span>
                            </div>
                        </div>
                        <div>
                            <div className="template-list__actions flex items-center">
                                <button>
                                    <UsersActionsEdit />
                                </button>
                                <button>
                                    <UsersActionsDelete />
                                </button>
                            </div>
                            <div className="template-list__status flex items-center">
                                <div></div>
                                <span>In Use</span>
                            </div>
                        </div>
                    </li>
                    <li className="flex items-center justify-between">
                        <div className="flex items-center">
                            <label className="flex items-center">
                                <Switch
                                    offColor="#A5B0BF"
                                    onColor="#41DB82"
                                    handleDiameter={20}
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                    onChange={handleSwitch}
                                    checked={switchStatus}
                                    height={30}
                                    width={50}
                                />
                            </label>
                            <div className="template-list__details">
                                <label>Template 01</label>
                                <span>Created on 12 Sept 2020, 19:37</span>
                            </div>
                        </div>
                        <div>
                            <div className="template-list__actions flex items-center">
                                <button>
                                    <UsersActionsEdit />
                                </button>
                                <button>
                                    <UsersActionsDelete />
                                </button>
                            </div>
                            <div className="template-list__status flex items-center">
                                <div></div>
                                <span>In Use</span>
                            </div>
                        </div>
                    </li>
                    <li className="flex items-center justify-between">
                        <div className="flex items-center">
                            <label className="flex items-center">
                                <Switch
                                    offColor="#A5B0BF"
                                    onColor="#41DB82"
                                    handleDiameter={20}
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                    onChange={handleSwitch}
                                    checked={switchStatus}
                                    height={30}
                                    width={50}
                                />
                            </label>
                            <div className="template-list__details">
                                <label>Template 01</label>
                                <span>Created on 12 Sept 2020, 19:37</span>
                            </div>
                        </div>
                        <div>
                            <div className="template-list__actions flex items-center">
                                <button>
                                    <UsersActionsEdit />
                                </button>
                                <button>
                                    <UsersActionsDelete />
                                </button>
                            </div>
                            <div className="template-list__status flex items-center">
                                <div></div>
                                <span>In Use</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </section>
        </>
    )
}

export default ReceiptList;