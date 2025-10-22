const resetMutation = (e, mutation) => {
    const field = e.target.name;
    if (mutation.isError) {
        if (mutation.error?.response?.data?.error || mutation.error.message === 'Network Error') {
            return mutation.reset();
        }

        if (mutation.error?.response?.data?.errors[field].message) {
            return mutation.reset();
        }
    }
};

export default resetMutation;
