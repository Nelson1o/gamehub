const REQUIRED_ENV = ["VITE_RAWG_API_KEY"] as const;

export const validateEnv = () => {
  for (const env of REQUIRED_ENV) {
    if (!import.meta.env[env]) {
      throw new Error(`Отсутствует токен доступа: ${env}`);
    }
  }
};
