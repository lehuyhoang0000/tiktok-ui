import styles from './Menu.module.scss'
import classNames from "classnames/bind";
import Button from "~/component/Button";

const cx = classNames.bind(styles)

function MenuItem({ data, onClick }) {
    return <Button className={cx('menu-item')} lefticon={data.icon} to={data.to} onClick={onClick}>
        {data.title}
    </Button>
}

export default MenuItem;