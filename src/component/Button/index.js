import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from './Button.module.scss'

const cx = classNames.bind(styles)

function Button({ to, href, primary = false, outline = false, text = false, disable = false, rounded = false, small = false, large = false, children, className, lefticon, righticon, onClick, ...passProps }) {
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps,
    }

    if (disable) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        })
    }

    if (to) {
        props.to = to
        Comp = Link
    } else if (href) {
        props.href = href
        Comp = 'a'
    }

    const classes = cx('wrapper', {
        [className]: className,
        primary,
        outline,
        text,
        disable,
        rounded,
        small,
        large,
    })
    return (
        <Comp className={classes} {...props}>
            {lefticon && <span className={cx('icon')}>{lefticon}</span>}
            <span className={cx('title')}>{children}</span>
            {righticon && <span className={cx('icon')}>{righticon}</span>}

        </Comp>
    );
}

export default Button;