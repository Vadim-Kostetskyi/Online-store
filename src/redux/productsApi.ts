import {
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import {
  GetProductsPayload,
  GetProductsResponse,
  GetProductsWithImagesDTO,
  GetProductsWithImagesProps,
  SearchProductsProps,
} from './types';
import { config } from 'libs/packages/config/config';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: config.ENV.API.URL,
  }),
  endpoints: builder => ({
    getProductsByName: builder.query({
      query: ({ page, size }) => `products/?page=${page}&size=${size}`,
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

        const products = rawProducts.data as GetProductsResponse['data'];
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
    getNewNowProducts: builder.query<GetProductsWithImagesDTO[], void>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const rawProducts = await fetchWithBQ('products/new');

        if (rawProducts.error)
          return { error: rawProducts.error as FetchBaseQueryError };

        const products = rawProducts.data as GetProductsResponse['data'];
        const productsWithImages: GetProductsWithImagesDTO[] = [];

        for (const product of products) {
          const rawImages = await fetchWithBQ(`products/images/${product.id}`);
          if (rawImages.error)
            return { error: rawImages.error as FetchBaseQueryError };

          const images = rawImages.data as GetProductsWithImagesDTO['images'];

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
        const rawProducts = await fetchWithBQ({
          url: `products/search?page=${_arg.page}&size=${_arg.size}`,
          method: 'POST',
          body: _arg.body,
        });

        if (rawProducts.error)
          return { error: rawProducts.error as FetchBaseQueryError };

        const products = rawProducts.data as GetProductsResponse['data'];
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
} = productsApi;
