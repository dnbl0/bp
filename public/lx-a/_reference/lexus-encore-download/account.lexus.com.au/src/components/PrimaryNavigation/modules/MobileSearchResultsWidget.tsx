import { widget, WidgetDataType } from "@sitecore-search/react";
import { FormContainer, TextField, SVGSearchThin, Box } from "@tmca/lexus-kit/css-in-js";
import { DEFAULT_ENTITY, MAX_SEARCH_CHARACTERS, MIN_SEARCH_CHARACTERS } from "./constants.js";
import { SearchPreviewProps } from "./NavigationSearch.js";
import { useState } from "react";
import SearchResults, { LinkBlocks } from "./SearchResults.js";

export const MobileSearchResults: React.FC<SearchPreviewProps> = ({
    autoFocusSearchInput,
    placeholderText,
    searchProps,
}) => {
    const [searchInput, setSearchInput] = useState<string>("");

    return (
        <FormContainer>
            <TextField
                aria-label="search-result"
                placeholder={placeholderText}
                prefixIcon={<SVGSearchThin />}
                autoFocus={!!autoFocusSearchInput}
                onChange={setSearchInput}
                name="q"
                maxLength={MAX_SEARCH_CHARACTERS}
                minLength={MIN_SEARCH_CHARACTERS}
                autoComplete="off"
                value={searchInput}
            />
            <Box pt="s">
                {!searchInput ? (
                    // Show static links even before searching
                    <Box className="lx-nav-search">
                        <LinkBlocks blocks={searchProps.linkBlocks} hasResults={false} searchable={false} />
                    </Box>
                ) : (
                    <SearchResults searchInput={searchInput} {...searchProps} />
                )}
            </Box>
        </FormContainer>
    );
};

export const MobileSearchResultsWidget = widget(MobileSearchResults, WidgetDataType.PREVIEW_SEARCH, DEFAULT_ENTITY);
