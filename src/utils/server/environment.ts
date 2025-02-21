const isDevelopment = process.env.NAIS_CLUSTER_NAME === 'dev-gcp';
export const isLocal = process.env.NODE_ENV === 'development';

export const getServerSideEnvironment = () => {
  if (isDevelopment) {
    return 'dev';
  }

  if (isLocal) {
    return 'local';
  }

  return 'prod';
};
