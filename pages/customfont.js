import localFont from 'next/font/local';
import { Poppins } from 'next/font/google';
 
// Font files can be colocated inside of `pages`
export const majallab = localFont({ 
    src: './majallab-webfont.woff2',
    variable: '--font-majallab',
});
export const poppins = Poppins({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-poppins',
    weight: ['400', '500', '600'],
});

