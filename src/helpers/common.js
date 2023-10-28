const ChangeState = (state) => (key, value) => (e) => {
    state((p) => {
        return {
            ...p,
            [key]: value != null ? value : e?.target?.value,
        };
    });

    return true;
};

export default ChangeState