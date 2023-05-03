import PropTypes from 'prop-types';
import classNames from 'classnames/';
import { useState, forwardRef } from 'react';
import images from '~/assets/images';
import styles from './Image.module.scss';

const Image = forwardRef(({ alt, src, classname, fallback: customFallback = images.noImage, ...props }, ref) => {
    //fallback: customFallback có tác dụng như 1 props để truyền dữ liệu xuống, sau này có thể dùng tái sử dụng những ảnh lỗi khác
    const [fallback, Setfallback] = useState('');

    const handleError = () => {
        Setfallback(customFallback);
    };

    return (
        <img
            ref={ref}
            className={classNames(styles.wrapper, classname)} // tạo ra class mặc định qua classname để sau có thể sửa được, còn styles.wrapper là để chỉnh sửa trong file sass
            src={fallback || src}
            alt={alt}
            {...props}
            onError={handleError}
        />
    );
});

Image.propTypes = {
    alt: PropTypes.string,
    src: PropTypes.string,
    classname: PropTypes.string,
    fallback: PropTypes.string,
};

export default Image;
