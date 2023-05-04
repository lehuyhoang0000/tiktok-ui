import { useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';

import * as searchSevices from '~/services/searchService';
import styles from './Search.module.scss';
import { Wrapper as PopperWrapper } from '~/component/Popper';
import { SearchIcon } from '~/component/Icons';
import { useDebounce } from '~/hooks';
import AccountItem from '~/component/AccountItem';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]); // trả về 1 mảng danh sách trong ô tìm kiếm
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const debouncedValue = useDebounce(searchValue, 500);

    const inputRef = useRef();

    useEffect(() => {
        if (!debouncedValue.trim()) {
            // .trim() để loại bỏ những dấu cách đầu cuối, phần này giúp cho ô search khi bấm dấu cách không bị lỗi
            // logic để cho apis hiểu nếu khi dùng search value trả về chuỗi rỗng, thì sẽ bị lỗi, phần này giúp thoát khỏi bị lỗi
            setSearchResult([]); //khi xóa hết trong tìm kiếm sẽ set lại kết quả thành mảng rỗng
            return;
        }
        const fetchApis = async () => {
            setLoading(true);

            const result = await searchSevices.search(debouncedValue);

            setSearchResult(result);
            setLoading(false);
        };
        fetchApis();
        //`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(debouncedValue)}&type=less`
    }, [debouncedValue]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleResult = () => {
        setShowResult(false);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;
        // nếu searchValue trả về khi người dùng gõ dấu cách thì sẽ không nhập được dấu cách hoặc là khoảng trống khi đó phải nhập chữ số xong mới nhập được dấu cách
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    return (
        //Using a wrapper <div> tag around the reference element solves
        //this by creating a new parentNode context. (tránh bị warning của tippy)
        <div>
            <HeadlessTippy
                interactive
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-lable')}>Accounts</h4>
                            {searchResult.map((result) => (
                                <AccountItem key={result.id} data={result} /> // vì bth sẽ có những id riêng của data nên ko cần phải có index làm key nữa, thay vào đó là data.id luôn( result.id)
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleResult}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        type="text"
                        placeholder="Search accounts and videos"
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
                    />
                    {!!searchValue && !loading && (
                        <button type="" className={cx('clear')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                    <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                        {' '}
                        {/* ngăn chặn hành động bấm chuột xuống focus vào ô tìm kiếm */}
                        <SearchIcon />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
