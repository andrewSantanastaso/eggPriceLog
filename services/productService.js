const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL


const loadProducts = async () => {
    try {
        console.log(BACKEND_URL);
        const res = await fetch(`${BACKEND_URL}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.message);
        }

        return data;

    } catch (error) {
        return { error: error.message };
    }
}

export { loadProducts }