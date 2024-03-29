const LS = {
    getAllItems: () => chrome.storage.local.get(),
    getItem: async key => (await chrome.storage.local.get(key))[key],
    setItem: (key, val) => chrome.storage.local.set({[key]: val}),
    removeItem: keys => chrome.storage.local.remove(keys),
};

LS.getItem('skin').then(skin => {
    skin && changeStyle(skin);
});

const changeStyle = (skin) => {
    const linkTagOld = document.querySelector('#skin');
    if(linkTagOld) {
        linkTagOld.href = chrome.runtime.getURL(`modeles/${skin}.css`);
    } else {
        const linkTag = document.createElement('link');
        linkTag.rel = 'stylesheet';
        linkTag.type = 'text/css';
        linkTag.id = 'skin';
        linkTag.href = chrome.runtime.getURL(`modeles/${skin}.css`);
        document.head.appendChild(linkTag);
    }
}

const header = document.querySelector('header');
const globalBar = header.querySelector('.AppHeader-globalBar.js-global-bar');
const globalBarEnd = globalBar.querySelector('.AppHeader-globalBar-end');
const AppHeaderUser = globalBarEnd.querySelector('.AppHeader-user');


const createButton = () => {
    const button = document.createElement('div');
    button.classList.add("mr-0");
    button.id = "iconPersonalize";
    button.classList.add("AppHeader", "Button", "Button--iconOnly", "Button--secondary", "Button--medium", "AppHeader-button", "color-fg-muted");
    return button;
}


const createIcon = () => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttributeNS(null, "width", "16");
    svg.setAttributeNS(null, "height", "16");
    svg.setAttributeNS(null, "viewBox", "0 0 16 16");
    svg.setAttributeNS(null, "class", "octicon oticon-brush");
    const logo = document.createElementNS("http://www.w3.org/2000/svg", "image");
    logo.setAttributeNS(null, "href", chrome.runtime.getURL('./assets/customize-icon.svg'));
    logo.setAttributeNS(null, "width", "16");
    logo.setAttributeNS(null, "height", "16");
    svg.appendChild(logo);
    return svg;
}


const createTooltip = () => {
    const tooltip = document.createElement('tool-tip');
    tooltip.setAttribute('for', 'iconPersonalize');
    tooltip.setAttribute('data-direction', 's');
    tooltip.setAttribute('data-type', 'label');
    tooltip.setAttribute('data-view-component', 'true');
    tooltip.classList.add('position-absolute', 'sr-only');
    tooltip.setAttribute('aria-hidden', 'true');
    tooltip.setAttribute('role', 'tooltip');
    tooltip.style.left = '-6.71094px';
    tooltip.style.top = '42px';
    tooltip.innerText = 'Personalize';
    return tooltip;
}

const button = createButton();
const icon = createIcon();
const tooltip = createTooltip();
button.appendChild(icon);
button.appendChild(tooltip);


button.addEventListener('click', async function () {
    const div_customize = document.querySelector('#div-customize');
    if (!div_customize) {
        const response = await fetch(chrome.runtime.getURL('popup.html'));
        const html = await response.text();
        document.body.insertAdjacentHTML('beforeend', html);
        const script = document.createElement('script');
        script.src = chrome.runtime.getURL('popup.js');
        document.body.appendChild(script);


        //event submit du formulaire de personnalisation
        const form_customize = document.querySelector('#form-customize');
        if (form_customize) {
            form_customize.addEventListener('submit', function (e) {
                e.preventDefault();
                const skin = document.querySelector('#select-skin').value;
                LS.setItem('skin', skin);
                changeStyle(skin);
            });
        }

        //event click du bouton reset style
        const btnReset = document.querySelector('#reset-btn');
        if (btnReset) {
            btnReset.addEventListener('click', function () {
                LS.removeItem('skin');
                const linkTag = document.querySelector('#skin');
                linkTag && linkTag.remove();
            });
        }


    } else {
        div_customize.style.display = 'block';
    }
});

globalBarEnd.insertBefore(button, AppHeaderUser);