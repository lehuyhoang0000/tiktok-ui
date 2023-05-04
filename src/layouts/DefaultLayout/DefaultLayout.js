import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Header from '~/layouts/components/Header';
import Sidebar from './Sidebar';

const cx = classNames.bind(styles);

function DefalutLayout({ children }) {
    return (
        <div className={cx('warpper')}>
            <Header />
            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

DefalutLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefalutLayout;
