import {
    Box,
    Divider,
    GenericLink,
    getBoxProps,
    getStackProps,
    getSurfaceProps,
    IconLink,
    Label,
    mergeProps,
    PrimaryNavData,
    Stack,
    Typography,
} from "@tmca/lexus-kit/css-in-js";
import * as React from "react";
import { useMemo, useContext, useEffect } from "react";

import { usePreviewSearch, type PreviewSearchInitialState } from "@sitecore-search/react";
import { debounce } from "lodash-es";
import { LexusHeadlessSiteContext } from "../LexusHeadlessSiteContext.js";
import LoadingSpinnerOverlay from "./LoadingSpinnerOverlay/LoadingSpinnerOverlay.js";
import "./NavigationSearch.scss";
import {
    DEFAULT_ENTITY,
    DEFAULT_RESULTS_ARIA_LABEL,
    DEFAULT_SEARCH_ALL_TEXT,
    INPUT_SUBSTITUTION,
    MAGIC_REASONABLE_UI_RESPONSE_TIME_FOR_HUMAN,
    MAX_SEARCH_RESULTS,
    MIN_SEARCH_CHARACTERS,
} from "./constants.js";

type SearchHighLight = {
    name: string[];
};

type SearchContentModel = {
    description: string | null;
    id: string;
    name: string;
    name_suggestion?: string;
    image_url?: string;
    url: string;
    source_id?: string;
    type?: string[];
    is_pdf?: boolean;
    highlight?: SearchHighLight;
};

type SearchInitialState = PreviewSearchInitialState<"itemsPerPage" | "suggestionsList">;

const isSearchableString = (value: string) => value.length >= MIN_SEARCH_CHARACTERS;

export const PresentationItem: React.FC<React.ComponentPropsWithoutRef<typeof GenericLink>> = ({
    children,
    ...rest
}) => (
    <li role="presentation">
        <GenericLink
            variant="quiet"
            {...mergeProps(rest, getBoxProps({ px: "2xs", py: "3xs" }), getSurfaceProps("none", undefined, true), {
                style: { display: "block" },
            })}
        >
            <Typography variant="b1">{children}</Typography>
        </GenericLink>
    </li>
);

export const SearchList: React.FC<React.PropsWithChildren<{ label?: string; ariaLabel?: string }>> = ({
    children,
    label,
    ariaLabel,
}) => (
    <div>
        {label && (
            <Box px="2xs" py="4xs" className="search-list__label" aria-hidden={true}>
                <Label>{label}</Label>
            </Box>
        )}
        <ul role="listbox" aria-label={ariaLabel} {...getStackProps({ direction: "column", spacing: "4xs" })}>
            {children}
        </ul>
    </div>
);

type LinkBlocksType = PrimaryNavData["searchLinks"];

export const LinkBlocks: React.FC<{ blocks: LinkBlocksType; searchable: boolean; hasResults: boolean }> = ({
    blocks,
    searchable,
    hasResults,
}) =>
    !blocks ? null : (
        <>
            {blocks
                .filter(
                    block =>
                        (block.showWithBlankInput && !searchable) ||
                        (block.showWithNoResults && !hasResults && searchable) ||
                        (block.showWithResults && hasResults)
                )
                .map(block => (
                    <SearchList
                        label={block.displayName || undefined}
                        ariaLabel={block.displayName}
                        key={block.displayName}
                    >
                        {block.links
                            .filter(({ link }) => link?.url && link.label)
                            .map(({ link }) => (
                                <PresentationItem href={link?.url} target={link?.target || undefined} key={link?.url}>
                                    {link?.label}
                                </PresentationItem>
                            ))}
                    </SearchList>
                ))}
        </>
    );

interface UseSearchResultsProps {
    suggestionName?: string;
    maxResults?: number;
    searchInput: string;
}

