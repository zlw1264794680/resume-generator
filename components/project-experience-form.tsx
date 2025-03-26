"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ProjectExperience } from "@/types/resume"
import { Trash2, X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface ProjectExperienceFormProps {
  data: ProjectExperience[]
  updateData: (data: ProjectExperience[]) => void
}

export function ProjectExperienceForm({ data, updateData }: ProjectExperienceFormProps) {
  const [projects, setProjects] = useState<ProjectExperience[]>(data)
  const [newProject, setNewProject] = useState<ProjectExperience>({
    name: "",
    role: "",
    startDate: "",
    endDate: "",
    description: "",
    responsibilities: [],
  })
  const [responsibility, setResponsibility] = useState("")

  const { toast } = useToast()

  const handleAddProject = () => {
    if (!newProject.name) {
      toast({
        title: "无法添加",
        description: "项目名称不能为空",
        variant: "destructive",
      })
      return
    }

    if (!newProject.description) {
      toast({
        title: "无法添加",
        description: "项目描述不能为空",
        variant: "destructive",
      })
      return
    }

    const updatedProjects = [...projects, newProject]
    setProjects(updatedProjects)
    updateData(updatedProjects)
    setNewProject({
      name: "",
      role: "",
      startDate: "",
      endDate: "",
      description: "",
      responsibilities: [],
    })
    setResponsibility("")
  }

  const handleRemoveProject = (index: number) => {
    const updatedProjects = projects.filter((_, i) => i !== index)
    setProjects(updatedProjects)
    updateData(updatedProjects)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewProject((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddResponsibility = () => {
    if (!responsibility.trim()) {
      toast({
        title: "无法添加",
        description: "职责内容不能为空",
        variant: "destructive",
      })
      return
    }

    setNewProject((prev) => ({
      ...prev,
      responsibilities: [...prev.responsibilities, responsibility],
    }))
    setResponsibility("")
  }

  const handleRemoveResponsibility = (index: number) => {
    setNewProject((prev) => ({
      ...prev,
      responsibilities: prev.responsibilities.filter((_, i) => i !== index),
    }))
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {projects.map((project, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">
                {project.name} - {project.role}
              </CardTitle>
              <Button variant="ghost" size="icon" onClick={() => handleRemoveProject(index)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-2">
                <div>
                  <p className="text-sm font-medium">时间段：</p>
                  <p className="text-sm">
                    {project.startDate} - {project.endDate}
                  </p>
                </div>
              </div>
              <div className="mb-2">
                <p className="text-sm font-medium mb-1">项目描述：</p>
                <p className="text-sm">{project.description}</p>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">主要职责：</p>
                <ul className="list-disc pl-5 space-y-1">
                  {project.responsibilities.map((resp, i) => (
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
        <h3 className="font-medium mb-4">添加项目经历</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">项目名称</Label>
            <Input
              id="name"
              name="name"
              value={newProject.name}
              onChange={handleChange}
              placeholder="例如：CRM分析系统"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">担任角色</Label>
            <Input
              id="role"
              name="role"
              value={newProject.role}
              onChange={handleChange}
              placeholder="例如：前端开发工程师"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="startDate">开始时间</Label>
            <Input
              id="startDate"
              name="startDate"
              value={newProject.startDate}
              onChange={handleChange}
              placeholder="例如：2024年05月"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endDate">结束时间</Label>
            <Input
              id="endDate"
              name="endDate"
              value={newProject.endDate}
              onChange={handleChange}
              placeholder="例如：2024年06月"
            />
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <Label htmlFor="description">项目描述</Label>
          <Textarea
            id="description"
            name="description"
            value={newProject.description}
            onChange={handleChange}
            placeholder="例如：为提升销售团队效率及客户满意度，开发了CRM分析系统"
          />
        </div>

        <div className="mt-4 space-y-2">
          <Label htmlFor="responsibilities">主要职责</Label>
          <div className="flex space-x-2">
            <Textarea
              id="responsibilities"
              value={responsibility}
              onChange={(e) => setResponsibility(e.target.value)}
              placeholder="例如：负责前端页面开发，使用Vue3框架"
              className="flex-1"
            />
            <Button type="button" onClick={handleAddResponsibility}>
              添加
            </Button>
          </div>

          {newProject.responsibilities.length > 0 && (
            <div className="mt-2">
              <p className="text-sm font-medium mb-1">已添加的职责：</p>
              <ul className="list-disc pl-5 space-y-1">
                {newProject.responsibilities.map((resp, index) => (
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

        <Button className="mt-4" onClick={handleAddProject}>
          添加项目经历
        </Button>
      </div>
    </div>
  )
}

