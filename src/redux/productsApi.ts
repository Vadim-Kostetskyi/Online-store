import {
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import {
  GetProductsPayload,
  GetProductsResponse,
  GetProductsWithImagesProps,
  ProductImage,
} from './types';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://online-store-backend-gamma.vercel.app/api/v1/',
  }),
  endpoints: builder => ({
    getProductsByName: builder.query({
      query: ({ page, size }) => `products/?page=${page}&size=${size}`,
    }),
    getProductById: builder.query({
      query: ({ id }) => `products/${id}`,
    }),
    getProductImages: builder.query<{ images: ProductImage[] }, string[]>({
      queryFn: async (ids, _queryApi, _extraOptions, fetchWithBQ) => {
        const images = await Promise.all(
          ids.map(async id => {
            const result = await fetchWithBQ(`files/url/${id}`);
            return result.data as ProductImage;
          }),
        );
        return { data: { images } };
      },
    }),
    searchProductsByParameter: builder.query({
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
  useGetProductByIdQuery,
  useGetProductImagesQuery,
  useSearchProductsByParameterQuery,
} = productsApi;
