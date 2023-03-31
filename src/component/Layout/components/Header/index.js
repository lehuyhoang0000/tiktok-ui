import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, faMagnifyingGlass, faSignIn } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/component/Popper';

import Button from '~/component/Button';
import styles from './Header.module.scss'
import images from '~/assets/images';
import { useEffect, useState } from 'react';
import AccountItem from '~/component/AccountItem';

const cx = classNames.bind(styles)

function Header() {
    const [searchResult, setSearchResult] = useState([])

    useEffect(() => {
        setTimeout(() => {
            setSearchResult([])
        }, 2000)
    }, [])

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img src={images.logo} alt="TikTok" />
                </div>

                <Tippy
                    interactive
                    visible={searchResult.length > 0}
                    render={(attrs) => (
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                <h4 className={cx('search-lable')}>
                                    Accounts
                                </h4>
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                            </PopperWrapper>
                        </div>
                    )}
                >
                    <div className={cx('search')}>
                        <input type="text" placeholder='Search accounts and videos' spellCheck={false} />
                        <button type="" className={cx('clear')}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                        <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />

                        <button className={cx('search-btn')}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </Tippy >
                <div className={cx('actions')}>
                    <Button text>
                        Upload
                    </Button>
                    <Button primary lefticon={<FontAwesomeIcon icon={faSignIn} />} >  {/* target='_blank / giúp chuyển sang trang web mới*/}
                        Log in
                    </Button>
                </div>
            </div>
        </header>
    )
}

export default Header;