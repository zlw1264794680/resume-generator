"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PersonalInfoForm } from "./personal-info-form"
import { EducationForm } from "./education-form"
import { SkillsForm } from "./skills-form"
import { WorkExperienceForm } from "./work-experience-form"
import { ProjectExperienceForm } from "./project-experience-form"
import { SelfEvaluationForm } from "./self-evaluation-form"
import { ResumePreview } from "./resume-preview"
import { ModernResumePreview } from "./modern-resume-preview"
import type { ResumeData } from "@/types/resume"
import { sampleResumeData, realResumeData } from "@/data/sample-resume"
import { Download, FileText, RefreshCw, LayoutTemplate, MoveVertical } from "lucide-react"
import { EditResumeData } from "./edit-resume-data"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// 所有可用的部分
const ALL_SECTIONS = [
  { id: "education", name: "教育经历" },
  { id: "skills", name: "专业技能" },
  { id: "workExperience", name: "工作经验" },
  { id: "projectExperience", name: "项目经历" },
  { id: "selfEvaluation", name: "自我评价" },
]

// 默认排序
const DEFAULT_SECTION_ORDER = ["education", "skills", "workExperience", "projectExperience", "selfEvaluation"]

export function ResumeBuilder() {
  const { toast } = useToast()
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: "",
      phone: "",
      email: "",
      location: "",
      birthYear: "",
      gender: "",
      status: "",
      currentCity: "",
      targetCities: [],
      salaryExpectation: "",
    },
    education: [],
    skills: [],
    workExperience: [],
    projectExperience: [],
    selfEvaluation: [],
  })

  const [activeTab, setActiveTab] = useState("personal")
  // 移除key状态，避免不必要的重新渲染
  const [templateType, setTemplateType] = useState<"basic" | "modern">("basic")
  // 添加部分顺序状态 - 现在适用于所有模板
  const [sectionOrder, setSectionOrder] = useState<string[]>(DEFAULT_SECTION_ORDER)
  const [orderDialogOpen, setOrderDialogOpen] = useState(false)

  const updateResumeData = (section: keyof ResumeData, data: any) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: data,
    }))
  }

  const handleNext = () => {
    // 表单验证
    if (activeTab === "personal") {
      const { name, phone, email } = resumeData.personalInfo
      if (!name || !phone || !email) {
        toast({
          title: "请完成必填信息",
          description: "姓名、电话和邮箱为必填项",
          variant: "destructive",
        })
        return
      }
    }

    const tabs = ["personal", "education", "skills", "work", "project", "evaluation", "preview"]
    const currentIndex = tabs.indexOf(activeTab)
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1])
    }
  }

  const handlePrevious = () => {
    const tabs = ["personal", "education", "skills", "work", "project", "evaluation", "preview"]
    const currentIndex = tabs.indexOf(activeTab)
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1])
    }
  }

  const loadSampleData = () => {
    setResumeData(sampleResumeData)
    toast({
      title: "已加载示例数据",
      description: "示例简历数据已成功加载",
    })
  }

  const loadRealData = () => {
    setResumeData(realResumeData)
    toast({
      title: "已加载简历案例",
      description: "真实简历案例数据已成功加载",
    })
  }

  const resetData = () => {
    setResumeData({
      personalInfo: {
        name: "",
        phone: "",
        email: "",
        location: "",
        birthYear: "",
        gender: "",
        status: "",
        currentCity: "",
        targetCities: [],
        salaryExpectation: "",
      },
      education: [],
      skills: [],
      workExperience: [],
      projectExperience: [],
      selfEvaluation: [],
    })
    toast({
      title: "已重置数据",
      description: "所有简历数据已被清空",
    })
  }

  // 处理拖拽排序
  const handleDragEnd = (result: any) => {
    // 如果没有目标位置或源位置和目标位置相同，则不做任何操作
    if (!result.destination || result.destination.index === result.source.index) {
      return
    }

    try {
      const items = Array.from(sectionOrder)
      const [reorderedItem] = items.splice(result.source.index, 1)
      items.splice(result.destination.index, 0, reorderedItem)

      setSectionOrder(items)

      // 提供拖拽成功的反馈
      if (result.source.index !== result.destination.index) {
        toast({
          title: "顺序已更新",
          description: "模块顺序已成功调整",
          duration: 1500,
        })
      }
    } catch (error) {
      console.error("拖拽排序出错:", error)
      toast({
        title: "操作失败",
        description: "调整顺序时出现错误，请重试",
        variant: "destructive",
      })
    }
  }

  // 重置模块顺序
  const resetSectionOrder = () => {
    setSectionOrder(DEFAULT_SECTION_ORDER)
    toast({
      title: "已重置模块顺序",
      description: "模块顺序已恢复默认设置",
    })
  }

  // 获取部分名称
  const getSectionName = (sectionId: string) => {
    const section = ALL_SECTIONS.find((s) => s.id === sectionId)
    return section ? section.name : sectionId
  }

  const handlePrint = () => {
    // 创建一个新窗口用于打印
    const printWindow = window.open("", "_blank")
    if (!printWindow) {
      toast({
        title: "打印失败",
        description: "无法创建打印窗口，请检查您的浏览器设置",
        variant: "destructive",
      })
      return
    }

    // 获取简历内容
    const resumeContent = document.querySelector(".resume-preview-content")
    if (!resumeContent) {
      printWindow.close()
      return
    }

    // 克隆内容以避免直接操作DOM
    const contentClone = resumeContent.cloneNode(true) as HTMLElement

    // 设置打印窗口的内容 - 增强CSS样式以支持现代模板
    printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>简历打印</title>
      <style>
        @media print {
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          /* 确保分页时内容不被截断 */
          .section-work > div,
          .section-project > div,
          .section-education > div,
          .section-skills > div,
          .section-evaluation > div {
            page-break-inside: avoid;
          }
        }
        
        body {
          font-family: Arial, sans-serif;
          padding: 20px;
          color: #333;
          margin: 0;
          background-color: white;
          font-size: 14px;
        }
        
        /* 基本文本样式 */
        h1 {
          color: #3b82f6;
          font-size: 24px;
          margin-bottom: 16px;
        }
        h2 {
          color: #3b82f6;
          font-size: 18px;
          border-bottom: 2px solid #3b82f6;
          padding-bottom: 8px;
          margin-top: 24px;
          margin-bottom: 16px;
        }
        h3 {
          font-size: 16px;
          margin-bottom: 8px;
        }
        p {
          margin: 8px 0;
          line-height: 1.5;
        }
        ul {
          padding-left: 20px;
          margin: 8px 0;
        }
        li {
          margin-bottom: 6px;
        }
        
        /* 颜色类 */
        .text-gray-500 { color: #6b7280; }
        .text-gray-600 { color: #4b5563; }
        .text-gray-700 { color: #374151; }
        .text-gray-800 { color: #1f2937; }
        .text-blue-500 { color: #3b82f6; }
        .text-green-500 { color: #10b981; }
        .text-red-500 { color: #ef4444; }
        .text-white { color: #ffffff; }
        .text-black { color: #000000;  }
        
        /* 背景颜色类 */
        .bg-gray-50 { background-color: #f9fafb !important; }
        .bg-gray-100 { background-color: #f3f4f6 !important; }
        .bg-gray-200 { background-color: #e5e7eb !important; }
        .bg-gray-700 { background-color: #374151 !important; }
        .bg-blue-100 { background-color: #dbeafe !important; }
        .bg-green-100 { background-color: #d1fae5 !important; }
        .bg-red-100 { background-color: #fee2e2 !important; }
        
        /* 布局类 */
        .grid { display: grid; }
        .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
        .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
        .gap-4 { gap: 1rem; }
        
        /* 边距类 */
        .mb-1 { margin-bottom: 0.25rem; }
        .mb-2 { margin-bottom: 0.5rem; }
        .mb-3 { margin-bottom: 0.75rem; }
        .mb-4 { margin-bottom: 1rem; }
        .mb-6 { margin-bottom: 1.5rem; }
        .mb-8 { margin-bottom: 2rem; }
        .mt-1 { margin-top: 0.25rem; }
        .mt-2 { margin-top: 0.5rem; }
        .mt-3 { margin-top: 0.75rem; }
        .mt-4 { margin-top: 1rem; }
        .mr-2 { margin-right: 0.5rem; }
        .mr-3 { margin-right: 0.75rem; }
        .mr-4 { margin-right: 1rem; }
        .ml-1 { margin-left: 0.25rem; }
        .ml-2 { margin-left: 0.5rem; }
        .ml-3 { margin-left: 0.75rem; }
        .ml-4 { margin-left: 1rem; }
        
        /* 内边距类 */
        .p-3 { padding: 0.75rem; }
        .p-4 { padding: 1rem; }
        .p-6 { padding: 1.5rem; }
        .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
        .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
        .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
        .pb-2 { padding-bottom: 0.5rem; }
        .pb-4 { padding-bottom: 1rem; }
        .pl-5 { padding-left: 1.25rem; }
        
        /* 间距类 */
        .space-y-1 > * + * { margin-top: 0.25rem; }
        .space-y-2 > * + * { margin-top: 0.5rem; }
        .space-x-2 > * + * { margin-left: 0.5rem; }
        .gap-2 { gap: 0.5rem; }
        .gap-3 { gap: 0.75rem; }
        .gap-4 { gap: 1rem; }
        
        /* 其他布局类 */
        .flex { display: flex; }
        .flex-row { flex-direction: row; }
        .flex-col { flex-direction: column; }
        .items-center { align-items: center; }
        .items-start { align-items: flex-start; }
        .justify-between { justify-content: space-between; }
        .justify-center { justify-content: center; }
        .justify-end { justify-content: flex-end; }
        .flex-wrap { flex-wrap: wrap; }
        
        /* 宽度和高度类 */
        .w-4 { width: 1rem; }
        .h-4 { height: 1rem; }
        .w-8 { width: 2rem; }
        .h-8 { height: 2rem; }
        .w-12 { width: 3rem; }
        .h-12 { height: 3rem; }
        .w-16 { width: 4rem; }
        .h-16 { height: 4rem; }
        .w-32 { width: 8rem; }
        .h-32 { height: 8rem; }
        
        /* 边框类 */
        .border { border-width: 1px; border-color: #e5e7eb; }
        .border-b { border-bottom-width: 1px; border-bottom-color: #e5e7eb; }
        .border-b-2 { border-bottom-width: 2px; }
        .border-primary { border-color: #3b82f6; }
        .border-gray-800 { border-color: #1f2937 }
        
        /* 圆角类 */
        .rounded-md { border-radius: 0.375rem; }
        .rounded-full { border-radius: 9999px; }
        .rounded { border-radius: 0.25rem; }
        
        /* 字体类 */
        .text-xs { font-size: 0.75rem; }
        .text-sm { font-size: 0.875rem; }
        .text-lg { font-size: 1.125rem; }
        .text-3xl { font-size: 1.875rem; }
        .font-bold { font-weight: 700; }
        .font-medium { font-weight: 500; }
        .font-semibold { font-weight: 600; }
        
        /* 其他类 */
        .list-disc { list-style-type: disc; }
        .object-cover { object-fit: cover; }
        .overflow-hidden { overflow: hidden; }
        .shadow-sm { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
        
        /* 特定组件样式 */
        .skill-badge {
          background-color: #f3f4f6 !important;
          border-radius: 0.375rem;
          padding: 0.5rem 0.75rem;
          display: inline-block;
        }
        
        .work-icon, .project-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 2rem;
          border-radius: 0.25rem;
          margin-right: 0.75rem;
        }
        
        .work-icon {
          background-color: #d1fae5 !important;
          color: #10b981;
        }
        
        .project-icon {
          background-color: #dbeafe !important;
          color: #3b82f6;
        }
        
        .initials-logo {
          background-color: #374151 !important;
          color: white;
          width: 4rem;
          height: 4rem;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="resume-preview-content bg-white w-full">
        ${contentClone.innerHTML}
      </div>
    </body>
    </html>
  `)

    // 等待样式加载完成后打印
    printWindow.document.close()
    printWindow.onload = () => {
      printWindow.print()
      // 打印完成后关闭窗口
      printWindow.onafterprint = () => {
        printWindow.close()
      }
    }
  }

  // 添加一个新的函数来处理键盘导航的拖拽
  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    // 使用箭头键上下移动项目
    if (e.key === "ArrowUp" && index > 0) {
      e.preventDefault()
      const newOrder = [...sectionOrder]
      const temp = newOrder[index]
      newOrder[index] = newOrder[index - 1]
      newOrder[index - 1] = temp
      setSectionOrder(newOrder)
    } else if (e.key === "ArrowDown" && index < sectionOrder.length - 1) {
      e.preventDefault()
      const newOrder = [...sectionOrder]
      const temp = newOrder[index]
      newOrder[index] = newOrder[index + 1]
      newOrder[index + 1] = temp
      setSectionOrder(newOrder)
    }
  }

  return (
    <div className="bg-background rounded-lg shadow-lg p-6">
      <div className="mb-6 flex flex-wrap gap-3 justify-center print:hidden">
        <Button variant="outline" onClick={loadSampleData} className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          <span>加载示例数据</span>
        </Button>
        <Button onClick={loadRealData} className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          <span>使用简历案例</span>
        </Button>
        <Button variant="outline" onClick={resetData} className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          <span>重置数据</span>
        </Button>
        <EditResumeData data={resumeData} onSave={setResumeData} />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="print:hidden">
        <TabsList className="grid grid-cols-7 mb-6">
          <TabsTrigger value="personal">个人信息</TabsTrigger>
          <TabsTrigger value="education">教育经历</TabsTrigger>
          <TabsTrigger value="skills">专业技能</TabsTrigger>
          <TabsTrigger value="work">工作经历</TabsTrigger>
          <TabsTrigger value="project">项目经历</TabsTrigger>
          <TabsTrigger value="evaluation">自我评价</TabsTrigger>
          <TabsTrigger value="preview">预览</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <PersonalInfoForm
            data={resumeData.personalInfo}
            updateData={(data) => updateResumeData("personalInfo", data)}
          />
        </TabsContent>

        <TabsContent value="education">
          <EducationForm data={resumeData.education} updateData={(data) => updateResumeData("education", data)} />
        </TabsContent>

        <TabsContent value="skills">
          <SkillsForm data={resumeData.skills} updateData={(data) => updateResumeData("skills", data)} />
        </TabsContent>

        <TabsContent value="work">
          <WorkExperienceForm
            data={resumeData.workExperience}
            updateData={(data) => updateResumeData("workExperience", data)}
          />
        </TabsContent>

        <TabsContent value="project">
          <ProjectExperienceForm
            data={resumeData.projectExperience}
            updateData={(data) => updateResumeData("projectExperience", data)}
          />
        </TabsContent>

        <TabsContent value="evaluation">
          <SelfEvaluationForm
            data={resumeData.selfEvaluation}
            updateData={(data) => updateResumeData("selfEvaluation", data)}
          />
        </TabsContent>

        <TabsContent value="preview">
          <div className="mb-4 print:hidden">
            <div className="flex justify-between items-center">
              <p className="text-center text-muted-foreground">您可以打印此简历或保存为PDF文件</p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <LayoutTemplate className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">选择模板:</span>
                </div>
                <Select value={templateType} onValueChange={(value: "basic" | "modern") => setTemplateType(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="选择模板" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">基础模板</SelectItem>
                    <SelectItem value="modern">现代风格</SelectItem>
                  </SelectContent>
                </Select>

                {/* 模块顺序按钮 - 现在适用于所有模板 */}
                <Dialog open={orderDialogOpen} onOpenChange={setOrderDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="ml-2 flex items-center gap-1">
                      <MoveVertical className="h-4 w-4" />
                      <span>调整顺序</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md max-h-[90vh] overflow-hidden flex flex-col">
                    <DialogHeader>
                      <DialogTitle>调整模块顺序</DialogTitle>
                      <DialogDescription>拖拽下方模块调整在简历中的显示顺序</DialogDescription>
                    </DialogHeader>

                    <div className="flex-1 overflow-hidden">
                      <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="sections">
                          {(provided) => (
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              className="space-y-2 my-4 max-h-[50vh] overflow-y-auto pr-1"
                            >
                              {sectionOrder.map((sectionId, index) => (
                                <Draggable key={sectionId} draggableId={sectionId} index={index}>
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className={`flex items-center p-3 rounded-md border ${
                                        snapshot.isDragging ? "bg-blue-50 border-blue-200 shadow-lg z-50" : "bg-gray-50"
                                      }`}
                                      style={{
                                        ...provided.draggableProps.style,
                                        cursor: "grab",
                                        opacity: snapshot.isDragging ? 0.9 : 1,
                                        transform: snapshot.isDragging
                                          ? `${provided.draggableProps.style?.transform} scale(1.02)`
                                          : provided.draggableProps.style?.transform,
                                        boxShadow: snapshot.isDragging
                                          ? "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                                          : "none",
                                      }}
                                      onKeyDown={(e) => onKeyDown(e, index)}
                                      tabIndex={0}
                                      aria-label={`拖拽项：${getSectionName(sectionId)}`}
                                      role="button"
                                    >
                                      <MoveVertical className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
                                      <span className="truncate">{getSectionName(sectionId)}</span>
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </DragDropContext>
                    </div>

                    <div className="flex justify-between mt-4 pt-2 border-t">
                      <Button variant="outline" onClick={resetSectionOrder}>
                        重置顺序
                      </Button>
                      <Button onClick={() => setOrderDialogOpen(false)}>确认</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <Button onClick={handlePrint} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                <span>打印简历</span>
              </Button>
            </div>
          </div>

          <div>
            {templateType === "basic" ? (
              <ResumePreview data={resumeData} sectionOrder={sectionOrder} />
            ) : (
              <ModernResumePreview data={resumeData} sectionOrder={sectionOrder} />
            )}
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between mt-6 print:hidden">
        <Button variant="outline" onClick={handlePrevious} disabled={activeTab === "personal"}>
          上一步
        </Button>

        {activeTab !== "preview" ? (
          <Button onClick={handleNext}>下一步</Button>
        ) : (
          <Button onClick={handlePrint} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span>打印简历</span>
          </Button>
        )}
      </div>
    </div>
  )
}

