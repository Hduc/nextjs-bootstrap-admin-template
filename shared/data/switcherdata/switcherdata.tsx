
import React, { ClassAttributes, InputHTMLAttributes, JSX, useState } from 'react'
import { getState, setState } from '@/shared/layouts-components/services/switcherServices';
import { MENUITEMS } from '@/shared/layouts-components/sidebar/nav';

const switcherSelector = (selector: any) => {

    if (typeof selector !== 'string' || selector.trim() === '') {
        return null;
    }
    return document?.querySelector<HTMLElement>(selector);
};
const switcherDoucmentIdSelector = (selector: string): HTMLElement | null => {
    return document.getElementById(selector);
};

const getDocumentElement = (): HTMLElement => {
    return document.documentElement;
};

export const updateTheme = (themeType: any, clicked: string | boolean) => {
    const newState = {
        dataThemeMode: themeType === "dark" ? "dark" : "light",
        dataHeaderStyles: themeType === "transparent" ? "transparent" : "transparent",
        dataMenuStyles: themeType === "dark" ? "dark" : "transparent",
        bodyBg: "",
        bodyBg2: "",
        inputBorder: "",
        formControlBg: '',
        lightRgb: "",
        gray: ""
    }
    setState(newState)
    localStorage.setItem(`foxyux${themeType}Theme`, themeType);
    localStorage.removeItem(`foxyux${themeType === "dark" ? "transparent" : "dark"}Theme`);

    if (clicked === 'clicked') {
        localStorage.removeItem("bodyBg");
        localStorage.removeItem("bodyBg2");
        localStorage.removeItem("bgImg");
        localStorage.removeItem("foxyuxheader");
        localStorage.removeItem("foxyuxmenu");
        localStorage.removeItem("lightRgb");
        localStorage.removeItem("formControlBg")
    }

}

export const setDirection = (direction: 'ltr' | 'rtl') => {
    const newState = {
        dir: direction
    };

    setState(newState);

    // Manage localStorage based on the direction
    if (direction === 'rtl') {
        localStorage.setItem("foxyuxrtl", 'rtl');
        localStorage.removeItem("foxyuxltr");
    } else {
        localStorage.removeItem("foxyuxrtl");
    }
};

export function closeMenu() {
    const closeMenudata = (items: any) => {
        items?.forEach((item: any) => {
            item.active = false;
            closeMenudata(item.children);
        });
    };
    closeMenudata(MENUITEMS);
}

export const updateLayout = (layoutType: string) => {
    setTimeout(() => {
        switcherSelector('')?.click();
    }, 100);

    const newState = {
        dataNavLayout: layoutType === "horizontal" ? "horizontal" : "vertical",
        dataVerticalStyle: layoutType === "vertical" ? "doublemenu" : "",
        dataNavStyle: layoutType === "horizontal" ? "menu-click" : "",
    };

    setState(newState);
    localStorage.setItem('foxyuxLayout', layoutType);

    if (layoutType === "vertical") {
        localStorage.removeItem('foxyuxnavstyles');
    } else {
        localStorage.removeItem("foxyuxverticalstyles");
    }

    const Sidebar: HTMLElement | null = switcherSelector('.main-menu');
    if (Sidebar) {
        Sidebar.style.marginInline = '0px';
    }

    //closeMenu();

};

export const updateNavStyle = (actionType: any, toggledState: any) => {

    const newState = {
        dataNavStyle: actionType,
        toggled: toggledState,
        dataVerticalStyle: "",
    }

    setState(newState);
    localStorage.setItem('foxyuxnavstyles', actionType);
    localStorage.removeItem('foxyuxverticalstyles')

    if (actionType === "icon-click" || actionType === "icon-hover") {
        const Sidebar: HTMLElement | null = switcherSelector('.main-menu');
        if (Sidebar) {
            Sidebar.style.marginInline = '0px';
        }
    }

    //closeMenu()
};

export const DefaultMenu = () => {
    const newState = {
        dataVerticalStyle: "overlay",
        dataNavLayout: "vertical",
        toggled: "",
        dataNavStyle: "",
    }
    setState(newState);
    localStorage.setItem('foxyuxverticalstyles', 'default');
    localStorage.removeItem('foxyuxnavstyles');
};


