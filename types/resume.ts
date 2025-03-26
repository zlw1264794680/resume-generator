export interface PersonalInfo {
  name: string
  phone: string
  email: string
  location: string
  birthYear: string
  gender: string
  status: string
  currentCity?: string
  targetCities: string[]
  salaryExpectation: string
}

export interface Education {
  school: string
  department: string
  degree: string
  startDate: string
  endDate: string
  location: string
}

export interface Skill {
  name: string
  level: string
}

export interface WorkExperience {
  company: string
  position: string
  startDate: string
  endDate: string
  location: string
  responsibilities: string[]
}

export interface ProjectExperience {
  name: string
  role: string
  startDate: string
  endDate: string
  description: string
  responsibilities: string[]
}

export interface ResumeData {
  personalInfo: PersonalInfo
  education: Education[]
  skills: Skill[]
  workExperience: WorkExperience[]
  projectExperience: ProjectExperience[]
  selfEvaluation: string[]
}

