"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { WorkExperience } from "@/types/resume"
import { Trash2, X } from "lucide-react"

// 在文件顶部添加导入
import { useToast } from "@/components/ui/use-toast"

interface WorkExperienceFormProps {
  data: WorkExperience[]
  updateData: (data: WorkExperience[]) => void
}

export function WorkExperienceForm({ data, updateData }: WorkExperienceFormProps) {
  const [experiences, setExperiences] = useState<WorkExperience[]>(data)
  const [newExperience, setNewExperience] = useState<WorkExperience>({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    location: "",
    responsibilities: [],
  })
  const [responsibility, setResponsibility] = useState("")

  // 在组件内部添加
  const { toast } = useToast()

  // 修改添加工作经历的验证和提示
  const handleAddExperience = () => {
    if (!newExperience.company) {
      toast({
        title: "无法添加",
        description: "公司名称不能为空",
        variant: "destructive",
      })
      return
    }

    if (!newExperience.position) {
      toast({
        title: "无法添加",
        description: "职位不能为空",
        variant: "destructive",
      })
      return
    }

    const updatedExperiences = [...experiences, newExperience]
    setExperiences(updatedExperiences)
    updateData(updatedExperiences)
    setNewExperience({
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      location: "",
      responsibilities: [],
    })
    setResponsibility("")
  }

  const handleRemoveExperience = (index: number) => {
    const updatedExperiences = experiences.filter((_, i) => i !== index)
    setExperiences(updatedExperiences)
    updateData(updatedExperiences)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewExperience((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // 修改添加工作职责的验证和提示
  const handleAddResponsibility = () => {
    if (!responsibility.trim()) {
      toast({
        title: "无法添加",
        description: "工作职责内容不能为空",
        variant: "destructive",
      })
      return
    }

    setNewExperience((prev) => ({
      ...prev,
      responsibilities: [...prev.responsibilities, responsibility],
    }))
    setResponsibility("")
  }

  const handleRemoveResponsibility = (index: number) => {
    setNewExperience((prev) => ({
      ...prev,
      responsibilities: prev.responsibilities.filter((_, i) => i !== index),
    }))
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {experiences.map((experience, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">
                {experience.company} - {experience.position}
              </CardTitle>
              <Button variant="ghost" size="icon" onClick={() => handleRemoveExperience(index)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-2">
                <div>
                  <p className="text-sm font-medium">时间段：</p>
                  <p className="text-sm">
                    {experience.startDate} - {experience.endDate}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">地点：</p>
                  <p className="text-sm">{experience.location}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">工作职责：</p>
                <ul className="list-disc pl-5 space-y-1">
                  {experience.responsibilities.map((resp, i) => (
                    <li key={i} className="text-sm">
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="border p-4 rounded-lg">
        <h3 className="font-medium mb-4">添加工作经历</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="company">公司名称</Label>
            <Input
              id="company"
              name="company"
              value={newExperience.company}
              onChange={handleChange}
              placeholder="例如：深圳市某科技有限公司"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="position">职位</Label>
            <Input
              id="position"
              name="position"
              value={newExperience.position}
              onChange={handleChange}
              placeholder="例如：前端开发工程师"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="startDate">开始时间</Label>
            <Input
              id="startDate"
              name="startDate"
              value={newExperience.startDate}
              onChange={handleChange}
              placeholder="例如：2023年03月"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endDate">结束时间</Label>
            <Input
              id="endDate"
              name="endDate"
              value={newExperience.endDate}
              onChange={handleChange}
              placeholder="例如：2023年10月 或 至今"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">地点</Label>
            <Input
              id="location"
              name="location"
              value={newExperience.location}
              onChange={handleChange}
              placeholder="例如：深圳"
            />
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <Label htmlFor="responsibilities">工作职责</Label>
          <div className="flex space-x-2">
            <Textarea
              id="responsibilities"
              value={responsibility}
              onChange={(e) => setResponsibility(e.target.value)}
              placeholder="例如：负责公司官网开发，使用Vue3框架"
              className="flex-1"
            />
            <Button type="button" onClick={handleAddResponsibility}>
              添加
            </Button>
          </div>

          {newExperience.responsibilities.length > 0 && (
            <div className="mt-2">
              <p className="text-sm font-medium mb-1">已添加的工作职责：</p>
              <ul className="list-disc pl-5 space-y-1">
                {newExperience.responsibilities.map((resp, index) => (
                  <li key={index} className="text-sm flex items-start group">
                    <span className="flex-1">{resp}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 opacity-0 group-hover:opacity-100"
                      onClick={() => handleRemoveResponsibility(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <Button className="mt-4" onClick={handleAddExperience}>
          添加工作经历
        </Button>
      </div>
    </div>
  )
}

