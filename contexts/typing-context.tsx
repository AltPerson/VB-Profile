'use client';

import { createContext, Dispatch, SetStateAction } from 'react';

export const TypingCompleteContext = createContext<Dispatch<SetStateAction<boolean>> | null>(null);
