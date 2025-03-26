"use client"

import type {ResumeData} from "@/types/resume"

interface ModernResumePreviewProps {
    data: ResumeData
    sectionOrder?: string[]
}

export function ModernResumePreview({
                                        data,
                                        sectionOrder = ["skills", "workExperience", "projectExperience", "education", "selfEvaluation"],
                                    }: ModernResumePreviewProps) {
    // 获取姓名首字母作为Logo
    const getInitials = () => {
        if (!data.personalInfo.name) return ""
        const nameParts = data.personalInfo.name.split(" ")
        if (nameParts.length >= 2) {
            return (nameParts[0][0] + nameParts[1][0]).toUpperCase()
        }
        return nameParts[0][0]?.toUpperCase() || ""
    }

    // 渲染各个部分
    const renderSection = (sectionId: string) => {
        switch (sectionId) {
            case "skills":
                return (
                    data.skills.length > 0 && (
                        <div className="mb-8 section-skills" key={sectionId}>
                            <h2 className="text-lg font-bold text-gray-700 border-b pb-2 mb-4">技能</h2>
                            <div className="flex flex-wrap gap-3">
                                {data.skills.map((skill, index) => (
                                    <div key={index} className="px-3 py-2 bg-gray-100 rounded-md text-sm skill-badge">
                                        {skill.name} <span className="text-gray-500">({skill.level})</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                )
            case "workExperience":
                return (
                    data.workExperience.length > 0 && (
                        <div className="mb-8 section-work" key={sectionId}>
                            <h2 className="text-lg font-bold text-gray-700 border-b pb-2 mb-4">工作经验</h2>
                            {data.workExperience.map((work, index) => (
                                <div key={index} className="mb-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center">
                                            <div
                                                className="w-8 h-8 bg-green-100 rounded flex items-center justify-center mr-3 work-icon">
                                                <span className="text-green-500 text-xs font-bold">工</span>
                                            </div>
                                            <h3 className="font-semibold">{work.company}</h3>
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {work.startDate} - {work.endDate}
                                        </div>
                                    </div>
                                    <div className="mb-2 text-sm font-medium">
                                        {work.position} | {work.location}
                                    </div>
                                    <ul className="list-disc pl-5 space-y-1">
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
                        <div className="mb-8 section-project" key={sectionId}>
                            <h2 className="text-lg font-bold text-gray-700 border-b pb-2 mb-4">我的项目</h2>
                            {data.projectExperience.map((project, index) => (
                                <div key={index} className="mb-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center">
                                            <div
                                                className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center mr-3 project-icon">
                                                <span
                                                    className="text-blue-500 text-xs font-bold">{project.name.substring(0, 2)}</span>
                                            </div>
                                            <h3 className="font-semibold">{project.name}</h3>
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {project.startDate} - {project.endDate}
                                        </div>
                                    </div>
                                    <p className="text-sm mb-2">{project.description}</p>
                                    <div className="text-sm text-gray-600 mb-2">{project.role}</div>
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
            case "education":
                return (
                    data.education.length > 0 && (
                        <div className="mb-8 section-education" key={sectionId}>
                            <h2 className="text-lg font-bold text-gray-700 border-b pb-2 mb-4">教育经历</h2>
                            <div className="grid grid-cols-1 gap-4">
                                {data.education.map((edu, index) => (
                                    <div key={index} className="bg-gray-50 p-4 rounded-md grid grid-cols-2 gap-3">
                                        <div className="font-semibold text-gray-800">{edu.school}</div>
                                        <div className="text-sm text-gray-600">{edu.department}</div>
                                        <div className="text-sm">
                                            <span className="text-gray-700">{edu.degree}</span> |
                                            <span className="text-gray-600">
                                                {edu.startDate} - {edu.endDate}
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-600">{edu.location}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                )
            case "selfEvaluation":
                return (
                    data.selfEvaluation.length > 0 && (
                        <div className="mb-8 section-evaluation" key={sectionId}>
                            <h2 className="text-lg font-bold text-gray-700 border-b pb-2 mb-4">自我评价</h2>
                            <div className="bg-gray-50 p-4 rounded-md">
                                <ul className="list-disc pl-5 space-y-2">
                                    {data.selfEvaluation.map((evaluation, index) => (
                                        <li key={index} className="text-sm text-gray-700">
                                            {evaluation}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )
                )
            default:
                return null
        }
    }

    return (
        <div className="resume-preview-content bg-white  w-full">
            {/* 顶部个人信息 */}
            <div className="mb-8">
                <div className="flex justify-between items-center border-b pb-4">
                    <div className="flex items-center">
                        <div
                            className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold mr-4 initials-logo">
                            {getInitials()}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">{data.personalInfo.name || "姓名"}</h1>
                            <p className="text-gray-600 mt-1">
                                {data.personalInfo.targetCities && data.personalInfo.targetCities.length > 0
                                    ? `求职意向：前端开发工程师 (${data.personalInfo.targetCities.join(", ")})`
                                    : "求职意向：前端开发工程师"}
                            </p>
                        </div>
                    </div>

                    <div className="text-right">
                        <div className="text-sm space-y-1">
                            {data.personalInfo.phone && (
                                <div className="flex items-center justify-end">
                                    <span className="text-gray-700">{data.personalInfo.phone}</span>
                                </div>
                            )}
                            {data.personalInfo.email && (
                                <div className="flex items-center justify-end">
                                    <span className="text-gray-700">{data.personalInfo.email}</span>
                                </div>
                            )}
                            {data.personalInfo.location && (
                                <div className="flex items-center justify-end">
                                    <span className="text-gray-700">{data.personalInfo.location}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* 个人状态信息 */}
                <div className="mt-4 grid grid-cols-3 gap-4">
                    {data.personalInfo.status && (
                        <div className="bg-gray-50 p-3 rounded-md">
                            <span className="font-medium text-sm">当前状态:</span>
                            <span className="text-sm ml-2">{data.personalInfo.status}</span>
                        </div>
                    )}
                    {data.personalInfo.salaryExpectation && (
                        <div className="bg-gray-50 p-3 rounded-md">
                            <span className="font-medium text-sm">期望薪资:</span>
                            <span className="text-sm ml-2">{data.personalInfo.salaryExpectation}</span>
                        </div>
                    )}
                    <div className="bg-gray-50 p-3 rounded-md">
                        <span className="font-medium text-sm">个人信息:</span>
                        <span className="text-sm ml-2">
              {data.personalInfo.gender && `${data.personalInfo.gender}`}
                            {data.personalInfo.birthYear && ` | ${data.personalInfo.birthYear}`}
            </span>
                    </div>
                </div>
            </div>

            {/* 根据排序渲染各部分 */}
            {sectionOrder.map((sectionId) => renderSection(sectionId))}
        </div>
    )
}

