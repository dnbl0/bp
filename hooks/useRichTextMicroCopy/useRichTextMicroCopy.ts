import { useQuery } from "@apollo/client";
import { useEffect, useMemo, useRef } from "react";
import { CmsQuery, CmsResourceRichText } from "../../types/contentful-cms-types";
import { isDefined } from "../../utils/typeguards";

import REQUEST_RESOURCE_QUERY from './requestResource.gql';

export const useRichTextMicroCopy = (key: string) => {
  const queryOptions = {
    variables: { key }
  };

  const { data: responseData, loading, error } = useQuery<CmsQuery>(REQUEST_RESOURCE_QUERY, queryOptions);

  useEffect(() => {
    if (error) {
      console.error('useRichTextMicroCopy Error:', error);
    }
  }, [error]);

  const dataRef = useRef();

  const resourceValue = useMemo(() => {
    if (!loading) {
      const resourceCollection = responseData?.resourceRichTextCollection;
      const resourceItem = resourceCollection?.items.filter(isDefined).shift();
      dataRef.current = resourceItem && readResourceItemValue(resourceItem);
    }
    return dataRef.current;
  }, [responseData, loading]);

  return { data: resourceValue, loading };
};

const readResourceItemValue = (resourceItem: CmsResourceRichText) => {
  return isDefined(resourceItem.valueRichText)
    ? resourceItem.valueRichText.json
    : undefined;
};
