import { Project } from '@/types';
import projectsJson from './projects.json';

export const projects: Project[] = (projectsJson.projects || []) as Project[];
