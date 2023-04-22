const LS = {
    getAllItems: () => chrome.storage.local.get(),
    getItem: async key => (await chrome.storage.local.get(key))[key],
    setItem: (key, val) => chrome.storage.local.set({ [key]: val }),
    removeItems: keys => chrome.storage.local.remove(keys),
};

window.addEventListener('load', function () {


    const header = document.querySelector('header');
    const childNodes = header.childNodes;
    const position = childNodes.length - 6;
    const fourthFromEnd = childNodes[position];

    const item = document.createElement('div');
    item.classList.add("Header-item", "mr-0", "mr-md-3", "flex-order-1", "flex-md-order-none");


    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttributeNS(null, "width", "16");
    svg.setAttributeNS(null, "height", "16");
    svg.setAttributeNS(null, "viewBox", "0 0 16 16");
    svg.setAttributeNS(null, "class", "octicon oticon-brush");


    const image = document.createElementNS("http://www.w3.org/2000/svg", "image");
    image.setAttributeNS(null, "href", chrome.runtime.getURL('./assets/customize-icon.svg'));
    image.setAttributeNS(null, "width", "16");
    image.setAttributeNS(null, "height", "16");
    svg.appendChild(image);


    const container = document.createElement('div');
    container.classList.add("Header-link", "notification-indicator", "position-relative", "tooltipped", "tooltipped-sw");
    container.appendChild(svg);


    // <div class="Header-item mr-0 mr-md-3 flex-order-1 flex-md-order-none">
    //     <notification-indicator data-channel="eyJjIjoibm90aWZpY2F0aW9uLWNoYW5nZWQ6ODE3NTQzNTkiLCJ0IjoxNjgyMTc1NTgxfQ==--b52e125fe49040affcae3f159c2d06fab3ae5878f63ad8ef0116a43ef55fa538" data-indicator-mode="none" data-tooltip-global="You have unread notifications" data-tooltip-unavailable="Notifications are unavailable at the moment." data-tooltip-none="You have no unread notifications" data-fetch-indicator-src="/notifications/indicator" data-fetch-indicator-enabled="true" data-view-component="true" class="js-socket-channel" data-fetch-retry-delay-time="500" data-catalyst="">
    //         <a id="AppHeader-notifications-button" href="/notifications" class="Header-link notification-indicator position-relative tooltipped tooltipped-sw" data-hotkey="g n" data-target="notification-indicator.link" aria-label="You have no unread notifications" data-analytics-event="{&quot;category&quot;:&quot;Header&quot;,&quot;action&quot;:&quot;go to notifications&quot;,&quot;label&quot;:&quot;icon:read&quot;}">
    //             <span data-target="notification-indicator.badge" class="mail-status unread" hidden="">
    //             </span>
    //             <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-bell">
    //                 <path d="M8 16a2 2 0 0 0 1.985-1.75c.017-.137-.097-.25-.235-.25h-3.5c-.138 0-.252.113-.235.25A2 2 0 0 0 8 16ZM3 5a5 5 0 0 1 10 0v2.947c0 .05.015.098.042.139l1.703 2.555A1.519 1.519 0 0 1 13.482 13H2.518a1.516 1.516 0 0 1-1.263-2.36l1.703-2.554A.255.255 0 0 0 3 7.947Zm5-3.5A3.5 3.5 0 0 0 4.5 5v2.947c0 .346-.102.683-.294.97l-1.703 2.556a.017.017 0 0 0-.003.01l.001.006c0 .002.002.004.004.006l.006.004.007.001h10.964l.007-.001.006-.004.004-.006.001-.007a.017.017 0 0 0-.003-.01l-1.703-2.554a1.745 1.745 0 0 1-.294-.97V5A3.5 3.5 0 0 0 8 1.5Z"></path>
    //             </svg>
    //         </a>
    //     </notification-indicator>
    // </div>




    item.appendChild(container);

    header.insertBefore(item, fourthFromEnd);




    const container_profile = document.querySelector('.js-feature-preview-indicator-container').querySelector("details-menu");
    const a = document.createElement('a');
    a.role = 'menuitem';
    a.classList.add('dropdown-item', 'btn-customize');
    a.innerText = 'Customize';

    a.addEventListener('click', async function () {
        const div_customize = document.querySelector('#div-customize');
        if (!div_customize) {
            const response = await fetch(chrome.runtime.getURL('popup.html'));
            const html = await response.text();
            document.body.insertAdjacentHTML('beforeend', html);
            const script = document.createElement('script');
            script.src = chrome.runtime.getURL('popup.js');
            document.body.appendChild(script);

            const form_customize = document.querySelector('#form-customize');
            form_customize.addEventListener('submit', function (e) {
                e.preventDefault();
                const skin = document.querySelector('#select-skin').value;
                LS.setItem('skin', skin);
                changeStyle(skin);
            });
        } else {
            div_customize.style.display = 'block';
        }
    });
    container_profile.prepend(a);


    LS.getItem('skin').then(skin => {
        skin && changeStyle(skin);
    });
});


function changeStyle(skin) {
    let root = document.documentElement;
    if (skin == "purple") {
        root.style.setProperty('--color-accent-fg', '#c460f1');
    } else if (skin == "yellow") {
        root.style.setProperty('--color-accent-fg', '#FFD700');
    }
}