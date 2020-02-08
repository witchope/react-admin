import React, { FunctionComponent, useState } from 'react';
import { SketchPicker } from 'react-color';
import { SettingOutlined } from '@ant-design/icons/lib';
import classNames from 'classnames';

const ThemePicker: FunctionComponent = () => {

    const [switcherOn, setSwitcherOn] = useState(false);
    const [background, setBackground] = useState(localStorage.getItem('@primary-color') || '#313653')

    const _switcherOn = () => {
        setSwitcherOn(!switcherOn);
    };

    const _handleChangeComplete = (color: any) => {
        console.log(color);
        setBackground(color.hex);
        localStorage.setItem('@primary-color', color.hex);

        (window as any).less.modifyVars({
            '@primary-color': color.hex,
        });
    };

    return (
            <div className={classNames('switcher dark-white', { active: switcherOn })}>
                <span className="sw-btn dark-white" onClick={_switcherOn}>
                    <SettingOutlined className="text-dark" />
                </span>
                <div style={{ padding: 10 }} className="clear">
                    <SketchPicker
                            color={background}
                            onChangeComplete={_handleChangeComplete}
                    />
                </div>
            </div>
    );
};

export default ThemePicker;
