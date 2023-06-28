export const setWindowSize = (width, height, device) => ({
    type: 'SET_WINDOW_SIZE',
    payload: { width, height, device },
});