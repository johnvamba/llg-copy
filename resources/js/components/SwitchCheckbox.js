import React from 'react';
import './css/SwitchCheckbox.scss'
const SwitchCheckbox = ({
    name="SwitchCheckbox",
    className = "",
    onChange,
    children,
    checked,
    ...rest
}) => (
    <div className="toggle-switch small-switch">
      <input type="checkbox" 
        className="toggle-switch-checkbox" 
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        name={name}
        id={name}
        />
      <label className="toggle-switch-label" htmlFor={name}>
        <span className="toggle-switch-inner" />
        <span className="toggle-switch-switch" />
      </label>
    </div>
)

export default SwitchCheckbox;