export const ClosedMenu = () => {
    const newState = {
        dataNavLayout: "vertical",
        dataVerticalStyle: "closed",
        toggled: "close-menu-close",
    }
    setState(newState);
    localStorage.setItem('foxyuxverticalstyles', 'closed');
    localStorage.removeItem('foxyuxnavstyles');
};


const IconTextOpenFn = () => {
    let html = getDocumentElement();
    if (html.getAttribute('data-toggled') === 'icon-text-close') {
        html.setAttribute('data-icon-text', 'open');
    }
}


const IconTextCloseFn = () => {
    let html = getDocumentElement();
    if (html.getAttribute('data-toggled') === 'icon-text-close') {
        html.removeAttribute('data-icon-text');
    }
}

export const IconText = () => {
    const newState = {
        dataNavLayout: "vertical",
        dataVerticalStyle: "icontext",
        toggled: "icon-text-close",
        dataNavStyle: "",
    }
    setState(newState);
    localStorage.setItem('foxyuxverticalstyles', 'icontext');
    localStorage.removeItem('foxyuxnavstyles');
    const MainContent = switcherSelector('.main-content');
    const appSidebar = switcherSelector('.app-sidebar');

    appSidebar?.addEventListener('click', () => {
        IconTextOpenFn();
    });

    MainContent?.addEventListener('click', () => {
        IconTextCloseFn();
    });
};

export const iconOverlayFn = () => {
    const newState = {
        dataNavLayout: "vertical",
        dataVerticalStyle: "overlay",
        toggled: "icon-overlay-close",
    };
    setState(newState);
    localStorage.setItem('foxyuxverticalstyles', 'overlay');
    localStorage.removeItem('foxyuxnavstyles');
    const icon = switcherDoucmentIdSelector('switcher-icon-overlay') as HTMLInputElement;
    if (icon) {
        icon.checked = true;
    }

    const MainContent = switcherSelector('.main-content');
    const appSidebar = switcherSelector('.app-sidebar');


    if (appSidebar) {
        appSidebar.addEventListener("mouseenter", DetachedOpenFn);
        appSidebar.removeEventListener("mouseenter", DetachedOpenFn);
    }

    if (MainContent) {
        MainContent.addEventListener("mouseleave", DetachedCloseFn);
        MainContent.removeEventListener("mouseleave", DetachedCloseFn);
    }
};

function DetachedOpenFn() {
    let html = getDocumentElement();
    if (window.innerWidth > 992) {
        if (html.getAttribute('data-toggled') === 'detached-close' || html.getAttribute('data-toggled') === 'icon-overlay-close') {
            html.setAttribute('data-icon-overlay', 'open');
        }
    }
}

function DetachedCloseFn() {
    let html = getDocumentElement();
    if (window.innerWidth > 992) {
        if (html.getAttribute('data-toggled') === 'detached-close' || html.getAttribute('data-toggled') === 'icon-overlay-close') {
            html.removeAttribute('data-icon-overlay');
        }
    }
}

export const DetachedFn = () => {

    const newState = {
        dataNavLayout: "vertical",
        dataVerticalStyle: "detached",
        toggled: "detached-close",
        dataNavStyle: "",
    }
    setState(newState);
    localStorage.setItem('foxyuxverticalstyles', 'detached');
    localStorage.removeItem('foxyuxnavstyles');
    const MainContent = switcherSelector('.main-content');
    const appSidebar = switcherSelector('.app-sidebar');

    appSidebar?.addEventListener("click", () => {
        DetachedOpenFn();
    });
    MainContent?.addEventListener("click", () => {
        DetachedCloseFn();
    });
}

function closeMenu1() {
    const closeMenudata = (items: any) => {
        items?.forEach((item: any) => {
            item.active = true;
            closeMenudata(item.children);
        });
    };
    closeMenudata(MENUITEMS);
}

