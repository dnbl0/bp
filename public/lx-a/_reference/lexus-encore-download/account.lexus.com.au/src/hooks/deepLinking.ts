// src/hooks/useDeepLinking.ts
import { useEffect } from "react";
import { Capacitor } from "@capacitor/core";
import { useNavigate } from "react-router-dom";
import { BranchDeepLinks, BranchInitEvent } from "capacitor-branch-deep-links";

// Remove console logs after testing complete
export const useDeepLinking = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (Capacitor.getPlatform() === "web") {
            // Don't register Branch listeners on web
            return;
        }

        const addUrlListener = () => {
            BranchDeepLinks.addListener("init", (event: BranchInitEvent) => {
                // Retrieve deeplink keys from 'referringParams' and evaluate the values to determine where to route the user
                // Check '+clicked_branch_link' before deciding whether to use your Branch routing logic
                if (event.referringParams["+clicked_branch_link"] && event.referringParams["$token"]) {
                    navigate("register?token=" + event.referringParams["$token"]);
                }
            });

            BranchDeepLinks.addListener("initError", (error: any) => {
                // eslint-disable-next-line no-console
                console.error(error);
            });
        };

        // checkInitialUrl();
        addUrlListener();
    }, [navigate]);
};
