const LS = {
    getAllItems: () => chrome.storage.local.get(),
    getItem: async key => (await chrome.storage.local.get(key))[key],
    setItem: (key, val) => chrome.storage.local.set({ [key]: val }),
    removeItems: keys => chrome.storage.local.remove(keys),
};

window.addEventListener('load', function () {
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
                LS.setItem('skin',skin);
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
    console.log(LS.getItem('skin'));
});


function changeStyle(skin) {
    let root = document.documentElement;
    if (skin == "purple") {
        root.style.setProperty('--color-accent-fg', '#c460f1');
    } else if (skin == "yellow") {
        root.style.setProperty('--color-accent-fg', '#FFD700');
    }
}