export const DoubletFn = () => {
    const newState = {
        dataNavLayout: "vertical",
        dataVerticalStyle: "doublemenu",
        toggled: "double-menu-open",
        dataNavStyle: "",
    }
    setState(newState);

    localStorage.setItem('foxyuxverticalstyles', 'doublemenu');
    localStorage.removeItem('foxyuxnavstyles');

    setTimeout(() => {
        if (!document.querySelector(".main-menu .slide.active ul")) {
            const theme = getState();
            const newState = {
                ...theme,
                toggled: "double-menu-close",
            }
            setState(newState)
        }
    }, 100);
    // closeMenu1();
};

export const setPageStyle = (style: 'regular' | 'classic' | 'modern' | 'flat') => {
    const newState = {
        dataPageStyle: style
    };

    setState(newState);
    localStorage.setItem(`foxyux${style}`, style.charAt(0).toUpperCase() + style.slice(1));

    const styles = ['regular', 'classic', 'modern', 'flat'];
    styles.forEach(item => {
        if (item !== style) {
            localStorage.removeItem(`foxyux${item}`);
        }
    });
};

export const setLayout = (layout: 'default' | 'fullwidth' | 'boxed') => {
    const newState = {
        dataWidth: layout
    };

    setState(newState);

    localStorage.setItem(`foxyux${layout}`, layout.charAt(0).toUpperCase() + layout.slice(1));

    const layouts = ['default', 'fullwidth', 'boxed'];
    layouts.forEach(item => {
        if (item !== layout) {
            localStorage.removeItem(`foxyux${item}`);
        }
    });
};

export const setMenuPosition = (position: 'fixed' | 'scrollable') => {
    const newState = {
        dataMenuPosition: position
    };

    setState(newState);

    // Set the corresponding menu position in localStorage and remove the other
    localStorage.setItem(`foxyuxmenu${position}`, `Menu${position.charAt(0).toUpperCase() + position.slice(1)}`);
    const otherPosition = position === 'fixed' ? 'scrollable' : 'fixed';
    localStorage.removeItem(`foxyuxmenu${otherPosition}`);
};

export const setHeaderPosition = (position: 'fixed' | 'scrollable') => {
    const newState = {
        dataHeaderPosition: position
    };

    setState(newState);

    localStorage.setItem(`foxyuxheader${position}`, `Header${position.charAt(0).toUpperCase() + position.slice(1)}`);
    const otherPosition = position === 'fixed' ? 'scrollable' : 'fixed';
    localStorage.removeItem(`foxyuxheader${otherPosition}`);
};

export const setMenuStyle = (style: string) => {

    localStorage.setItem('foxyuxmenu', style);

    const currentColor = localStorage.getItem('foxyuxmenu') || style
    const newState = {
        dataMenuStyles: currentColor
    };

    setState(newState);
    localStorage.setItem('foxyuxmenu', style);

};

export const setHeaderStyle = (style: 'light' | 'dark' | 'color' | 'gradient' | 'transparent') => {
    const newState = {
        dataHeaderStyles: style
    };

    setState(newState);
    localStorage.setItem('foxyuxheader', style);

};

export const setPrimaryColor = (rgb: string) => {
    const newState = {
        colorPrimaryRgb: rgb
    };

    setState(newState);
    localStorage.setItem('primaryRGB', rgb);
};


export const updateBackgroundColor = (bgColor1: any, bgColor2: any,clicked:any) => {
    const newState = {
        bodyBg: bgColor1,
        bodyBg2: bgColor2,
        inputBorder: 'rgba(255,255,255,0.1)',
        lightRgb: bgColor2,
        formControlBg: `rgb(${bgColor2})`,
        dataThemeMode: 'dark',
        dataMenuStyles: 'dark',
        dataHeaderStyles: 'dark',
        gray: 'rgba(255,255,255,0.1)',
    };

    setState(newState);

    localStorage.setItem('bodyBg', bgColor1);
    localStorage.setItem('bodyBg2', bgColor2);
    localStorage.setItem('lightRgb', bgColor2);
    localStorage.setItem('formControlBg', `rgb(${bgColor2})`);
    localStorage.removeItem("foxyuxlightTheme");
    localStorage.removeItem("foxyuxdarkTheme");
    if (clicked === 'clicked') {
        localStorage.removeItem('foxyuxheader');
        localStorage.removeItem('foxyuxmenu');
    }

};


