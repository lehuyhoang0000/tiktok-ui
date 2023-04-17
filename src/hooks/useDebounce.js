import { useEffect, useState } from 'react';

function useDebounce(value, delay) {
    const [deboucedValue, setDeboucedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDeboucedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value]);

    return deboucedValue;
}

export default useDebounce;
