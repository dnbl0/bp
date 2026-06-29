import * as React from "react";
import { useSelector } from "react-redux";
import {
    type HeadlessSiteContextRaw,
    primaryNavigationDataSelector,
    PrimaryNavRawDataWithContext,
} from "ReduxSlices/general";
import {
    PrimaryNav,
    PrimaryNavContainer,
    type PrimaryNavData,
    convertToPrimaryNavData,
    GlobalStylesScope,
    AuthenticationContextProvider,
    darkTheme,
    usePrimaryNavControls,
} from "@tmca/lexus-kit/css-in-js";
import {
    isDisabledRouteForDemoUser,
    isDisabledRouteForExpiredMembership,
    isDisabledRouteForErrorVehicle,
    RouteSection,
    routeString,
    isDisabledRouteForVehicleError,
} from "Helpers/routes";
import { useSettingsPromise } from "Hooks/usePromiseState";
import { useNavigate } from "react-router-dom";
import {
    type HeadlessSiteProps,
    LexusHeadlessSiteContext,
} from "Components/PrimaryNavigation/LexusHeadlessSiteContext";
import { useCallback, useContext, useMemo } from "react";
import { SearchPopoverWidget, SearchPreviewProps } from "Components/PrimaryNavigation/modules/NavigationSearch";
import { WidgetComponentProps } from "@sitecore-search/react/dist/esm/types";
import { MobileSearchResultsWidget } from "Components/PrimaryNavigation/modules/MobileSearchResultsWidget";
import { WidgetsProvider } from "@sitecore-search/react";
import "./PrimaryNavigation.scss";
import { dashboardBannerStatesSelector } from "ReduxSlices/user";
import { UserEncoreStatus } from "Helpers/users";
import { FetchVehiclesPayload, vehiclesSelector } from "ReduxSlices/vehicle";
import { isUnverified } from "Helpers/vehicle";
import { isDemoUser } from "Helpers/demoUser";
import { useDemoBannerHeight } from "Hooks/helpers";

type Environment = "prod" | "prodEu" | "apse2";

// TODO hardcode ENCORE_URL for now until authenticationUrl is refactored
const ENCORE_URL = typeof window !== "undefined" ? location.protocol + "//" + location.host : "";

const disableRoutes = (
    data: PrimaryNavData | undefined,
    vehicles: FetchVehiclesPayload | undefined,
    isUnverifiedVehicle: boolean,
    membershipStatus: UserEncoreStatus,
    isDemo: boolean
) => {
    const disabledMenuItemsData = data;
    disabledMenuItemsData?.mainMenu?.menus.forEach(menu => {
        if (menu.type === "EncoreMenu") {
            menu.menuItems.forEach(item => {
                if (
                    item?.link?.url &&
                    (isDisabledRouteForExpiredMembership(item.link.url, membershipStatus) ||
                        isDisabledRouteForErrorVehicle(item.link.url, vehicles, isUnverifiedVehicle) ||
                        isDisabledRouteForDemoUser(item.link.url, isDemo) ||
                        isDisabledRouteForVehicleError(item.link.url, vehicles))
                ) {
                    item.disabled = true;
                }
            });
        }
    });

    return disabledMenuItemsData;
};

const SearchForm: React.FC<{
    links: PrimaryNavData["searchLinks"];
    searchSettings: PrimaryNavData["searchSettings"];
    Widget: React.FC<SearchPreviewProps & WidgetComponentProps>;
    autoFocusSearchInput?: boolean;
    className?: string;
}> = ({ links, searchSettings, Widget, autoFocusSearchInput, className }) => {
    const { searchPage } = useContext(LexusHeadlessSiteContext) || {};
    const {
        rfkId,
        maxPreviewResults,
        resultsBlockAriaLabel,
        searchAllLinkText,
        searchFieldPlaceholder,
        searchSuggestionName,
    } = searchSettings || {};

    return !rfkId || !searchPage ? null : (
        <form method="GET" action={searchPage} className={className}>
            <Widget
                autoFocusSearchInput={autoFocusSearchInput}
                rfkId={rfkId}
                placeholderText={searchFieldPlaceholder}
                searchProps={{
                    maxResults: maxPreviewResults,
                    searchAllText: searchAllLinkText,
                    resultsAriaLabel: resultsBlockAriaLabel,
                    suggestionName: searchSuggestionName,
                    linkBlocks: links,
                }}
            />
        </form>
    );
};

const SearchButton: React.FC = () => {
    const { pushActiveMenuId } = usePrimaryNavControls();

    const handleOnClick = useCallback(() => {
        pushActiveMenuId("search-menu");
    }, [pushActiveMenuId]);

    return (
        <button className="lx-nav-search-menu-trigger" onClick={handleOnClick}>
            Search
        </button>
    );
};

const isSearchEnvironment = (str: string | undefined): str is Environment =>
    (str && ["prod", "prodEu", "apse2"].includes(str)) || false;

const convertContext = (rawData: HeadlessSiteContextRaw, baseUrl: string): HeadlessSiteProps => ({
    publicUrl: rawData.config.publicUrl?.value,
    searchPage: baseUrl + rawData.config.searchPage?.value,
    searchEntity: rawData.config.searchEntity?.value,
    searchIndexSource: rawData.config.searchIndexSource?.value.split(","),
    searchCustomerKey: rawData.config.searchCustomerKey?.value,
    searchEnv: rawData.config.searchEnv?.value,
    serverApiHost: rawData.config.serverApiHost?.value,
    encoreBaseUrl: rawData.encoreBaseUrl?.value,
    loginUrl: rawData.loginUrl?.value,
    logoutUrl: rawData.logoutUrl?.value,
    refreshUrl: rawData.refreshUrl?.value,
    encoreVehicleUnitApiUrl: rawData.encoreVehicleUnitApiUrl?.value,
    encoreGuestApiUrl: rawData.encoreGuestApiUrl?.value,
});

