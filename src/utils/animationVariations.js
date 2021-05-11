export const sidebar = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 200}px at 100% 0px)`,
        transition: {
            type: "spring",
            stiffness: 20,
            restDelta: 2
        }
    }),
    closed: {
        clipPath: "circle(10px at 100% 0px)",
        transition: {
            delay: 0.3,
            type: "spring",
            stiffness: 400,
            damping: 40
        }
    }
};

export const variantsButtons = {
    open: {
        opacity: 1,
        x:0,
        transition: {
            y: { stiffness: 1000, velocity: -100 }
        }
    },
    closed: {
        opacity: 0,
        x:200,
        transition: {
            y: { stiffness: 1000 }
        }
    }
};

export const variantsTitle = {
    hidden : {
        opacity: 0,
        y:50
    },
    visible: {
        opacity:1,
        y:0,
        transition: {
            delay: 0.3
        }
    }
}

export const variantsItems = {
    hidden : {
        opacity: 0,
        x:-50
    },
    visible: {
        opacity:1,
        x:0,
        transition: {
            delay: 0.1
        }
    }
}

export const variantsArrow = {
    hidden : {
        opacity: 0,
        x:-50
    },
    visible: {
        opacity:1,
        x:0,
        transition: {
            delay: 0.1
        }
    }
}