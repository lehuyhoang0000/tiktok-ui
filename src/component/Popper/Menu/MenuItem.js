import PropTypes from 'prop-types';
import styles from './Menu.module.scss';
import classNames from 'classnames/bind';
import Button from '~/component/Button';

const cx = classNames.bind(styles);

function MenuItem({ data, onClick }) {
    const classe = cx('menu-item', {
        separate: data.separate,
    });
    return (
        <Button className={classe} lefticon={data.icon} to={data.to} onClick={onClick}>
            {data.title}
        </Button>
    );
}

MenuItem.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func,
};

export default MenuItem;
