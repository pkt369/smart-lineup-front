const config = {
    frontend: import.meta.env.VITE_FRONTEND,
    backend: import.meta.env.VITE_BACKEND,
    TOSS_CLIENT_KEY: import.meta.env.VITE_TOSS_CLIENT_KEY,
};

export default config;