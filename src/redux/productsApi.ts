import {
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import {
  GetProductsPayload,
  GetProductsResponse,
  GetProductsWithImages,
  GetProductsWithImagesProps,
  SearchProductsProps,
  TopCategoriesProductsProps,
} from './types';
import { BASE_URL } from './routes';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: builder => ({
    getProductsByName: builder.query<GetProductsResponse, GetProductsPayload>({
      query: ({ page, size }) => `products/?page=${page}&size=${size}`,
    }),
    getTopCategoriesByName: builder.query<TopCategoriesProductsProps[], void>({
      query: () => 'products/top',
    }),
    // TODO: https://allalitvinenko.atlassian.net/browse/OS-187
    getProductById: builder.query({
      query: ({ id }) => `products/${id}`,
    }),
    getProductImages: builder.query({
      query: ({ id }) => `products/images/${id}`,
    }),
    searchProductsByParameter: builder.query<
      GetProductsResponse,
      SearchProductsProps
    >({
      query: ({ body, page, size }) => ({
        url: `products/search?page=${page}&size=${size}`,
        method: 'POST',
        body,
      }),
    }),
    getProductsWithImages: builder.query<
      GetProductsWithImagesProps,
      GetProductsPayload
    >({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const rawProducts = await fetchWithBQ(
          `products/?page=${_arg.page}&size=${_arg.size}`,
        );

        if (rawProducts.error)
          return { error: rawProducts.error as FetchBaseQueryError };

        const products =
          (rawProducts?.data as GetProductsResponse['products']) ?? [];

        const productsId: string[] = products.reduce((acc: string[], cur) => {
          acc.push(cur.id);
          return acc;
        }, []);

        const images = await Promise.all(
          productsId.map(async id => {
            const images = await fetchWithBQ(`products/images/${id}`);
            return { id, images: images?.data };
          }),
        );

        if (images.every(({ id }) => id)) {
          return { data: { products, images } } as unknown as QueryReturnValue<
            GetProductsWithImagesProps,
            FetchBaseQueryError
          >;
        }

        return { data: { products: [], images: [] } };
      },
    }),
    getNewNowProducts: builder.query<GetProductsWithImages[], void>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const rawProducts = await fetchWithBQ('products/new');

        if (rawProducts.error)
          return { error: rawProducts.error as FetchBaseQueryError };

        const products =
          (rawProducts?.data as GetProductsResponse['products']) ?? [];
        const productsWithImages: GetProductsWithImages[] = [];

        for (const product of products) {
          const rawImages = await fetchWithBQ(`products/images/${product.id}`);
          if (rawImages.error)
            return { error: rawImages.error as FetchBaseQueryError };

          const images = rawImages.data as GetProductsWithImages['images'];

          productsWithImages.push({ product, images });
        }

        return { data: productsWithImages };
      },
    }),
    fetchProductsWithImages: builder.mutation<
      GetProductsWithImagesProps,
      SearchProductsProps
    >({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        let rawProducts;

        switch (true) {
          case _arg.isFilter:
            rawProducts = await fetchWithBQ({
              url: `products/filter?page=${_arg.page}&size=${_arg.size}&sorting=price-${_arg.sortBy}`,
              method: 'POST',
              body: _arg.body,
            });
            break;
          case _arg.isNewNow:
            rawProducts = await fetchWithBQ('products/new');
            break;
          default:
            rawProducts = await fetchWithBQ({
              url: `products/search?page=${_arg.page}&size=${_arg.size}`,
              method: 'POST',
              body: _arg.body,
            });
            break;
        }

        if (rawProducts.error)
          return { error: rawProducts.error as FetchBaseQueryError };

        const products = _arg.isNewNow
          ? (rawProducts.data as GetProductsResponse['products']) ?? []
          : (rawProducts.data as GetProductsResponse)?.products ?? [];

        const productsId: string[] = products.reduce((acc: string[], cur) => {
          acc.push(cur.id);
          return acc;
        }, []);

        const images = await Promise.all(
          productsId.map(async id => {
            const images = await fetchWithBQ(`products/images/${id}`);

            return { id, images: images?.data };
          }),
        );

        if (images.every(({ id }) => id)) {
          return { data: { products, images } } as unknown as QueryReturnValue<
            GetProductsWithImagesProps,
            FetchBaseQueryError
          >;
        }

        return { data: { products: [], images: [] } };
      },
    }),
  }),
});

export const {
  useGetProductsByNameQuery,
  useGetProductsWithImagesQuery,
  useFetchProductsWithImagesMutation,
  useGetNewNowProductsQuery,
  useGetProductImagesQuery,
  useSearchProductsByParameterQuery,
  useGetProductByIdQuery,
  useGetTopCategoriesByNameQuery,
} = productsApi;