const useSearchResults = ({ suggestionName, maxResults = MAX_SEARCH_RESULTS, searchInput }: UseSearchResultsProps) => {
    const { searchIndexSource, searchEntity } = useContext(LexusHeadlessSiteContext) || {};

    const props = usePreviewSearch<SearchContentModel, SearchInitialState>({
        state: {
            suggestionsList: suggestionName ? [{ suggestion: suggestionName, max: maxResults }] : [],
            itemsPerPage: maxResults,
        },
        query: query =>
            query
                .getRequest()
                .setSources(searchIndexSource || [])
                .setEntity(searchEntity || DEFAULT_ENTITY)
                .setSearchQueryHighlightFields(["name"])
                .setSearchQueryHighlightPreTag("<strong>")
                .setSearchQueryHighlightPostTag("</strong>"),
    });

    const {
        actions: { onKeyphraseChange },
        queryResult: { isFetching },
        state: { keyphrase },
    } = props;

    const querySearchResults = useMemo(
        () =>
            debounce(async (input: string) => {
                onKeyphraseChange({ keyphrase: input });
            }, MAGIC_REASONABLE_UI_RESPONSE_TIME_FOR_HUMAN),
        [onKeyphraseChange]
    );

    useEffect(() => {
        if (!isFetching && searchInput && searchInput !== keyphrase && searchInput.length >= MIN_SEARCH_CHARACTERS) {
            querySearchResults(searchInput);
        }
    }, [searchInput, keyphrase, isFetching, querySearchResults]);

    return props;
};

export interface SearchResultsProps extends UseSearchResultsProps {
    linkBlocks?: LinkBlocksType;
    defaultKeyphrase?: string;
    searchAllText?: string;
    resultsAriaLabel?: string;
    searchInput: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({
    linkBlocks,
    suggestionName,
    maxResults = MAX_SEARCH_RESULTS,
    searchAllText = DEFAULT_SEARCH_ALL_TEXT,
    resultsAriaLabel = DEFAULT_RESULTS_ARIA_LABEL,
    searchInput,
}) => {
    const { searchPage } = useContext(LexusHeadlessSiteContext) || {};
    const inputSearchable = isSearchableString(searchInput);

    const {
        widgetRef,
        actions: { onItemClick },
        queryResult: { isFetching, data },
    } = useSearchResults({ suggestionName, maxResults, searchInput });

    // Return no results if not meeting minimum search chars
    const results = inputSearchable ? data?.content || [] : [];

    return (
        <LoadingSpinnerOverlay isLoading={isFetching}>
            <Box component={Stack} direction="column" spacing="2xs" className="lx-nav-search">
                {![results.length, inputSearchable].some(Boolean) ? null : (
                    <div ref={widgetRef} {...getStackProps({ direction: "column", spacing: "4xs" })}>
                        {!results.length ? null : (
                            <SearchList ariaLabel={resultsAriaLabel}>
                                {results.map((result, index) => (
                                    <PresentationItem
                                        href={result.url}
                                        key={result.id}
                                        onClick={() => {
                                            onItemClick({
                                                id: result.id,
                                                index,
                                                sourceId: result.source_id,
                                            });
                                        }}
                                    >
                                        {result.name}
                                    </PresentationItem>
                                ))}
                            </SearchList>
                        )}
                        {inputSearchable && (
                            <IconLink
                                iconPosition="end"
                                aria-label={searchAllText.replace(INPUT_SUBSTITUTION, searchInput)}
                                href={`${searchPage}?q=${encodeURIComponent(searchInput)}`}
                                {...mergeProps(
                                    getBoxProps({ px: "2xs", py: "xs" }),
                                    getSurfaceProps({ type: "none", highlightOnHover: true }),
                                    {
                                        style: { maxWidth: "none", display: "block" },
                                    }
                                )}
                            >
                                {searchAllText.replace(INPUT_SUBSTITUTION, searchInput)}
                            </IconLink>
                        )}
                    </div>
                )}
                {inputSearchable && linkBlocks?.length && <Divider variant="light" />}
                <LinkBlocks blocks={linkBlocks} searchable={inputSearchable} hasResults={!!results.length} />
            </Box>
        </LoadingSpinnerOverlay>
    );
};

export default SearchResults;
