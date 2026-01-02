import { RootState } from "./redux/store/store";

export const loadState = (): RootState | undefined => {
    try {
        const serializedState = localStorage.getItem('state');

        if (serializedState === null) {
            return undefined;
        }

        return JSON.parse(serializedState);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state: RootState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (event) {
        console.warn(event);
    }
};
