"use client"

import type { ResumeData } from "@/types/resume"

interface ResumePreviewProps {
  data: ResumeData
  sectionOrder?: string[]
}

export function ResumePreview({
  data,
  sectionOrder = ["education", "skills", "workExperience", "projectExperience", "selfEvaluation"],
}: ResumePreviewProps) {
  // 渲染各个部分
  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case "education":
        return (
          data.education.length > 0 && (
            <div className="mb-8" key={sectionId}>
              <h2 className="text-xl font-bold text-black border-b-2 border-gray-800 pb-2 mb-4">教育经历</h2>
              {data.education.map((edu, index) => (
                <div key={index} className="flex justify-between mb-4">
                  <div>
                    <p className="font-semibold text-gray-800">{edu.school}</p>
                    <p className="text-sm text-gray-600 mt-1">{edu.department}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      {edu.startDate} - {edu.endDate}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{edu.location}</p>
                  </div>
                </div>
              ))}
            </div>
          )
        )
      case "skills":
        return (
          data.skills.length > 0 && (
            <div className="mb-8" key={sectionId}>
              <h2 className="text-xl font-bold text-black border-b-2 border-gray-800 pb-2 mb-4">专业技能</h2>
              <ul className="list-disc pl-5 space-y-2">
                {data.skills.map((skill, index) => (
                  <li key={index} className="text-gray-700">
                    <span className="font-medium">{skill.name}</span>{" "}
                    <span className="text-gray-500">({skill.level})</span>
                  </li>
                ))}
              </ul>
            </div>
          )
        )
      case "workExperience":
        return (
          data.workExperience.length > 0 && (
            <div className="mb-8" key={sectionId}>
              <h2 className="text-xl font-bold text-black border-b-2 border-gray-800 pb-2 mb-4">工作经历</h2>
              {data.workExperience.map((work, index) => (
                <div key={index} className="mb-6">
                  <div className="flex justify-between">
                    <p className="font-semibold text-gray-800">{work.company}</p>
                    <p className="text-sm text-gray-600">
                      {work.startDate} - {work.endDate}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {work.position} | {work.location}
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    {work.responsibilities.map((resp, i) => (
                      <li key={i} className="text-sm text-gray-700">
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )
        )
      case "projectExperience":
        return (
          data.projectExperience.length > 0 && (
            <div className="mb-8" key={sectionId}>
              <h2 className="text-xl font-bold text-black border-b-2 border-gray-800 pb-2 mb-4">项目经历</h2>
              {data.projectExperience.map((project, index) => (
                <div key={index} className="mb-6">
                  <div className="flex justify-between">
                    <p className="font-semibold text-gray-800">{project.name}</p>
                    <p className="text-sm text-gray-600">
                      {project.startDate} - {project.endDate}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{project.role}</p>
                  <p className="text-sm text-gray-700 mt-2">
                    <span className="font-medium">项目描述：</span>
                    {project.description}
                  </p>
                  <p className="text-sm font-medium text-gray-700 mt-2">主要职责：</p>
                  <ul className="list-disc pl-5 space-y-1">
                    {project.responsibilities.map((resp, i) => (
                      <li key={i} className="text-sm text-gray-700">
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )
        )
      case "selfEvaluation":
        return (
          data.selfEvaluation.length > 0 && (
            <div key={sectionId}>
              <h2 className="text-xl font-bold text-black border-b-2 border-gray-800 pb-2 mb-4">自我评价</h2>
              <ul className="list-disc pl-5 space-y-2">
                {data.selfEvaluation.map((evaluation, index) => (
                  <li key={index} className="text-sm text-gray-700">
                    {evaluation}
                  </li>
                ))}
              </ul>
            </div>
          )
        )
      default:
        return null
    }
  }

  return (
    <div className="resume-preview-content bg-background w-full">
      {/* 个人信息 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-3">{data.personalInfo.name || "姓名"}</h1>
        <div className="mt-3 text-sm space-y-2 text-gray-700">
          <p className="flex flex-wrap gap-2">
            {data.personalInfo.phone && (
              <>
                <span className="font-medium">电话：</span>
                {data.personalInfo.phone}
              </>
            )}
            {data.personalInfo.email && (
              <>
                <span className="font-medium ml-4">邮箱：</span>
                {data.personalInfo.email}
              </>
            )}
            {data.personalInfo.location && (
              <>
                <span className="font-medium ml-4">现居城市：</span>
                {data.personalInfo.location}
              </>
            )}
          </p>
          <p className="flex flex-wrap gap-2">
            {data.personalInfo.birthYear && (
              <>
                <span className="font-medium">出生：</span>
                {data.personalInfo.birthYear}
              </>
            )}
            {data.personalInfo.gender && (
              <>
                <span className="font-medium ml-4">性别：</span>
                {data.personalInfo.gender}
              </>
            )}
          </p>
          <p className="flex flex-wrap gap-2">
            {data.personalInfo.status && (
              <>
                <span className="font-medium">当前状态：</span>
                {data.personalInfo.status}
              </>
            )}
            {data.personalInfo.targetCities && data.personalInfo.targetCities.length > 0 && (
              <>
                <span className="font-medium ml-4">意向城市：</span>
                {data.personalInfo.targetCities.join("，")}
              </>
            )}
            <span className="font-medium ml-4">求职意向：</span>前端开发工程师
          </p>
          {data.personalInfo.salaryExpectation && (
            <p>
              <span className="font-medium">期望薪资：</span>
              {data.personalInfo.salaryExpectation}
            </p>
          )}
        </div>
      </div>

      {/* 根据排序渲染各部分 */}
      {sectionOrder.map((sectionId) => renderSection(sectionId))}
    </div>
  )
}

