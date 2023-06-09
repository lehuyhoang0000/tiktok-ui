import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/component/Popper';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';
import Header from './Header';
import { useState } from 'react';

const cx = classNames.bind(styles);

const defaultFn = () => {}; // tạo ra 1 default để nếu sau k dùng onChange thì cái cái phần else onChange(item) ở dưới ko bị lỗi

function Menu({ children, items = [], hideOnClick = false, onChange = defaultFn }) {
    const [history, setHitory] = useState([{ data: items }]);
    const current = history[history.length - 1];

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.language;

            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHitory((prev) => [...prev, item.language]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };

    const handleBack = () => {
        setHitory((prev) => prev.slice(0, history.length - 1)); // khi bấm vào sẽ quay trở lại menu cấp 1
    };

    const renderResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper')}>
                {history.length > 1 && <Header title={current.title} onBack={handleBack} />}
                <div className={cx('menu-body')}>{renderItems()}</div>
            </PopperWrapper>
        </div>
    );

    const handleReset = () => {
        setHitory((prev) => prev.slice(0, 1)); // logic quay về trang 1 khi hơ chuột ra ngoài menu của avatar
    };

    return (
        <Tippy
            interactive
            // visible
            offset={[15, 8]}
            delay={[0, 700]}
            hideOnClick={hideOnClick} // dùng để ẩn hiện tippy khi muốn click mà nó k bị ẩn
            placement="bottom-end"
            onHide={handleReset}
            render={renderResult}
        >
            {children}
        </Tippy>
    );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
};

export default Menu;