const ColorPicker = (props: JSX.IntrinsicAttributes & ClassAttributes<HTMLInputElement> & InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <div className='color-picker-input'>
            <input type="color" {...props} />
        </div>
    )
}

const hexToRgb = (hex: string) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
    } : null
}


export const ThemePrimaryColor = () => {
    const [color, updateColor] = useState("#FFFFFF");
    const [rgb, setRgb] = useState<{ colorPrimaryRgb: string }>({ colorPrimaryRgb: "" });

    const handleInput = (e: any) => {
        const color = e.target.value;
        let { r, g, b }: any = hexToRgb(color);

        // Update color only if it's different
        if (color !== updateColor) {
            updateColor(color);
        }

        // Only update RGB state if the value has changed
        if (rgb.colorPrimaryRgb !== `${r} ${g} ${b}`) {
            const newState = {
                colorPrimaryRgb: `${r} , ${g} , ${b}`,
            };
            setState(newState);
            localStorage.setItem("dynamiccolor", `${r}, ${g}, ${b}`);
        }
    };

    return (
        <div className='Themeprimarycolor theme-container-primary pickr-container-primary'>
            <ColorPicker onChange={handleInput} value={color} />
        </div>
    );
};

// color picker for background colors 

export const ThemeBackgroundColor = () => {
    const [state, updateState] = useState('#FFFFFF');

    const handleInput = (e: any) => {
        let { r, g, b }: any = hexToRgb(e.target.value);
        updateState(e.target.value);
        const newState = {
            bodyBg: `${r + 14}, ${g + 14}, ${b + 14}`,
            bodyBg2: `${r}, ${g}, ${b}`,
            inputBorder: "rgba(255,255,255,0.1)",
            lightRgb: `${r + 5} ${g + 5} ${b + 5}`,
            formControlBg: `rgb(${r} ${g} ${b})`,
            dataThemeMode: "dark",
            dataHeaderStyles: "dark",
            dataMenuStyles: "dark",
            gray: `rgb(${r} ${g} ${b})`
        }
        setState(newState);

        localStorage.setItem("bodyBg", `${r}, ${g}, ${b}`);
        localStorage.setItem("bodyBg2", `${r + 14}, ${g + 14}, ${b + 14}`);
        localStorage.setItem('lightRgb', `${r + 5} ${g + 5} ${b + 5}`)
        localStorage.setItem('formControlBg', `rgb(${r} ${g} ${b})`)
        localStorage.removeItem("foxyuxmenu");
        localStorage.removeItem("foxyuxheader");
        localStorage.removeItem("foxyuxlightTheme");
        localStorage.removeItem("foxyuxdarkTheme");
        
    }

    return (
        <div className="Themebackgroundcolor">
            <ColorPicker onChange={handleInput} value={state} />
        </div>
    )

}

export const setBgImage = (bgImageNumber: any) => {
    const bgImgKey = `bgimg${bgImageNumber}`;

    const newState = {
        bgImg: bgImgKey
    };

    setState(newState);

    // Loop through bgimage keys to remove the ones that aren't selected
    for (let i = 1; i <= 5; i++) {
        if (i === bgImageNumber) {
            localStorage.setItem(`bgimage${i}`, bgImgKey);
        } else {
            localStorage.removeItem(`bgimage${i}`);
        }
    }
};

export const Reset = () => {
    const newState = {
        lang: "en",
        dir: "ltr",
        dataThemeMode: "light",
        dataMenuStyles: "transparent",
        dataNavLayout: "vertical",
        dataHeaderStyles: "transparent",
        dataVerticalStyle: "doublemenu",
        toggled: "",
        dataNavStyle: "",
        horStyle: "",
        dataPageStyle: "flat",
        dataWidth: "fullwidth",
        dataMenuPosition: "fixed",
        dataHeaderPosition: "fixed",
        iconOverlay: "",
        colorPrimaryRgb: "",
        bodyBg: "",
        bodyBg2: "",
        inputBorder: "",
        lightRgb: "",
        formControlBg: "",
        gray: "",
        bgImg: "",
        loader: "disable",
        iconText: "",
        body: {
            class: ""
        }
    };

    setState(newState);
    localStorage.clear()

    const icon = switcherDoucmentIdSelector('switcher-default-menu') as HTMLInputElement;
    if (icon) {
        icon.checked = true;
    }
};

