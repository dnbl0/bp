import { widget, WidgetDataType } from "@sitecore-search/react";
import { FormContainer, SVGSearchThin, TextFieldWithPopover } from "@tmca/lexus-kit/css-in-js";
import SearchResults, { SearchResultsProps } from "./SearchResults.js";
import React, { useState } from "react";
import { DEFAULT_ENTITY, DEFAULT_PLACEHOLDER_TEXT, MAX_SEARCH_CHARACTERS, MIN_SEARCH_CHARACTERS } from "./constants.js";

export type SearchPreviewProps = { searchProps: Omit<SearchResultsProps, "searchInput"> } & {
    placeholderText?: string;
    autoFocusSearchInput?: boolean;
};

const SearchPopover: React.FC<SearchPreviewProps> = ({
    autoFocusSearchInput,
    placeholderText = DEFAULT_PLACEHOLDER_TEXT,
    searchProps,
}) => {
    const [searchInput, setSearchInput] = useState<string>("");

    return (
        <FormContainer>
            <TextFieldWithPopover
                placeholder={placeholderText}
                prefixIcon={<SVGSearchThin />}
                autoFocus={autoFocusSearchInput ?? false}
                onChange={setSearchInput}
                name="q"
                maxLength={MAX_SEARCH_CHARACTERS}
                minLength={MIN_SEARCH_CHARACTERS}
                autoComplete="off"
                value={searchInput}
            >
                <SearchResults searchInput={searchInput} {...searchProps} />
            </TextFieldWithPopover>
        </FormContainer>
    );
};

export const SearchPopoverWidget = widget(SearchPopover, WidgetDataType.PREVIEW_SEARCH, DEFAULT_ENTITY);
