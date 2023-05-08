import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom'; // dùng để có thể điều chỉnh việc active khi chọn vào
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ title, to, icon, activeIcon }) {
    return (
        <NavLink className={(nav) => cx('menu-item', { active: nav.isActive })} to={to}>
            <span className={cx('icon')}>{icon}</span>
            <span className={cx('active-icon')}>{activeIcon}</span>
            <span className={cx('title')}>{title}</span>
        </NavLink>
    );
}

MenuItem.propsTypes = {
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    activeIcon: PropTypes.node.isRequired,
};

export default MenuItem;

// active: nav.isActive để thêm 1 class active vào trong classname, bởi cái active này truyền vào ko phải
// là dạng của module.scss nên cx sẽ k thể hiểu là active nếu truyền thằng ( chỉ có trong NavLink mới có, nếu là Link thường thì phải tự code tay)