const Navigation: React.FC<{ data: PrimaryNavData; isTwoStepSearch: boolean }> = ({ data, isTwoStepSearch }) => {
    const { searchCustomerKey, searchEnv, serverApiHost, searchIndexSource } =
        useContext(LexusHeadlessSiteContext) || {};

    const searchConfig =
        searchCustomerKey && isSearchEnvironment(searchEnv) && serverApiHost && searchIndexSource?.length
            ? {
                  env: searchEnv,
                  customerKey: searchCustomerKey,
                  serviceHost: serverApiHost,
              }
            : null;

    const disabledSearchSettings = useMemo(
        () => ({ ...data.searchSettings, showSearch: false }),
        [data.searchSettings]
    );
    const generalSettings = useSettingsPromise(settings => settings.general);
    const mainsiteBaseUrl = generalSettings?.mainsiteBaseUrl
        ? generalSettings?.mainsiteBaseUrl
        : generalSettings?.lexusBrandBaseUrl;

    const bannerHeightRef = React.useRef<number>(0);
    useDemoBannerHeight(bannerHeightRef);

    return searchConfig ? (
        <WidgetsProvider {...searchConfig}>
            <PrimaryNav mainMenuLogoHref={mainsiteBaseUrl} offset={bannerHeightRef.current} {...data}>
                <PrimaryNav.SearchPopover>
                    <SearchForm
                        links={data.searchLinks}
                        searchSettings={data.searchSettings}
                        Widget={SearchPopoverWidget}
                        autoFocusSearchInput
                        className="lx-nav-search__form-desktop"
                    />
                </PrimaryNav.SearchPopover>
                <PrimaryNav.SearchMenuTrigger>
                    {isTwoStepSearch ? (
                        <SearchButton />
                    ) : (
                        <SearchForm
                            links={data.searchLinks}
                            searchSettings={data.searchSettings}
                            Widget={SearchPopoverWidget}
                        />
                    )}
                </PrimaryNav.SearchMenuTrigger>
                {isTwoStepSearch && (
                    <PrimaryNav.SearchMenu>
                        <SearchForm
                            links={data.searchLinks}
                            searchSettings={data.searchSettings}
                            Widget={MobileSearchResultsWidget}
                        />
                    </PrimaryNav.SearchMenu>
                )}
            </PrimaryNav>
        </WidgetsProvider>
    ) : (
        <PrimaryNav mainMenuLogoHref={mainsiteBaseUrl} {...data} searchSettings={disabledSearchSettings} />
    );
};

const PrimaryNavigationSC10: React.FC = () => {
    //#region hooks
    const dataJson = useSelector(primaryNavigationDataSelector);
    const isDemo = isDemoUser();
    const generalSettings = useSettingsPromise(settings => settings.general);
    //#endregion

    const vehicles = useSelector(vehiclesSelector);
    const isUnverifiedVehicle = isUnverified(vehicles) || false;
    const { membershipStatus } = useSelector(dashboardBannerStatesSelector);

    const navigate = useNavigate();
    const AUTHENTICATION_DATA = {
        config: {
            loginFormUrl: `${ENCORE_URL}/signin?type=iframe`,
            logoutUrl: `${ENCORE_URL}/silentsignout`,
            refreshUrl: `${ENCORE_URL}/refresh`,
            isAuthenticationHost: true,
        },
        onLogout: () => {
            navigate(routeString(RouteSection.SignOut));
        },
    };

    const data: PrimaryNavData | undefined = useMemo(() => {
        if (dataJson && dataJson.nav && "details" in dataJson.nav) {
            // TODO: JSON.parse(JSON.stringify(data)) required as we do mutate the object structure in LKit
            // we need to fix it. https://toyotaau.atlassian.net/browse/LEXNW-509
            const dataRaw: PrimaryNavRawDataWithContext = JSON.parse(JSON.stringify(dataJson));
            return convertToPrimaryNavData(dataRaw.nav);
        }
        return undefined;
    }, [dataJson]);
    //TODO: Remove this when two-step search is fully deployed for MVC and Encore. https://toyotaau.atlassian.net/browse/LEXUS-7224
    const isTwoStepSearch = !!dataJson?.nav?.settings?.isTwoStepSearch?.boolValue;
    const dataWithDisabledRoutes = disableRoutes(data, vehicles, isUnverifiedVehicle, membershipStatus, isDemo);
    const headlessSiteContext: HeadlessSiteProps | null = !dataJson?.context
        ? null
        : convertContext(
              dataJson.context,
              generalSettings?.mainsiteBaseUrl ?? generalSettings?.lexusBrandBaseUrl ?? ""
          );

    return dataWithDisabledRoutes ? (
        <GlobalStylesScope themeDefinition={darkTheme}>
            <PrimaryNavContainer
                initialIsFixedAtTop={false}
                initialIsSolidBackground={true}
                initialIsSolidContainer={true}
            >
                <AuthenticationContextProvider {...AUTHENTICATION_DATA}>
                    <LexusHeadlessSiteContext.Provider value={headlessSiteContext}>
                        <Navigation data={dataWithDisabledRoutes} isTwoStepSearch={isTwoStepSearch} />
                    </LexusHeadlessSiteContext.Provider>
                </AuthenticationContextProvider>
            </PrimaryNavContainer>
        </GlobalStylesScope>
    ) : null;
};

export default PrimaryNavigationSC10;
