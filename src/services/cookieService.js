const cookieService = {

    set: (name, value, days = 7) => {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = "; expires=" + date.toUTCString();
        }

        const stringValue = typeof value === "object" ? JSON.stringify(value) : value;

        document.cookie = name + "=" + encodeURIComponent(stringValue) + expires + "; path=/; SameSite=Strict";
    },

    get: (name) => {
        const nameEQ = name + "=";
        const ca = document.cookie.split(";");

        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === " ") c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) {
                const value = decodeURIComponent(c.substring(nameEQ.length, c.length));

                try {
                    return JSON.parse(value);
                } catch (e) {
                    return value;
                }
            }
        }
        return null;
    },


    remove: (name) => {
        document.cookie = name + "=; Max-Age=-99999999; path=/; SameSite=Strict";
    }
};

export default cookieService;