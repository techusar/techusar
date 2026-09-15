import { DesignProject } from '@/types';
import designProjectsJson from './design-projects.json';

export const designProjects: DesignProject[] = (designProjectsJson.designProjects || []) as DesignProject[];
