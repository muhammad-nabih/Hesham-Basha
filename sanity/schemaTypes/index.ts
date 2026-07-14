import { projectType } from './projectType'
import { skillType } from './skillType'

import { blogType } from './Blogtype'
import { footerType } from './Footertype'
import { aboutType } from './Abouttype'
import { contactType } from './Contacttype'

export const schemaTypes = [
  // Documents / content
  projectType,
  skillType,
  blogType,

  // Singletons (site settings pages)
  footerType,
  aboutType,
  contactType,
]