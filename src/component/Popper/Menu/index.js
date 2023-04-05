import classNames from "classnames/bind";
import Tippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/component/Popper';
import styles from './Menu.module.scss'
import MenuItem from "./MenuItem";
import Header from "./Header";
import { useState } from "react";

const cx = classNames.bind(styles)

const defaultFn = () => { }  // tạo ra 1 default để nếu sau k dùng onChange thì cái cái phần else onChange(item) ở dưới ko bị lỗi

function Menu({ children, items = [], onChange = defaultFn }) {

    const [history, setHitory] = useState([{ data: items }]);
    const current = history[history.length - 1];

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.language

            return <MenuItem key={index} data={item} onClick={() => {
                if (isParent) {
                    setHitory(prev => [...prev, item.language])
                } else {
                    onChange(item)
                }
            }} />
        })
    }

    return (
        <Tippy
            interactive
            visible
            delay={[0, 700]}
            placement='bottom-end'
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-popper')}>
                        {history.length > 1 && <Header title='Language' onBack={() => {
                            setHitory(prev => prev.slice(0, history.length - 1))
                        }} />}
                        {renderItems()}
                    </PopperWrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

export default Menu;