import { useEffect, useState } from 'react';

// Small, reusable hook to detect mobile viewport (max-width: 767px)
export default function useIsMobile() {
    const [isMobile, setIsMobile] = useState(
        typeof window !== 'undefined' ? window.matchMedia('(max-width: 767px)').matches : false
    );

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const mq = window.matchMedia('(max-width: 767px)');
        const handler = (e) => setIsMobile(e.matches);
        if (mq.addEventListener) mq.addEventListener('change', handler);
        else mq.addListener(handler);
        return () => {
            if (mq.removeEventListener) mq.removeEventListener('change', handler);
            else mq.removeListener(handler);
        };
    }, []);

    return isMobile;
}
