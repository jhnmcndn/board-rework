'use server';

import { revalidateTag } from 'next/cache';

export const refetch = async (tag?: string) => revalidateTag(tag || '');
