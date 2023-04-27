import * as httpRequest from '~/utils/httpRequest';

export const search = async (q, type = 'less') => {
    try {
        const res = await httpRequest.get('users/search', {
            params: {
                q,
                type,
            },
        });
        //encodeURIComponent dùng để cho ng dùng nhập vào không bị ảnh hưởng các kí tự đặc biệt như & % =, những kí tự nhập vào sẽ bị mã hóa
        // .then((res) => res.json()) // chuyển đổi dữ liệu
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

search();
