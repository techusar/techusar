import { Theme } from '@/types';
import themesJson from './themes.json';

export const themes: Theme[] = (themesJson.themes || []) as Theme[];
