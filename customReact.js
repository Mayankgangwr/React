//CustomReact.js

const customProps = (props, domElement) => {
    Object.keys(props).forEach((key) => {
        if (key === 'style') {
            const styles = props[key];
            Object.keys(styles).forEach((styleKey) => {
                domElement.style[styleKey] = styles[styleKey];
            });
        } else if (typeof props[key] === 'function') {
            domElement.addEventListener(key.substring(2).toLowerCase(), props[key]);
        } else {
            domElement.setAttribute(key, props[key]);
        }
    });
};

const customRender = (reactElement, container) => {
    if (Array.isArray(reactElement)) {
        reactElement.forEach((element) => customRender(element, container));
        return;
    }

    const domElement = document.createElement(reactElement.type);

    if (reactElement.props) {
        customProps(reactElement.props, domElement);
    }

    if (Array.isArray(reactElement.children)) {
        reactElement.children.forEach((child) => customRender(child, domElement));
    } else if (typeof reactElement.children === 'object') {
        customRender(reactElement.children, domElement);
    } else {
        domElement.innerHTML = reactElement.children;
    }

    container.appendChild(domElement);
};

const reactElements = [
    {
        type: 'div',
        props: {
            style: {
                width: '50%', display: 'flex', flexDirection: 'column', padding: "8px",
                boxShadow: "1px 2px 3px #ababab"
            },
        },
        children: [
            {
                type: 'p',
                props: {
                    style: { color: 'blue', fontWeight: 'bold', padding: '0px', margin: '0px' },
                    onClick: () => alert('Clicked'),
                },
                children: 'You can check if a value is an object in JavaScript',
               },
            {
                type: 'a',
                props: {
                    href: 'https://google.com',
                    target: '_blank',
                    style: {
                        textAlign: 'center', boxShadow: "1px 1px 4px #ababab", padding: "6px 0px", marginTop: '10px', textDecoration: 'none', fontWeight: '900',
                        borderRadius: '5px', background: '#626d7d94', color: '#000'
                    },
                },
                children: 'Visit Google',
            },
        ]
    }
    //-------
];

const root = document.querySelector('#root');

customRender(reactElements, root);

