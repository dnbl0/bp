import { Guest } from "lexus-style-guide/Components/Account/Guest";
import { AccountManager } from "lexus-style-guide/Components/Account/Providers/AccountManager";

const fetchGuestAsync = async () => {
    const guest = await AccountManager.current.getGuestAsync(false);
    if (guest) {
        postRefreshSuccessMessage(guest);
        return;
    }

    postRefreshFailureMessage();
};

export const refreshGuestSession = () => {
    try {
        fetchGuestAsync();
    } catch (e) {
        postRefreshFailureMessage();
        throw e;
    }
};

export const logoutGuest = () => {
    try {
        AccountManager.current.logOut();
        postLogoutSuccessMessage();
    } catch (err) {
        postLogoutFailureMessage();
        throw err;
    }
};

interface MessageWithType<T extends string> {
    type: T;
}

interface RefreshLoginSuccess extends MessageWithType<"refresh-success"> {
    message: string;
}

export const postRefreshSuccessMessage = (guest: Guest): void => {
    const data: RefreshLoginSuccess = {
        type: "refresh-success",
        message: guest.idToken,
    };

    window.parent.postMessage(data, "*");
};

export const postRefreshFailureMessage = (): void => {
    const data: MessageWithType<"refresh-failure"> = {
        type: "refresh-failure",
    };

    window.parent.postMessage(data, "*");
};

export const postLogoutSuccessMessage = (): void => {
    const data: MessageWithType<"logout-success"> = {
        type: "logout-success",
    };

    window.parent.postMessage(data, "*");
};

export const postLogoutFailureMessage = (): void => {
    const data: MessageWithType<"logout-failure"> = {
        type: "logout-failure",
    };

    window.parent.postMessage(data, "*");
};

interface SuccessLogin extends MessageWithType<"login-success"> {
    message: string;
}

export const postLoginMessage = (guest: Guest): void => {
    const data: SuccessLogin = {
        type: "login-success",
        message: guest.idToken,
    };

    window.parent.postMessage(data, "*");
};