export const Reset1 = () => {
    const newState = {
        lang: "en",
        dir: "ltr",
        dataThemeMode: "light",
        dataMenuStyles: "light",
        dataNavLayout: "horizontal",
        dataHeaderStyles: "light",
        dataVerticalStyle: "overlay",
        toggled: "",
        dataNavStyle: "menu-click",
        horStyle: "",
        dataPageStyle: "regular",
        dataWidth: "fullwidth",
        dataMenuPosition: "fixed",
        dataHeaderPosition: "fixed",
        iconOverlay: "",
        colorPrimaryRgb: "",
        bodyBg: "",
        bodyBg2: "",
        inputBorder: "",
        lightRgb: "",
        formControlBg: "",
        gray: "",
        bgImg: "",
        loader: "disable",
        iconText: "",
        body: {
            class: ""
        }
    };

    setState(newState);
    localStorage.clear()

    const icon = switcherDoucmentIdSelector("switcher-default-menu") as HTMLInputElement;
    if (icon) {
        icon.checked = true;
    }
};


export const LocalStorageBackup = (setpageloading: any) => {
    // toggling the theme 
    (localStorage.foxyuxdarkTheme) ? updateTheme('dark', true) : '';
    (localStorage.foxyuxlightTheme) ? updateTheme('light', true) : '';
    //  toggling the direction 
    (localStorage.foxyuxrtl) ? setDirection('rtl') : '';
    // Page Styles:
    (localStorage.foxyuxregular) ? setPageStyle('regular') : '';
    (localStorage.foxyuxclassic) ? setPageStyle('classic') : '';
    (localStorage.foxyuxmodern) ? setPageStyle('modern') : '';
    (localStorage.foxyuxflat) ? setPageStyle('flat') : '';
    // Layout Width Styles:
    (localStorage.foxyuxfullwidth) ? setLayout('fullwidth') : '';
    (localStorage.foxyuxdefault) ? setLayout('default') : '';
    (localStorage.foxyuxboxed) ? setLayout('boxed') : '';
    // Menu Positions:
    (localStorage.foxyuxmenufixed) ? setMenuPosition('fixed') : '';
    (localStorage.foxyuxmenuscrollable) ? setMenuPosition('scrollable') : '';
    // Header Positions:
    (localStorage.foxyuxheaderfixed) ? setHeaderPosition('fixed') : '';
    (localStorage.foxyuxheaderscrollable) ? setHeaderPosition('scrollable') : '';
    // Menu With Background Image
    (localStorage.bgimage1) ? setBgImage(1) : '';
    (localStorage.bgimage2) ? setBgImage(2) : '';
    (localStorage.bgimage3) ? setBgImage(3) : '';
    (localStorage.bgimage4) ? setBgImage(4) : '';
    (localStorage.bgimage5) ? setBgImage(5) : '';
    // Vertical & Horizontal Menu Styles
    (localStorage.foxyuxnavstyles === "menu-click") ? updateNavStyle('menu-click', 'menu-click-closed') : '';
    (localStorage.foxyuxnavstyles === "menu-hover") ? updateNavStyle('menu-hover', 'menu-hover-closed') : '';
    (localStorage.foxyuxnavstyles === "icon-click") ? updateNavStyle('icon-click', 'icon-click-closed') : '';
    (localStorage.foxyuxnavstyles === "icon-hover") ? updateNavStyle('icon-hover', 'icon-hover-closed') : '';
    // toggling the layOut
    (localStorage.foxyuxLayout == 'horizontal') && updateLayout('horizontal');


    // Menu Colors:
    switch (localStorage.foxyuxmenu) {
        case 'light':
            setMenuStyle('light');
            break;
        case 'dark':
            setMenuStyle('dark');
            break;
        case 'color':
            setMenuStyle('color');
            break;
        case 'gradient':
            setMenuStyle('gradient');
            break;
        case 'transparent':
            setMenuStyle('transparent');
            break;
        default:
            break;
    }

    // Header Colors:

    switch (localStorage.foxyuxheader) {
        case 'light':
            setHeaderStyle('light');
            break;
        case 'dark':
            setHeaderStyle('dark');
            break;
        case 'color':
            setHeaderStyle('color');
            break;
        case 'gradient':
            setHeaderStyle('gradient');
            break;
        case 'transparent':
            setHeaderStyle('transparent');
            break;
        default:
            break;
    }

    // Theme Primary Colors
    switch (localStorage.primaryRGB) {
        case ' 42 ,16, 164':
            setPrimaryColor(' 42 ,16, 164');
            break;
        case '125 ,0, 189':
            setPrimaryColor('125 ,0, 189');
            break;
        case '4, 118, 141':
            setPrimaryColor('4, 118, 141');
            break;
        case '138, 0, 32':
            setPrimaryColor('138, 0, 32');
            break;
        case '9 ,124, 103':
            setPrimaryColor('9 ,124, 103');
            break;
        default:
            break;
    }

    // Theme background colors

    switch (localStorage.bodyBg) {
        case '0,8,52':
            updateBackgroundColor('0,8,52', ' 14,22,66',true);
            break;
        case '58, 0, 109':
            updateBackgroundColor('58, 0, 109', '72 ,14, 123',true);
            break;
        case '0 ,59, 70':
            updateBackgroundColor('0 ,59, 70', '14, 73, 84',true);
            break;
        case ' 65, 0, 0':
            updateBackgroundColor(' 65, 0, 0', '79 ,14, 14',true);
            break;
        case '1 ,77, 46':
            updateBackgroundColor('1 ,77, 46', '15 ,91, 60',true);
            break;
        default:
            break;
    }

    if (localStorage.dynamiccolor) {
        const dynamiccolor: any = localStorage.getItem('dynamiccolor')
        const newState = {
            colorPrimaryRgb: dynamiccolor,
        }
        setState(newState);
    }
    //Theme BAckground:
    if (localStorage.bodyBg) {
        const newState = {
            bodyBg: localStorage.bodyBg,
            bodyBg2: localStorage.bodyBg2,
            dataThemeMode: "dark",
            dataHeaderStyles: localStorage.foxyuxheader,
            lightRgb: localStorage.lightRgb,
            formControlBg: localStorage.formControlBg,
            inputBorder: localStorage.inputBorder,
            gray: localStorage.gray,
            dataMenuStyles: localStorage.foxyuxmenu 
        }
        setState(newState)

    }

    // Sidemenu Layout Styles:

    if (localStorage.foxyuxverticalstyles) {
        let verticalstyles = localStorage.getItem('foxyuxverticalstyles');

        switch (verticalstyles) {
            case 'default':
                let defaultId = switcherDoucmentIdSelector('switcher-default-menu') as HTMLInputElement;
                if (defaultId) {
                    defaultId.checked = true;
                }
                DefaultMenu();
                break;

            case 'closed':
                let closedId = switcherDoucmentIdSelector('switcher-icontext-menu') as HTMLInputElement;
                if (closedId) {
                    closedId.checked = true;
                };
                ClosedMenu();
                break;

            case 'icontext':
                let icontextId = switcherDoucmentIdSelector('switcher-icontext-menu') as HTMLInputElement;
                if (icontextId) {
                    icontextId.checked = true;
                };
                IconText();
                break;

            case 'overlay':
                let overlayId = switcherDoucmentIdSelector('switcher-detached') as HTMLInputElement;
                if (overlayId) {
                    overlayId.checked = true;
                };
                iconOverlayFn();
                break;

            case 'detached':
                let detachedId = switcherDoucmentIdSelector('switcher-detached') as HTMLInputElement;
                if (detachedId) {
                    detachedId.checked = true;
                };
                DetachedFn();
                break;

            case 'doublemenu':
                let doubleId = switcherDoucmentIdSelector('switcher-double-menu') as HTMLInputElement;
                if (doubleId) {
                    doubleId.checked = true;
                };
                DoubletFn();
                break;

            default:
                let defaultbutton = switcherDoucmentIdSelector('switcher-default-menu') as HTMLInputElement;
                if (defaultbutton) {
                    defaultbutton.checked = true;
                }
                break;
        }

    }

    setpageloading(true)
};

