const TIME_OUT = 3000 * 1000;

const statusError = {
    status: false,
    json: {
        error: ["연결이 원활하지 않습니다. 잠시 후 다시 시도해 주세요"]
    }
};

const requestPromise = (url, option) => {
    return fetch(url, option);
};

const timeoutPromise = () => {
    return new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), TIME_OUT));
};

const getPromise = async (url, option) => {
    return await Promise.race([
        requestPromise(url, option),
        timeoutPromise()
    ]);
};

export const getData = async (credentials) => {
    const option = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${credentials.accessToken}`
        }
    };

    const data = await getPromise('http://localhost:8080/userData?' +
        new URLSearchParams({ email: credentials.email }), option).catch(() => {
            return statusError;
        });

    if (parseInt(Number(data.status) / 100) === 2) {
        const status = data.ok;
        const code = data.status;
        const text = await data.text();
        const json = text.length ? JSON.parse(text) : "";

        return {
            status,
            code,
            json
        };
    } else {
        return statusError;
    }
};